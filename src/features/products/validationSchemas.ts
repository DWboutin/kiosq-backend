import { z } from 'zod'

const productDescription = z
  .string()
  .min(2, { message: 'Minimum 2 characters' })
  .max(255, { message: 'Maximum 255 characters' })

const productInfoNameValidator = z
  .string()
  .min(2, { message: 'Minimum 2 characters' })
  .max(32, { message: 'Maximum 32 characters' })

export const productSchema = z.object({
  category: z.string(),
  type: z.string(),
  variety: z.string(),
  description: productDescription,
})

export const productCategorySchema = z.object({
  name: productInfoNameValidator,
})

export const productCategoryTypeSchema = z.object({
  name: productInfoNameValidator,
  category: z.string(),
})

export const productCategoryTypeVarietySchema = z.object({
  name: productInfoNameValidator,
  type: z.string(),
})
