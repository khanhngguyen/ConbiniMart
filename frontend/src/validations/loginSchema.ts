import * as yup from 'yup'

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email should be valid and contain @")
        .required("Email should not be empty"),
    password: yup
        .string()
        .required("Password should not be empty")
})

export type LogInFormData = yup.InferType<typeof loginSchema>;
export default loginSchema;