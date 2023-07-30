import { Blog } from './models/blogModel'
import { User } from './models/userModel'
import { Product } from './types/Product'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: 'Nike slim shirt',
    slug: 'nike-slim-shirt',
    price: 120,
    description: 'lorem1231231231231',
    image: '../images/p1.jpg',
    category: 'Shirts',
    countInStock: 120,
  },
  {
    name: 'Nike slim shirt 2',
    slug: 'nike-slim-shirt-2',
    price: 2200,
    description: 'lorem1231231231231',
    image: '../images/p1.jpg',
    category: 'Shirts special',
    countInStock: 920,
  },
  {
    name: 'Nike slim shirt 3',
    slug: 'nike-slim-shirt-3',
    price: 1020,
    description: 'lorem1231231231231',
    image: '../images/p1.jpg',
    category: 'Shirts',
    countInStock: 110,
  },
  {
    name: 'Nike slim shirt 4',
    slug: 'nike-slim-shirt-4',
    price: 990,
    description: 'lorem1231231231231',
    image: '../images/p1.jpg',
    category: 'Shirts special',
    countInStock: 10,
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    phone: '01231231231',
    isAdmin: true,
    isDelete: false,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    phone: '01231231231',
    isAdmin: false,
    isDelete: false,
  },
]

export const sampleBlogs: Blog[] = [
  {
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel labore ipsam sed dignissimos deserunt? Dolorum voluptatem quaerat voluptatibus distinctio",
    title:"Lorem",
    user: '6497b0a13d0e4209cfbc821e'
  },
]
