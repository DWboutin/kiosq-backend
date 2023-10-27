import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { productSchema } from '@/features/products/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'
import { ProductRepository } from '@/features/products/ProductRepository'
import { IProduct } from '@/features/products/Product.model'
import { ProductFactory } from '@/features/products/ProductFactory'
import { TUser } from '@/features/users/UserFactory'

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const user = req.user as TUser
      const productData = { ...req.body, owner: user.id }
      const validator = new ZodValidator(productSchema)
      validator.validate(productData)

      const mongodb = new MongoDBConnector()
      const productRepository = new ProductRepository(mongodb)
      const product = await productRepository.create(productData as IProduct)

      await mongodb.disconnect()

      const response = ProductFactory.formatProductResponse(product)

      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const mongodb = new MongoDBConnector()
      const productRepository = new ProductRepository(mongodb)
      const products = await productRepository.findAll()

      await mongodb.disconnect()

      const response = ProductFactory.formatProductsResponse(products)

      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const mongodb = new MongoDBConnector()
      const productRepository = new ProductRepository(mongodb)
      const product = await productRepository.findById(productId)

      await mongodb.disconnect()

      if (product === null) {
        res.status(404).send('Not found')
        return
      }

      const response = ProductFactory.formatProductResponse(product)

      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }
}
