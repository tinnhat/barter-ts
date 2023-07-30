import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  public _id?: string
  @prop({ required: true })
  public name!: string
  @prop({ required: true })
  public isUse!: boolean
}

export const CategoryModel = getModelForClass(Category)