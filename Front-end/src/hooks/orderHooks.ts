import {ShippingAddress} from './../types/Cart'
import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient'
import {CartItem} from '../types/Cart'
import {Order} from '../types/Order'
export const useGetOrderDetailsQuery = (id: string) =>
	useQuery({
		queryKey: ['order', id],
		queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
	})

export const useGetPaypalClientIdQuery = () =>
	useQuery({
		queryKey: ['paypal-clientId'],
		queryFn: async () => (await apiClient.get<{clientId: string}>(`/api/keys/paypal`)).data,
	})

export const usePayOrderMutation = () =>
	useMutation({
		mutationFn: async (details: {orderId: string}) => (await apiClient.put<{message: string; order: Order}>(`api/orders/${details.orderId}/pay`, details)).data,
	})

export const useCreateOrderMutation = () =>
	useMutation({
		mutationFn: async (order: {orderItems: CartItem[]; shippingAddress: ShippingAddress; paymentMethod: string; itemsPrice: number; shippingPrice: number; taxPrice: number; totalPrice: number}) => {
			return (await apiClient.post<{message: string; order: Order}>(`api/orders`, order)).data
		},
	})

//admin
export const useGetAllOrdersQuery = () =>
	useQuery({
		queryKey: ['orders'],
		queryFn: async () => (await apiClient.get<Order[]>(`admin/orders`)).data,
	})

export const useCreateOrderAdminMutation = () =>
	useMutation({
		mutationFn: async (order: {
			orderItems: CartItem[]
			shippingAddress: ShippingAddress
			paymentMethod: string
			itemsPrice: number
			shippingPrice: number
			taxPrice: number
			totalPrice: number
			isPaid: boolean
			isDelivered: boolean
		}) => {
			return (await apiClient.post<{message: string; order: Order}>(`admin/orders`, order)).data
		},
	})

export const useUpdateOrderAdminMutation = () =>
	useMutation({
		mutationFn: async (order: {
      _id: string
			orderItems: CartItem[]
			shippingAddress: ShippingAddress
			paymentMethod: string
			itemsPrice: number
			shippingPrice: number
			taxPrice: number
			totalPrice: number
			isPaid: boolean
			isDelivered: boolean
		}) => {
			return (await apiClient.patch<{message: string; order: Order}>(`admin/orders/edit/${order._id}`, order)).data
		},
	})

export const useDeleteOrderMutation = () =>
	useMutation({
		mutationFn: async (_id: string) => {
			return (await apiClient.delete<Order>(`admin/orders/${_id}`)).data
		},
	})
