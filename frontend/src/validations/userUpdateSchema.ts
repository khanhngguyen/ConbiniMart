import * as yup from 'yup'

const userUpdateSchema = yup.object({
    firstName: yup
        .string()
        .min(0)
        .default(""),
    lastName: yup
        .string()
        .default(""),
    email: yup
        .string()
        .email("Email should be valid and contain @")
        .default("")
})

export type userUpdateData = yup.InferType<typeof userUpdateSchema>;
export default userUpdateSchema;