import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {isAuthAdmin} from '../utils'
import {Product, ProductModel} from '../models/productModel'
import {OrderModel} from '../models/orderModel'

export const productAdminRouter = express.Router()

productAdminRouter.post(
	'/',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const {image, category, categoryId, countInStock, description, name, price} = req.body
		const nameRemoveWhiteSpace = name.replace(/\s+/g, ' ').trim()
		const slug = nameRemoveWhiteSpace.split(' ').join('-')
		try {
			const newProduct = await ProductModel.create({
				name,
				slug: slug,
				image: image,
				category,
				categoryId,
				countInStock: +countInStock,
				description,
				price: +price,
			} as Product)
			res.json({product: newProduct})
		} catch (error) {
			res.status(400).json(error)
		}
	})
)

productAdminRouter.patch(
	'/edit/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const product = await ProductModel.findById(req.params.id)
		if (JSON.stringify(req.body) === '{}') {
			res.status(502).json({message: 'Error params'})
			return
		}
		const {image, name, category,categoryId, price, countInStock, description} = req.body
		if (product) {
			const allOrder = await OrderModel.find()
			allOrder.forEach((order) => {
				order.orderItems = order.orderItems.map((item) => {
					if (item._id === req.params.id) {
						return {
							...item,
							category,
              categoryId,
							image,
							name,
							price,
						}
					}
					return item
				})
				order.save()
			})

			product.image = image
			product.name = name
			product.category = category
			product.categoryId = categoryId
			product.price = price
			product.countInStock = countInStock
			product.description = description
			product.save()
			res.json(product)
			return
		}
		res.status(401).json({message: 'Invalid Product'})
	})
)

productAdminRouter.delete(
	'/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const product = await ProductModel.find({_id: req.params.id})
		if (product) {
			const allOrder = await OrderModel.find()
			const listOrderNotPaid = allOrder.filter((order) => order.isPaid !== true)
			if (listOrderNotPaid) {
				let countNotPaidProduct = 0
				listOrderNotPaid.forEach((order) => {
					order.orderItems.forEach((item) => {
						if (item._id === req.params.id) {
							countNotPaidProduct++
						}
					})
				})
				if (countNotPaidProduct === 0) {
					const result = await ProductModel.findByIdAndDelete(req.params.id)
					res.json({message: 'Delete Product successfully'})
				} else {
					res.status(400).json({message: 'Product is in Order not paid'})
				}
			} else {
				//product is paid and the order is complete
				const result = await ProductModel.findByIdAndDelete(req.params.id)
				res.json({message: 'Delete Product successfully'})
			}
		} else {
			res.status(401).json({message: 'Product not found to delete'})
		}
	})
)
