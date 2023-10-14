import {
  IProductCategoryTypeVariety,
  IProductCategoryTypeVarietyDocument,
  ProductCategoryTypeVarietyModel,
} from '@/features/products/ProductCategoryTypeVariety.model'
import { WithDB } from '@/utils/decorators/WithDB'

export interface IProductCategoryTypeVarietyRepository extends IRepository {
  create(productCategory: IProductCategoryTypeVariety): Promise<IProductCategoryTypeVarietyDocument>
  findAll(): Promise<IProductCategoryTypeVarietyDocument[]>
  findById(id: string): Promise<IProductCategoryTypeVarietyDocument | null>
  findByTypeId(typeId: string): Promise<IProductCategoryTypeVarietyDocument[] | null>
  update(
    id: string,
    data: Partial<IProductCategoryTypeVariety>,
  ): Promise<IProductCategoryTypeVarietyDocument | null>
  delete(id: string): Promise<IProductCategoryTypeVarietyDocument | null>
}

@WithDB
export class ProductCategoryTypeVarietyRepository implements IProductCategoryTypeVarietyRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(
    productCategoryType: IProductCategoryTypeVariety,
  ): Promise<IProductCategoryTypeVarietyDocument> {
    const newProductCategoryType = new ProductCategoryTypeVarietyModel({
      name: productCategoryType.name,
      type: productCategoryType.type,
    })

    return await newProductCategoryType.save()
  }

  public async findAll(): Promise<IProductCategoryTypeVarietyDocument[]> {
    return await ProductCategoryTypeVarietyModel.find()
  }

  public async findById(id: string): Promise<IProductCategoryTypeVarietyDocument | null> {
    return await ProductCategoryTypeVarietyModel.findById(id)
  }

  public async findByTypeId(typeId: string): Promise<IProductCategoryTypeVarietyDocument[] | null> {
    return await ProductCategoryTypeVarietyModel.find({
      type: typeId,
    })
  }

  public async update(
    id: string,
    data: Partial<IProductCategoryTypeVariety>,
  ): Promise<IProductCategoryTypeVarietyDocument | null> {
    return await ProductCategoryTypeVarietyModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<IProductCategoryTypeVarietyDocument | null> {
    return await ProductCategoryTypeVarietyModel.findByIdAndDelete(id)
  }
}
