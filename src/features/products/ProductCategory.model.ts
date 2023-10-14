import { Document, InferSchemaType, Model, Schema, model } from 'mongoose'

export interface IProductCategory {
  name: string
}

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
)

export type ProductCategory = InferSchemaType<typeof productCategorySchema>
export type TProductCategory = Model<ProductCategory, {}>
export interface IProductCategoryDocument extends ProductCategory, Document {}

export const ProductCategoryModel = model<ProductCategory, TProductCategory>(
  'ProductCategory',
  productCategorySchema,
)
