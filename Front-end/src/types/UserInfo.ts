export type UserInfo = {
  _id: string
  name: string
  email: string
  phone:string
  token?:string
  isAdmin:boolean
  isDelete?: boolean
}