import {modelOptions, prop, getModelForClass, Ref} from '@typegoose/typegoose'
import {Category} from './categoryModel'

@modelOptions({schemaOptions: {timestamps: true}})
export class Product {
	public _id?: string

	@prop({required: true})
	public name!: string

	@prop({required: true, unique: true})
	public slug!: string

	@prop({required: true})
	public image!: string

	@prop({required: true})
	public category!: string

	@prop({ref: Category})
	public categoryId?: Ref<Product>

	@prop({required: true})
	public description!: string

	@prop({required: true, default: 0})
	public price!: number

	@prop({required: true, default: 0})
	public countInStock!: number
}

export const ProductModel = getModelForClass(Product)
