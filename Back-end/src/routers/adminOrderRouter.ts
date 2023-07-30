import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {isAuthAdmin} from '../utils'
import {Order, OrderModel} from '../models/orderModel'
import {UserModel} from '../models/userModel'
import {Product} from '../models/productModel'

export const ordersAdminRouter = express.Router()

ordersAdminRouter.get(
	'/',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find()
		res.json([...orders])
	})
)

ordersAdminRouter.post(
	'/',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		if (req.body.orderItems.length === 0) {
			res.status(400).json({message: 'Cart is empty'})
		} else {
			const user = await UserModel.findById(req.user._id)
			if (user && !user.isDelete) {
				if (req.body.orderItems.length > 0) {
					const createdOrder = await OrderModel.create({
						orderItems: req.body.orderItems.map((x: Product) => ({
							...x,
							product: x._id,
						})),
						shippingAddress: req.body.shippingAddress,
						paymentMethod: req.body.paymentMethod,
						itemsPrice: req.body.itemsPrice,
						shippingPrice: req.body.shippingPrice,
						taxPrice: req.body.taxPrice,
						totalPrice: req.body.totalPrice,
						user: req.user._id,
						isPaid: req.body.isPaid,
						isDelivered: req.body.isDelivered,
					} as Order)
					res.status(201).json({message: 'Order Created', order: createdOrder})
				} else {
					res.status(400).json({
						message: 'Order Items is empty',
					})
				}
			} else {
				res.status(401).json({
					message: 'Owner has been deleted',
				})
			}
		}
	})
)

ordersAdminRouter.patch(
	'/edit/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		if (req.body.orderItems.length === 0) {
			res.status(400).json({message: 'Cart is empty'})
		} else {
			const user = await UserModel.findById(req.user._id)
			if (user && !user.isDelete) {
				const order = await OrderModel.findById({_id: req.params.id})
        if(order){
          const {isDelivered, isPaid, itemsPrice, orderItems, paymentMethod, shippingPrice,taxPrice,totalPrice,shippingAddress} = req.body
          order.isDelivered = isDelivered
          order.isPaid = isPaid
          order.itemsPrice = itemsPrice
          order.orderItems = orderItems
          order.paymentMethod = paymentMethod
          order.shippingPrice = shippingPrice
          order.taxPrice = taxPrice
          order.totalPrice = totalPrice
          order.shippingAddress = shippingAddress
          order.save()
          res.json(order)
          return
        }
        else{
          res.status(401).json({
            message: 'Order not found',
          })
        }
			} else {
				res.status(401).json({
					message: 'Owner has been deleted',
				})
			}
		}
	})
)

ordersAdminRouter.delete(
	'/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		//get Order
		const order = await OrderModel.findById({_id: req.params.id})
		if (order) {
			if (order.isPaid) {
				res.status(401).json({
					message: 'Order has been paid, Can not delete',
				})
			} else {
				await OrderModel.findByIdAndDelete(req.params.id)
				res.json({message: 'Delete Order successfully'})
			}
		} else {
			res.status(401).json({
				message: 'Order not found',
			})
		}
	})
)
