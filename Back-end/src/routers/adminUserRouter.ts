import bcrypt, {hashSync} from 'bcryptjs'
import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {User, UserModel} from '../models/userModel'
import {generateToken, isAuthAdmin} from '../utils'
import {OrderModel} from '../models/orderModel'

export const userAdminRouter = express.Router()
//For admin
userAdminRouter.get(
	'/getAll',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const users = await UserModel.find().select('-password')
    users.sort(x => x.isDelete ? 1 : -1)
		res.json(users)
	})
)

userAdminRouter.post(
	'/signin',
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findOne({email: req.body.email})
		if (user) {
			if (user.isDelete) {
				res.status(401).json({
					message: 'Account is deleted',
				})
				return
			}
			if (!user.isAdmin) {
				res.status(401).json({
					message: 'Account is not Admin',
				})
				return
			}
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					isAdmin: user.isAdmin,
					isDelete: user.isDelete,
					token: generateToken(user),
				})
				return
			} else {
				res.status(401).json({message: 'Invalid password'})
			}
		}
		res.status(401).json({message: 'Email not found'})
	})
)

userAdminRouter.patch(
	'/edit/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(req.params.id)
		if (JSON.stringify(req.body) === '{}') {
			res.status(502).json({message: 'Error params'})
			return
		}
		const {name, phone, isAdmin} = req.body
		if (user) {
			user.name = name
			user.phone = phone
			isAdmin ? (user.isAdmin = true) : (user.isAdmin = false)
			user.save()
			res.status(200).json({
				message: 'Update User successfully',
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					isAdmin: user.isAdmin,
					isDelete: user.isDelete,
				},
			})
			return
		}
		res.status(401).json({message: 'Invalid User'})
	})
)

userAdminRouter.post(
	'/signup',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		const userExist = await UserModel.findOne({email: req.body.email})
		if (userExist) {
			res.status(400).json({message: 'User already exists,Please use another email'})
		}
		const user = await UserModel.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password),
			phone: req.body.phone,
			isAdmin: req.body.isAdmin,
		} as User)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			isAdmin: user.isAdmin,
			isDelete: user.isDelete,
		})
	})
)

userAdminRouter.delete(
	'/:id',
	isAuthAdmin,
	asyncHandler(async (req: Request, res: Response) => {
		//get Order
		const orders = await OrderModel.find({user: req.params.id})
		if (orders) {
			const orderNotPaid = orders.find((item) => item.isPaid === false)
			if (orderNotPaid) {
				res.status(400).json({message: 'User have Order not paid, Can not delete'})
				return
			}
		}
		const user = await UserModel.findById(req.params.id)
		if (user) {
			user.isDelete = true
			user.save()
			res.json({message: 'Delete User Successfully'})
		} else {
			res.status(401).json({message: 'User not found to delete'})
		}
	})
)
