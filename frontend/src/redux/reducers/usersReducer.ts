import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserCreateDto, UserUpdateDto, UserUpdatePassword } from "../../types/User"
import axios, { AxiosError } from "axios";
import { UserCredential } from "../../types/UserCredential";
import { stat } from "fs";

const initialState: {
    users: User[],
    currentUser?: User,
    loading: boolean,
    error: string
} = {
    users: [],
    loading: false,
    error: ''
}

const baseURL = "https://fs15kim-ecommerce-backend.azurewebsites.net/api/v1";

export const fetchAllUsers = createAsyncThunk(
    'fetchAllUsers',
    async () => {
        try {
            const response = await axios.get<User[]>(`${baseURL}/users`);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const authenticate = createAsyncThunk(
    'authenticate',
    async (token: string) => {
        try {
            const response = await axios.get<User>(`${baseURL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const login = createAsyncThunk(
    'login',
    async ({ email, password } : UserCredential, { dispatch }) => {
        try {
            const response = await axios.post(`${baseURL}/auth`);

            const authentication = await dispatch(authenticate(response.data));

            localStorage.setItem("token", response.data);
            localStorage.setItem("currentUser", JSON.stringify(authentication.payload));

            return authentication.payload as User;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

// export const logout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
// }

export const createNewUser = createAsyncThunk(
    'createNewUser',
    async (newUser : UserCreateDto) => {
        try {
            const response = await axios.post(`${baseURL}/users`, newUser);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const createNewAdmin = createAsyncThunk(
    'createNewAdmin',
    async (newAdmin : UserCreateDto) => {
        try {
            const response = await axios.post(`${baseURL}/users/admin`, newAdmin);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const updateUser = createAsyncThunk(
    'updateUser',
    async (update : UserUpdateDto) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(`${baseURL}/users/${update.id}`, 
                update.update,
                {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (update : UserUpdatePassword) => {
        try {
            const requestBody = { password: update.password };
            const response = await axios.patch(`${baseURL}/update/${update.id}`, requestBody);
            return  response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = undefined;
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.users = [];
            } else {
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllUsers.rejected, (state) => {
            state.loading = false;
            state.error = "can not fetch all users";
        })
        .addCase(createNewUser.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.users.push(action.payload);
            }
            state.loading = false;
        })
        .addCase(createNewUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createNewUser.rejected, (state) => {
            state.error = "can not create new user";
            state.loading = false;
        })
        .addCase(createNewAdmin.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.users.push(action.payload);
            }
            state.loading = false;
        })
        .addCase(createNewAdmin.pending, (state) => {
            state.loading = true;
        })
        .addCase(createNewAdmin.rejected, (state) => {
            state.error = "can not create new admin";
            state.loading = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.currentUser = action.payload;
            }
            state.loading = false;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.rejected, (state) => {
            state.error = "can not log in";
        })
        .addCase(authenticate.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.currentUser = action.payload;
            }
            state.loading = false;
        })
        .addCase(authenticate.pending, (state) => {
            state.loading = true;
        })
        .addCase(authenticate.rejected, (state) => {
            state.error = "can not authenticate";
            state.loading = false;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                const updatedUsers = state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                });
                state.users = updatedUsers;
                state.currentUser = action.payload;
            }
            state.loading = false;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.rejected, (state) => {
            state.error = "can not update user";
            state.loading = false;
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                const updatedUsers = state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                });
                state.users = updatedUsers;
                state.currentUser = action.payload;
            }
            state.loading = false;
        })
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(updatePassword.rejected, (state) => {
            state.error = "can not update password";
        })
    }
})

export const { logout } = usersSlice.actions;
const usersReducer = usersSlice.reducer;
export default usersReducer;