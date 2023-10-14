import { IProductDocument } from '@/features/products/Product.model'
import { IProductCategoryDocument } from '@/features/products/ProductCategory.model'

export type TProductCategory = Pick<
  IProductDocument,
  'description' | 'category' | 'type' | 'variety' | 'createdAt' | 'updatedAt'
> & {
  id: string
}

export class ProductFactory {
  static formatProductResponse(product: IProductDocument): TProductCategory {
    return {
      id: product._id.toString(),
      description: product.description,
      category: product.category,
      type: product.type,
      variety: product.variety,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
