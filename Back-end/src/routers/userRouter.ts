import jwt from 'jsonwebtoken'
import bcrypt, {hashSync} from 'bcryptjs'
import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {User, UserModel} from '../models/userModel'
import {generateToken, isAuth, isAuthAdmin} from '../utils'

export const userRouter = express.Router()

userRouter.post(
	'/me',
	asyncHandler(async (req: Request, response: Response) => {
		const {token} = req.body
		try {
			const user: any = jwt.verify(token, process.env.JWT_SECRET!, (err: any, res: any) => {
				if (err) {
					return 'Token expired'
				}
				return res
			})
			if (user == 'Token expired') {
				response.send('Token expired')
			} else {
				response.status(200).json({user})
			}
		} catch (error) {
			response.send(error)
		}
	})
)

userRouter.post(
	'/signin',
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findOne({email: req.body.email})
		if (user) {
			if (user.isDelete) {
				res.status(401).json({
					message: 'Your account is deleted, Please contact with Admin',
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

userRouter.patch(
	'/edit/:id',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(req.params.id)
		if (JSON.stringify(req.body) === '{}') {
			res.status(502).json({message: 'Error params'})
			return
		}
		const {name, phone, password} = req.body
		if (user) {
			name && (user.name = name)
			phone && (user.phone = phone)
			if (password) {
				if (bcrypt.compareSync(password, user.password)) {
					res.status(400).json({
						message: 'Password change must be different current password',
					})
					return
				} else {
					user.password = hashSync(password)
				}
			}
			user.save()
			res.status(200).json({message: 'Update User successfully', user})
			return
		}
		res.status(401).json({message: 'Invalid User'})
	})
)

userRouter.post(
	'/signup',
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
		} as User)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			isAdmin: user.isAdmin,
			token: generateToken(user),
		})
	})
)

