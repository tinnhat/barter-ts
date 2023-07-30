import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './userModel'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Blog {
  public _id?: string
  @prop({ required: true })
  public title!: string
  @prop({ required: true })
  public content!: string
  @prop({ required: false })
  public author!: string
  @prop({ ref: User })
  public user?: Ref<User>
}

export const BlogModel = getModelForClass(Blog)