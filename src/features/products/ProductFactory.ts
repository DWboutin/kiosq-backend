import { IProductDocument, TProductSavedPricing } from '@/features/products/Product.model'
import { IProductDocumentPopulated } from '@/features/products/ProductRepository'
import { Document } from 'mongodb'

export type TPopulatedField = Document & Record<string, unknown> & { _id: string }
export type TFormattedPopulatedField = Record<string, unknown> & { id: string }
export type TProduct = Pick<
  IProductDocument,
  'description' | 'pricing' | 'createdAt' | 'updatedAt'
> & {
  id: string
  category: TFormattedPopulatedField
  type: TFormattedPopulatedField
  variety: TFormattedPopulatedField
  owner: TFormattedPopulatedField
}

export class ProductFactory {
  static formatProductsResponse(products: IProductDocumentPopulated[]): TProduct[] {
    return products.map((product) => ProductFactory.formatProductResponse(product))
  }

  static formatProductResponse(product: IProductDocumentPopulated): TProduct {
    const formattedPricings = ProductFactory.formatProductPricingResponse(
      product.pricing as TProductSavedPricing[],
    )

    return {
      id: product._id.toString(),
      description: product.description,
      category: ProductFactory.formatPopulatedField(
        product.category as unknown as TPopulatedField,
        ['name'],
      ),
      type: ProductFactory.formatPopulatedField(product.type as unknown as TPopulatedField, [
        'name',
      ]),
      variety: ProductFactory.formatPopulatedField(product.variety as unknown as TPopulatedField, [
        'name',
      ]),
      pricing: formattedPricings,
      owner: ProductFactory.formatPopulatedField(product.owner as unknown as TPopulatedField, [
        'username',
      ]),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }

  static formatProductPricingResponse(pricings: TProductSavedPricing[]) {
    return pricings.map((pricing) => ({
      id: pricing._id.toString(),
      type: pricing.type,
      per: pricing.per,
      price: pricing.price,
      currency: pricing.currency,
    }))
  }

  static formatPopulatedField(fieldData: TPopulatedField, includeFields: string[]) {
    const fieldDataKeys = includeFields.reduce((obj: Record<string, unknown>, key) => {
      obj[key] = fieldData[key]

      return obj
    }, {})

    return {
      id: fieldData._id.toString(),
      ...fieldDataKeys,
    }
  }
}
