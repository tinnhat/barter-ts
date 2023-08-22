import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { categoryAdminRouter } from './routers/adminCategoryRouter'
import { ordersAdminRouter } from './routers/adminOrderRouter'
import { productAdminRouter } from './routers/adminProductRouter'
import { userAdminRouter } from './routers/adminUserRouter'
import { blogRouter } from './routers/blogRouter'
import { keyRouter } from './routers/keyRouter'
import { orderRouter } from './routers/orderRouter'
import { productRouter } from './routers/productRouter'
import { userRouter } from './routers/userRouter'
import { adminDashboardRouter } from './routers/adminDashboardRouter'
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/barterdb'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(() => console.log('error connect mongodb'))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/orders', orderRouter)
app.use('/api/keys', keyRouter)
app.use('/api/users', userRouter)
app.use('/admin/users', userAdminRouter)
app.use('/admin/orders', ordersAdminRouter)
app.use('/admin/products', productAdminRouter)
app.use('/admin/category', categoryAdminRouter)
app.use('/admin/dashboard', adminDashboardRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
