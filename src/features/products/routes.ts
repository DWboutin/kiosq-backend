import express, { Request, Response } from 'express'
import { UserController } from '@/features/users/UserController'
import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ProductCategoryModel } from '@/features/products/ProductCategory.model'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { ProductCategoryController } from '@/features/products/ProductCategoryController'
import { ProductCategoryTypeController } from '@/features/products/ProductCategoryTypeController'
import { ProductCategoryTypeVarietyController } from '@/features/products/ProductCategoryTypeVarietyController'
import { ProductController } from '@/features/products/ProductController'
import { authenticatedRoute } from '@/middlewares/authenticatedRoute'

export const productsRoutes = express.Router()

productsRoutes.post('/', authenticatedRoute, ProductController.create)
productsRoutes.post('/category', authenticatedRoute, ProductCategoryController.create)
productsRoutes.post('/category-type', authenticatedRoute, ProductCategoryTypeController.create)
productsRoutes.post(
  '/category-type-variety',
  authenticatedRoute,
  ProductCategoryTypeVarietyController.create,
)
