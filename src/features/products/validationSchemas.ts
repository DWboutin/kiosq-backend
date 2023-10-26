import { ObjectId } from 'mongodb'
import { z } from 'zod'

const productDescription = z
  .string()
  .min(2, { message: 'Minimum 2 characters' })
  .max(255, { message: 'Maximum 255 characters' })

const productInfoNameValidator = z
  .string()
  .min(2, { message: 'Minimum 2 characters' })
  .max(32, { message: 'Maximum 32 characters' })

const mongodDbIdSchema = z.custom((value) => ObjectId.isValid(value as string), {
  message: 'Invalid MongoDB ID',
})

const productPricingType = z.union([z.literal('bulk'), z.literal('pack'), z.literal('unit')])
const productPricingPer = z.union([
  z.literal('kg'),
  z.literal('g'),
  z.literal('l'),
  z.literal('ml'),
  z.literal('unit'),
  z.number(),
])

const pricingSchema = z
  .array(
    z.object({
      type: productPricingType,
      per: productPricingPer,
      price: z.number(),
      currency: z.string(),
    }),
  )
  .optional()

export const productSchema = z.object({
  category: mongodDbIdSchema,
  type: mongodDbIdSchema,
  variety: mongodDbIdSchema,
  description: productDescription,
  pricing: pricingSchema,
})

export const productCategorySchema = z.object({
  name: productInfoNameValidator,
})

export const productCategoryTypeSchema = z.object({
  name: productInfoNameValidator,
  category: mongodDbIdSchema,
})

export const productCategoryTypeVarietySchema = z.object({
  name: productInfoNameValidator,
  type: mongodDbIdSchema,
})
