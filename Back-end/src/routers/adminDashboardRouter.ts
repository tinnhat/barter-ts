import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {UserModel} from '../models/userModel'
import {OrderModel} from '../models/orderModel'

export const adminDashboardRouter = express.Router()
adminDashboardRouter.get(
	'/status',
	asyncHandler(async (req: Request, res: Response) => {
		const users = await UserModel.find()
		const orders = await OrderModel.find()
		console.log(orders)

		const products = await OrderModel.find()
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

	})
)
adminDashboardRouter.get(
	'/top-products',
	asyncHandler(async (req: Request, res: Response) => {
		
	})
)
