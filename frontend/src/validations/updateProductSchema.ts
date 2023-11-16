import * as yup from 'yup'

const updateProductSchema = yup.object({
    title: yup
        .string()
        .default(""),
    description: yup
        .string()
        .default(""),
    price: yup
        .number()
        // .positive("Price can not be less than 0")
        .default(0),
    category: yup
        .number(),
    inventory: yup
        .number()
        // .positive("Inventory can not be less than 0")
        .default(0),
    image: yup
        .string()
        .url("Please provide a valid image link")
        .default("") 
})

export type updateProductFormData = yup.InferType<typeof updateProductSchema>;
export default updateProductSchema;