import * as yup from 'yup'

const userPasswordUpdateSchema = yup.object({
    password: yup
        .string()
        .required("Please enter your new password"),
    confirm: yup
        .string()
        .required("Please confirm your new password")
        .oneOf([yup.ref('password')], "Password does not match")
})

export type userPasswordUpdateData = yup.InferType<typeof userPasswordUpdateSchema>;
export default userPasswordUpdateSchema;