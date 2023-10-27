import { IProductCategoryDocument } from '@/features/products/ProductCategory.model'
import { IProductCategoryTypeDocument } from '@/features/products/ProductCategoryType.model'

export type TProductCategoryType = Pick<
  IProductCategoryTypeDocument,
  'name' | 'createdAt' | 'updatedAt'
> & {
  id: string
}

export class ProductCategoryTypeFactory {
  static formatProductCategoryTypeResponse(
    productCategory: IProductCategoryTypeDocument,
  ): TProductCategoryType {
    return {
      id: productCategory._id.toString(),
      name: productCategory.name,
      createdAt: productCategory.createdAt,
      updatedAt: productCategory.updatedAt,
    }
  }
}
