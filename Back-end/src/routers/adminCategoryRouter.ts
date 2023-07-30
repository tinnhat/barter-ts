import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {Category, CategoryModel} from '../models/categoryModel'
import {isAuthAdmin} from '../utils'

export const categoryAdminRouter = express.Router()
categoryAdminRouter.get(
	'/',
	asyncHandler(async (req: Request, res: Response) => {
		const allCategory = await CategoryModel.find()
		res.json(allCategory)
	})
)

categoryAdminRouter.post(
	'/',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const {name, isUse} = req.body
		const nameFormat = name.replace(/\s+/g, ' ').trim()
		try {
			const newCategory = await CategoryModel.create({
				name,
				isUse,
			} as Category)
			res.json({category: newCategory})
		} catch (error) {
			res.status(400).json(error)
		}
	})
)

categoryAdminRouter.patch(
	'/edit/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const {name, isUse} = req.body
		const nameFormat = name.replace(/\s+/g, ' ').trim()
		try {
			const category = await CategoryModel.findById({_id: req.params.id})
			if (category) {
				category.name = nameFormat
				category.isUse = isUse
				category.save()
				res.json(category)
			} else {
				res.status(401).json({message: 'Invalid Category'})
			}
		} catch (error) {
			res.status(400).json(error)
		}
	})
)

categoryAdminRouter.delete(
	'/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const category = await CategoryModel.findById({_id: req.params.id})
		if (category) {
			if (category.isUse) {
				res.status(400).json({message: 'Category is in use, Can not delete'})
			}
			const result = await CategoryModel.findByIdAndDelete(req.params.id)
			res.json({message: 'Delete category successfully'})
		} else {
			res.status(401).json({message: 'Invalid Category'})
		}
	})
)
