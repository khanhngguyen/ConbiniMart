import axios, { AxiosResponse } from "axios";

const axiosinstance = axios.create();

axiosinstance.interceptors.response.use((response : AxiosResponse<any>) => {
    return response;
}, (error) => {
    switch (error.response.status) {
        case 404:
            return {
                // data: null,
                // hasError: true,
                error: [error.response.data]
            }
        case 500:
            return {
                // data: null,
                // hasError: true,
                error: [error.response.data]
            }
        default:
            return Promise.reject(error);
    }
});

export default axiosinstance;