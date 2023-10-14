import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { IProductCategoryType } from '@/features/products/ProductCategoryType.model'
import { ProductCategoryTypeRepository } from '@/features/products/ProductCategoryTypeRepository'
import { productCategoryTypeVarietySchema } from '@/features/products/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'
import { ProductCategoryTypeFactory } from '@/features/products/ProductCategoryTypeFactory'
import { ProductCategoryTypeVarietyRepository } from '@/features/products/ProductCategoryTypeVarietyRepository'
import { IProductCategoryTypeVariety } from '@/features/products/ProductCategoryTypeVariety.model'
import { ProductCategoryTypeVarietyFactory } from '@/features/products/ProductCategoryTypeVarietyFactory'

export class ProductCategoryTypeVarietyController {
  static async create(req: Request, res: Response) {
    try {
      const validator = new ZodValidator(productCategoryTypeVarietySchema)
      validator.validate(req.body)

      const mongodb = new MongoDBConnector()
      const productCategoryTypeVarietyRepository = new ProductCategoryTypeVarietyRepository(mongodb)
      const productCategoryTypeVariety = await productCategoryTypeVarietyRepository.create(
        req.body as IProductCategoryTypeVariety,
      )
      const response = ProductCategoryTypeVarietyFactory.formatProductCategoryTypeVarietyResponse(
        productCategoryTypeVariety,
      )

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
