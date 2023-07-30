import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { BlogModel } from '../models/blogModel'
import { isAuth } from '../utils'
import { UserModel } from '../models/userModel'

export const blogRouter = express.Router()
blogRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const allBlogs = await BlogModel.find()
    res.json(allBlogs)
  })
)
//get 1 blog
blogRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const idBlog = req.params.id
    const blog = await BlogModel.findById(idBlog)
    if (blog) {
      res.json(blog)
      return
    }
    res.status(401).json({ message: 'Blog not found' })
  })
)

blogRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const { title, content, user } = req.body
    if (title && content && user) {
      const userAuthor = await UserModel.findById(user)
      if (userAuthor && !userAuthor.isDelete) {
        const createBlog = await BlogModel.create({
          author: userAuthor.name,
          content: content,
          title: title,
          user: userAuthor._id,
        })
        res.status(201).json({ message: 'Blog Created', blog: createBlog })
      } else {
        res.status(401).json({
          message: 'User is deleted, Please contact Admin to more information',
        })
      }
    } else {
      res.status(401).json({ message: 'Please fill all data needed' })
    }
  })
)

blogRouter.patch(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const idBlog = req.params.id
    const { title, content } = req.body
    const blogEdit = await BlogModel.findById(idBlog)
    if (blogEdit) {
      blogEdit.title = title
      blogEdit.content = content
      blogEdit.save()
      res.status(200).json({ message: 'Update Blog successfully', blogEdit })
    } else {
      res.status(401).json({ message: 'Blog not found' })
    }
  })
)

blogRouter.delete(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const idBlog = req.params.id
    const blog = await BlogModel.findById(idBlog)
    if (blog) {
      const blogEdit = await BlogModel.deleteOne({ _id: idBlog })
      res.json({ message: 'Delete blog successfully' })
    } else {
      res.status(404).json({ message: 'Blog not found' })
    }
  })
)
