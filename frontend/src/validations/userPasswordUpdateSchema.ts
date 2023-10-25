import * as yup from 'yup'

const userPasswordUpdateSchema = yup.object({
    password: yup
        .string()
        .required()
})

export type userPasswordUpdateData = yup.InferType<typeof userPasswordUpdateSchema>;
export default userPasswordUpdateSchema;