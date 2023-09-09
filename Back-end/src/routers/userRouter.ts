import jwt from 'jsonwebtoken'
import bcrypt, {hashSync} from 'bcryptjs'
import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {User, UserModel} from '../models/userModel'
import {generatePass, generateToken, isAuth, isAuthAdmin} from '../utils'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

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

userRouter.post(
	'/forgot-password',
	asyncHandler(async (req: Request, res: Response) => {
		const {email} = req.body
		const user = await UserModel.findOne({email})
		if (user) {
			let config = {
				service: 'gmail',
				auth: {
					user: process.env.USER_MAIL,
					pass: process.env.PASSWORD_MAIL,
				},
			}

			let transporter = nodemailer.createTransport(config)

			let MailGenerator = new Mailgen({
				theme: 'default',
				product: {
					name: 'Barter',
					link: 'https://mailgen.js/',
				},
			})

			const passwordGenerator = generatePass()
			const newPass = bcrypt.hashSync(passwordGenerator)
			user.password = newPass
			user.save()

			let response = {
				body: {
					name: user.name,
					intro: 'You have received this email because a password reset request for your account was received.',
					action: {
						instructions: 'This is your new password',
						button: {
							color: '#DC4D2F',
							text: passwordGenerator,
							link: '',
						},
					},
					outro: 'Please change your password when login first time.',
				},
			}

			let mail = MailGenerator.generate(response)

			let message = {
				from: process.env.USER_MAIL,
				to: email,
				subject: 'Reset Password',
				html: mail,
			}

			transporter
				.sendMail(message)
				.then(() => {
					return res.status(201).json({message: 'Send email successfully'})
				})
				.catch((error) => {
					return res.status(500).json({error})
				})
		} else {
			res.status(401).json({message: 'Email not found'})
		}
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
