import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { IProductCategoryType } from '@/features/products/ProductCategoryType.model'
import { ProductCategoryTypeRepository } from '@/features/products/ProductCategoryTypeRepository'
import { productCategoryTypeSchema } from '@/features/products/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'
import { ProductCategoryTypeFactory } from '@/features/products/ProductCategoryTypeFactory'

export class ProductCategoryTypeController {
  static async create(req: Request, res: Response) {
    try {
      const validator = new ZodValidator(productCategoryTypeSchema)
      validator.validate(req.body)

      const mongodb = new MongoDBConnector()
      const productCategoryTypeRepository = new ProductCategoryTypeRepository(mongodb)
      const productCategoryType = await productCategoryTypeRepository.create(
        req.body as IProductCategoryType,
      )
      const response =
        ProductCategoryTypeFactory.formatProductCategoryTypeResponse(productCategoryType)

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
