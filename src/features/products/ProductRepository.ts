import { IProduct, IProductDocument, ProductModel } from '@/features/products/Product.model'
import { WithDB } from '@/utils/decorators/WithDB'

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

@WithDB
export class ProductRepository implements IProductRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(product: IProduct): Promise<IProductDocument> {
    console.log({ product })
    const newProduct = new ProductModel({
      description: product.description,
      category: product.category,
      type: product.type,
      variety: product.variety,
      owner: product.owner,
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
    ])
  }

  public async findAll(): Promise<IProductDocument[]> {
    const products = await ProductModel.find()
      .populate('category')
      .populate('type')
      .populate('variety')

    return products
  }

  public async findById(id: string): Promise<IProductDocument | null> {
    return await ProductModel.findById(id)
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
