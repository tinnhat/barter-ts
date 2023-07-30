import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Product } from './productModel'
import { User } from './userModel'

class ShippingAddress {
  @prop()
  public fullName?: string
  @prop()
  public address?: string
  @prop()
  public postalCode?: string
  @prop()
  public note?: string
}

class Item {
  @prop({ required: true })
  public _id!: string
  @prop({ required: true })
  public name!: string
  @prop({ required: true })
  public quantity!: string
  @prop({ required: true })
  public image!: number
  @prop({ required: true })
  public price!: number
  @prop({ ref: Product })
  public product?: Ref<Product>
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Order {
  public _id!: string
  @prop()
  public orderItems!: Item[]
  @prop()
  public shippingAddress?: ShippingAddress

  @prop({ ref: User })
  public user?: Ref<User>

  @prop({ required: true })
  public paymentMethod!: string


  @prop({ required: true, default: 0 })
  public itemsPrice!: number
  @prop({ required: true, default: 0 })
  public shippingPrice!: number
  @prop({ required: true, default: 0 })
  public taxPrice!: number
  @prop({ required: true, default: 0 })
  public totalPrice!: number
  @prop({ required: true, default: false })
  public isPaid!: boolean
  @prop()
  public paidAt!: Date
  @prop({ required: true, default: false })
  public isDelivered!: boolean
  @prop()
  public deliveredAt!: Date
}

export const OrderModel = getModelForClass(Order)