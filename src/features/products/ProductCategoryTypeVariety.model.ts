import { Document, InferSchemaType, Model, Schema, model } from 'mongoose'

export interface IProductCategoryTypeVariety {
  name: string
  type: any
}

const productCategoryTypeVarietySchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategoryType',
      required: true,
    },
  },
  { timestamps: true },
)
productCategoryTypeVarietySchema.index({ name: 1, type: 1 }, { unique: true })

export type ProductCategoryTypeVariety = InferSchemaType<typeof productCategoryTypeVarietySchema>
export type TProductCategoryTypeVariety = Model<ProductCategoryTypeVariety, {}>
export interface IProductCategoryTypeVarietyDocument extends ProductCategoryTypeVariety, Document {}

export const ProductCategoryTypeVarietyModel = model<
  ProductCategoryTypeVariety,
  TProductCategoryTypeVariety
>('ProductCategoryTypeVariety', productCategoryTypeVarietySchema)
