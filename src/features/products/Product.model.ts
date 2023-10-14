import { Document, InferSchemaType, Model, Schema, model } from 'mongoose'

export interface IProduct {
  description: string
  category: any
  type: any
  variety: any
  owner: any
}

const productSchema = new Schema(
  {
    description: {
      type: String,
      unique: false,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategoryType',
      required: true,
    },
    variety: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategoryTypeVariety',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

export type Product = InferSchemaType<typeof productSchema>
export type TProduct = Model<Product, {}>
export interface IProductDocument extends Product, Document {}

export const ProductModel = model<Product, TProduct>('Product', productSchema)
