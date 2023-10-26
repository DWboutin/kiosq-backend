import { IProduct, IProductDocument, ProductModel } from '@/features/products/Product.model'
import { WithDB } from '@/utils/decorators/WithDB'
import { ObjectId } from 'mongodb'

export interface IProductRepository extends IRepository {
  create(productCategory: IProduct): Promise<IProductDocument>
  findAll(): Promise<IProductDocument[]>
  findById(id: string): Promise<IProductDocument | null>
  findByCategoryId(categoryId: string): Promise<IProductDocument[] | null>
  findByTypeId(typeId: string): Promise<IProductDocument[] | null>
  findByVarietyId(varietyId: string): Promise<IProductDocument[] | null>
  findByUserId(userId: string): Promise<IProductDocument[] | null>
  update(id: string, data: Partial<IProduct>): Promise<IProductDocument | null>
  delete(id: string): Promise<IProductDocument | null>
}

export type IProductDocumentPopulated = IProductDocument & {
  category: { _id: ObjectId; name: string }
  type: { _id: ObjectId; name: string }
  variety: { _id: ObjectId; name: string }
  owner: { _id: ObjectId; name: string }
}

@WithDB
export class ProductRepository implements IProductRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(product: IProduct): Promise<IProductDocumentPopulated> {
    const newProduct = new ProductModel({
      description: product.description,
      category: product.category,
      type: product.type,
      variety: product.variety,
      owner: product.owner,
      pricing: product.pricing,
    })
    const savedProduct = await newProduct.save()

    return await savedProduct.populate([
      {
        path: 'category',
        select: 'name',
      },
      {
        path: 'type',
        select: 'name',
      },
      {
        path: 'variety',
        select: 'name',
      },
      {
        path: 'owner',
        select: 'username',
      },
    ])
  }

  public async findAll(): Promise<IProductDocumentPopulated[]> {
    const products = await ProductModel.find()
      .populate('category', 'name')
      .populate('type', 'name')
      .populate('variety', 'name')
      .populate('owner', 'username')

    return products as IProductDocumentPopulated[]
  }

  public async findById(id: string): Promise<IProductDocumentPopulated | null> {
    return await ProductModel.findById(id)
      .populate('category', 'name')
      .populate('type', 'name')
      .populate('variety', 'name')
      .populate('owner', 'username')
  }

  public async findByCategoryId(categoryId: string): Promise<IProductDocument[] | null> {
    return await ProductModel.find({
      category: categoryId,
    })
  }

  public async findByTypeId(typeId: string): Promise<IProductDocument[] | null> {
    return await ProductModel.find({
      type: typeId,
    })
  }

  public async findByVarietyId(varietyId: string): Promise<IProductDocument[] | null> {
    return await ProductModel.find({
      variety: varietyId,
    })
  }

  public async findByUserId(userId: string): Promise<IProductDocument[] | null> {
    return await ProductModel.find({
      owner: userId,
    })
  }

  public async update(id: string, data: Partial<IProduct>): Promise<IProductDocument | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<IProductDocument | null> {
    return await ProductModel.findByIdAndDelete(id)
  }
}
