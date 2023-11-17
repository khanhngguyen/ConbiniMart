import * as yup from 'yup'

const productsQuerySchema = yup.object({
    search: yup
        .string()
        .default(""),
    sort: yup
        .string()
        .default("Newest first"),
    order: yup
        .boolean()
        .default(false),
    page: yup
        .number()
        .default(0),
    pageLimit: yup
        .number()
        .default(30)
});

export type productsQueryFormData = yup.InferType<typeof productsQuerySchema>;
export default productsQuerySchema;