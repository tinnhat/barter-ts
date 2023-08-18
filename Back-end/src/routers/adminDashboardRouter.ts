import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {UserModel} from '../models/userModel'
import {Order, OrderModel} from '../models/orderModel'
import { ProductModel } from '../models/productModel'

export const adminDashboardRouter = express.Router()
adminDashboardRouter.get(
	'/status',
	asyncHandler(async (req: Request, res: Response) => {
		const users = await UserModel.find()
		const orders = await OrderModel.find()
		const products = await ProductModel.find()
		const totalIncome = orders.reduce((acc, val) => {
			return acc + val.totalPrice
		}, 0)
		res.json([
			{
				icon: 'bx bx-shopping-bag',
				count: products.length,
				title: 'Total Products',
			},
			{
				icon: 'bx bx-cart',
				count: users.length,
				title: 'Customer',
			},
			{
				icon: 'bx bx-dollar-circle',
				count: '$ ' + totalIncome,
				title: 'Total income',
			},
			{
				icon: 'bx bx-receipt',
				count: orders.length,
				title: 'Total orders',
			},
		])
	})
)

adminDashboardRouter.get(
	'/chart',
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find()
		const arrOrderPaid = new Array(12).fill(0)
		const arrOrderCreated = new Array(12).fill(0)
		orders.forEach((order: any) => {
			const month = new Date(order.createdAt).getMonth()
			if (order.isPaid) {
				arrOrderPaid[month]++
			}
		})
		for (let i = 0; i < arrOrderCreated.length; i++) {
			orders.forEach((order: any) => {
				const month = new Date(order.createdAt).getMonth()
				if (i === month) {
					arrOrderCreated[i]++
				}
			})
		}
		res.json([
			{
				name: 'Order create',
				data: arrOrderCreated,
			},
			{
				name: 'Order paid',
				data: arrOrderPaid,
			},
		])
	})
)
adminDashboardRouter.get(
	'/top-customers',
	asyncHandler(async (req: Request, res: Response) => {
		const users = await UserModel.find()
		const orders = await OrderModel.find()
		const allUserOrdered: any[] = []
		orders.forEach((order: any) => {
			if (order.isPaid) {
				allUserOrdered.push({
					userId: order.user,
					price: order.totalPrice,
				})
			}
		})
		const converUserById = allUserOrdered.map((item: any) => {
			const userFind: any = users.find((val: any) => val._id + '' == item.userId)
			return {
				_id: userFind?._id,
				email: userFind?.email,
				name: userFind?.name,
				orderQuantity: 1,
				price: item.price,
			}
		})
		const result = converUserById.reduce((acc: any[], value: any) => {
			if (acc.length == 0) {
				acc.push(value)
			} else {
				const idx = acc.findIndex((item) => item._id === value._id)
				if (idx != -1) {
					acc[idx].orderQuantity = acc[idx].orderQuantity + 1
				} else {
					acc.push(value)
				}
			}
			return acc
		}, [])
		if (result.length > 10) {
			res.json(result.slice(0, 10))
		} else {
			res.json(result)
		}
	})
)
adminDashboardRouter.get(
	'/top-products',
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find()
		const allProductOrdered: any[] = []
		orders.forEach((order: Order) => {
			if (order.isPaid) {
				allProductOrdered.push(...order.orderItems)
			}
		})
		const result = allProductOrdered.reduce((acc: any[], value: any) => {
			if (acc.length == 0) {
				acc.push(value)
			} else {
				const idx = acc.findIndex((item) => item._id === value._id)
				if (idx != -1) {
					acc[idx].quantity = acc[idx].quantity + value.quantity
					acc[idx].price = acc[idx].price + value.price
				} else {
					acc.push(value)
				}
			}
			return acc
		}, [])
		res.json(result)
	})
)
