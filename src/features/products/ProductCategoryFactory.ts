import { IProductCategoryDocument } from '@/features/products/ProductCategory.model'

export type TProductCategory = Pick<
  IProductCategoryDocument,
  'name' | 'createdAt' | 'updatedAt'
> & {
  id: string
}

export class ProductCategoryFactory {
  static formatProductCategoryResponse(
    productCategory: IProductCategoryDocument,
  ): TProductCategory {
    return {
      id: productCategory._id.toString(),
      name: productCategory.name,
      createdAt: productCategory.createdAt,
      updatedAt: productCategory.updatedAt,
    }
  }
}
