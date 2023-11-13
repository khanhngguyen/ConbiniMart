import * as yup from 'yup'

const Guid =  /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i; 

const deleteProductSchema = yup.object({
    id: yup
        .string()
        .matches(Guid, "Id must follow GUID format")
        .required("Id should not be empty")
})

export type deleteProductFormData = yup.InferType<typeof deleteProductSchema>;
export default deleteProductSchema;