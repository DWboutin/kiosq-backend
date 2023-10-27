import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { IProductCategory } from '@/features/products/ProductCategory.model'
import { ProductCategoryRepository } from '@/features/products/ProductCategoryRepository'
import { ProductCategoryFactory } from '@/features/products/ProductCategoryFactory'
import { productCategorySchema } from '@/features/products/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'

export class ProductCategoryController {
  static async create(req: Request, res: Response) {
    try {
      const validator = new ZodValidator(productCategorySchema)
      validator.validate(req.body)

      const mongodb = new MongoDBConnector()
      const productCategoryRepository = new ProductCategoryRepository(mongodb)
      const productCategory = await productCategoryRepository.create(req.body as IProductCategory)
      const response = ProductCategoryFactory.formatProductCategoryResponse(productCategory)

      await mongodb.disconnect()

      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }
}
