import { Document, InferSchemaType, Model, Schema, model } from 'mongoose'

export interface IProductCategoryType {
  name: string
  category: any
}

const productCategoryTypeSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
  },
  { timestamps: true },
)
productCategoryTypeSchema.index({ name: 1, category: 1 }, { unique: true })

export type ProductCategoryType = InferSchemaType<typeof productCategoryTypeSchema>
export type TProductCategoryType = Model<ProductCategoryType, {}>
export interface IProductCategoryTypeDocument extends ProductCategoryType, Document {}

export const ProductCategoryTypeModel = model<ProductCategoryType, TProductCategoryType>(
  'ProductCategoryType',
  productCategoryTypeSchema,
)
