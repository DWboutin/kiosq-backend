import { IProductCategoryTypeDocument } from '@/features/products/ProductCategoryType.model'
import { IProductCategoryTypeVarietyDocument } from '@/features/products/ProductCategoryTypeVariety.model'

export type TProductCategoryTypeVariety = Pick<
  IProductCategoryTypeDocument,
  'name' | 'createdAt' | 'updatedAt'
> & {
  id: string
}

export class ProductCategoryTypeVarietyFactory {
  static formatProductCategoryTypeVarietyResponse(
    productCategory: IProductCategoryTypeVarietyDocument,
  ): TProductCategoryTypeVariety {
    return {
      id: productCategory._id.toString(),
      name: productCategory.name,
      createdAt: productCategory.createdAt,
      updatedAt: productCategory.updatedAt,
    }
  }
}
