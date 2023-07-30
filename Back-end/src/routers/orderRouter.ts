import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Order, OrderModel } from '../models/orderModel'
import { Product } from '../models/productModel'
import { isAuth } from '../utils'
import { UserModel } from '../models/userModel'
export const orderRouter = express.Router()

orderRouter.get(
  '/mine',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id })
    res.json(orders)
  })
)

orderRouter.get(
  // /api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Order Not Found' })
    }
  })
)

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' })
    } else {
      const user = await UserModel.findById(req.user._id)
      if (user && !user.isDelete) {
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
        } as Order)
        res.status(201).json({ message: 'Order Created', order: createdOrder })
      } else {
        res
          .status(401)
          .json({
            message: 'Your account is deleted, Please contact with Admin',
          })
      }
    }
  })
)

orderRouter.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    const user = await UserModel.findById(req.user._id)
    if (user && !user.isDelete) {
      if (order) {
        order.isPaid = true
        order.paidAt = new Date(Date.now())
        const updatedOrder = await order.save()

        res.send({ order: updatedOrder, message: 'Order Paid Successfully' })
      } else {
        res.status(404).json({ message: 'Order Not Found' })
      }
    } else {
      res
        .status(401)
        .json({ message: 'Your account is deleted, Please contact with Admin' })
    }
  })
)
