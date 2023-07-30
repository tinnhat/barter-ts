import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { sampleBlogs, sampleProducts, sampleUsers } from '../data'
import { UserModel } from '../models/userModel'
import { BlogModel } from '../models/blogModel'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)
    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)
    await BlogModel.deleteMany({})
    const createdBlogs = await BlogModel.insertMany(sampleBlogs)
    res.send({ createdProducts,createdUsers,createdBlogs })
  })
)
