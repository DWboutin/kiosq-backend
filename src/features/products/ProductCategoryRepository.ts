import {
  IProductCategory,
  IProductCategoryDocument,
  ProductCategoryModel,
} from '@/features/products/ProductCategory.model'
import { WithDB } from '@/utils/decorators/WithDB'

export interface IProductCategoryRepository extends IRepository {
  create(productCategory: IProductCategory): Promise<IProductCategoryDocument>
  findAll(): Promise<IProductCategoryDocument[]>
  findById(id: string): Promise<IProductCategoryDocument | null>
  update(id: string, data: Partial<IProductCategory>): Promise<IProductCategoryDocument | null>
  delete(id: string): Promise<IProductCategoryDocument | null>
}

@WithDB
export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(productCategory: IProductCategory): Promise<IProductCategoryDocument> {
    const newProductCategory = new ProductCategoryModel({
      name: productCategory.name,
    })

    return await newProductCategory.save()
  }

  public async findAll(): Promise<IProductCategoryDocument[]> {
    return await ProductCategoryModel.find()
  }

  public async findById(id: string): Promise<IProductCategoryDocument | null> {
    return await ProductCategoryModel.findById(id)
  }

  public async update(
    id: string,
    data: Partial<IProductCategory>,
  ): Promise<IProductCategoryDocument | null> {
    return await ProductCategoryModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<IProductCategoryDocument | null> {
    return await ProductCategoryModel.findByIdAndDelete(id)
  }
}
