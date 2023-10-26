import * as yup from 'yup'

const signupSchema = yup.object({
    firstName: yup
        .string()
        .required("First name can not be empty"),
    lastName: yup
        .string()
        .required("Last name can not be empty"),
    email: yup
        .string()
        .email("Email should be valid and contain @")
        .required("Email should not be empty"),
    avatar: yup
        .string()
        .default(""),
    password: yup
        .string()
        .required("Password should not be empty")
})

export type SignUpFormData = yup.InferType<typeof signupSchema>;
export default signupSchema;