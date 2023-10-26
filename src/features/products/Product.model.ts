import { Document, InferSchemaType, Model, Schema, model } from 'mongoose'

export type TProductPricingType = 'bulk' | 'pack' | 'unit'
export type TProductPricingPer = 'kg' | 'g' | 'l' | 'ml' | 'unit' | number
export type TProductPricing = {
  type: TProductPricingType
  per: TProductPricingPer
  price: number
  currency: string
}
export type TProductSavedPricing = TProductPricing & {
  _id: string
}

export interface IProduct {
  description: string
  category: any
  type: any
  variety: any
  owner: any
  pricing: TProductPricing[]
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
    pricing: [
      {
        type: {
          type: String,
          required: true,
        },
        per: {
          type: Schema.Types.Mixed,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
)

export type Product = InferSchemaType<typeof productSchema>
export type TProduct = Model<Product, {}>
export interface IProductDocument extends Product, Document {}

export const ProductModel = model<Product, TProduct>('Product', productSchema)
