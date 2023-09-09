import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {User} from './models/userModel'
export const generateToken = (user: User) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isDelete: user.isDelete,
		},
		process.env.JWT_SECRET || 'somethingsecret',
		{
			expiresIn: '1d',
		}
	)
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const {authorization} = req.headers
	if (authorization) {
		const token = authorization.slice(7, authorization.length) // Bearer xxxxx
		const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
		req.user = decode as {
			_id: string
			name: string
			email: string
			isAdmin: boolean
			isDelete: boolean
			token: string
		}
		next()
	} else {
		res.status(401).json({message: 'No Token'})
	}
}

export const isAuthAdmin = (req: Request, res: Response, next: NextFunction) => {
	const {authorization} = req.headers
	if (authorization) {
		const token = authorization.slice(7, authorization.length) // Bearer xxxxx
		const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
		req.user = decode as {
			_id: string
			name: string
			email: string
			isAdmin: boolean
			isDelete: boolean
			token: string
		}
		if (req.user.isAdmin) {
			next()
		} else {
			res.status(403).json({message: 'Permission denied'})
		}
	} else {
		res.status(401).json({message: 'No Token'})
	}
}

export function generatePass() {
	let pass = ''
	let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$'

	for (let i = 1; i <= 8; i++) {
		let char = Math.floor(Math.random() * str.length + 1)

		pass += str.charAt(char)
	}

	return pass
}
