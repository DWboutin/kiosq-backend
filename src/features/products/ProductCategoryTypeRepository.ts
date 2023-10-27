import {
  IProductCategoryType,
  IProductCategoryTypeDocument,
  ProductCategoryTypeModel,
} from '@/features/products/ProductCategoryType.model'
import { WithDB } from '@/utils/decorators/WithDB'

export interface IProductCategoryTypeRepository extends IRepository {
  create(productCategory: IProductCategoryType): Promise<IProductCategoryTypeDocument>
  findAll(): Promise<IProductCategoryTypeDocument[]>
  findById(id: string): Promise<IProductCategoryTypeDocument | null>
  findByCategoryId(categoryId: string): Promise<IProductCategoryTypeDocument[] | null>
  update(
    id: string,
    data: Partial<IProductCategoryType>,
  ): Promise<IProductCategoryTypeDocument | null>
  delete(id: string): Promise<IProductCategoryTypeDocument | null>
}

@WithDB
export class ProductCategoryTypeRepository implements IProductCategoryTypeRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(
    productCategoryType: IProductCategoryType,
  ): Promise<IProductCategoryTypeDocument> {
    const newProductCategoryType = new ProductCategoryTypeModel({
      name: productCategoryType.name,
      category: productCategoryType.category,
    })

    return await newProductCategoryType.save()
  }

  public async findAll(): Promise<IProductCategoryTypeDocument[]> {
    return await ProductCategoryTypeModel.find()
  }

  public async findById(id: string): Promise<IProductCategoryTypeDocument | null> {
    return await ProductCategoryTypeModel.findById(id)
  }

  public async findByCategoryId(
    categoryId: string,
  ): Promise<IProductCategoryTypeDocument[] | null> {
    return await ProductCategoryTypeModel.find({
      category: categoryId,
    })
  }

  public async update(
    id: string,
    data: Partial<IProductCategoryType>,
  ): Promise<IProductCategoryTypeDocument | null> {
    return await ProductCategoryTypeModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<IProductCategoryTypeDocument | null> {
    return await ProductCategoryTypeModel.findByIdAndDelete(id)
  }
}
