import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient'
import {UserInfo} from '../types/UserInfo'
import {Order} from '../types/Order'

export const useSigninMutation = () =>
	useMutation({
		mutationFn: async ({email, password}: {email: string; password: string}) => {
			return (await apiClient.post<UserInfo>(`api/users/signin`, {email, password})).data
		},
	})
export const useSigninAdminMutation = () =>
	useMutation({
		mutationFn: async ({email, password}: {email: string; password: string}) => {
			return (await apiClient.post<UserInfo>(`admin/users/signin`, {email, password})).data
		},
	})

export const useSignupMutation = () =>
	useMutation({
		mutationFn: async ({email, password, phone, name}: {email: string; password: string; phone: string; name: string}) => {
			return (
				await apiClient.post<UserInfo>(`api/users/signup`, {
					email,
					password,
					phone,
					name,
				})
			).data
		},
	})

export const useUpdateInforMutation = () =>
	useMutation({
		mutationFn: async ({_id, password = '', phone, name}: {_id: string; password?: string; phone: string; name: string}) => {
			if (password) {
				return (
					await apiClient.patch<UserInfo>(`api/users/edit/${_id}`, {
						password,
						phone,
						name,
					})
				).data
			} else {
				return (
					await apiClient.patch<UserInfo>(`api/users/edit/${_id}`, {
						phone,
						name,
					})
				).data
			}
		},
	})

export const useGetOrderHistoryQuery = () =>
	useQuery({
		queryKey: ['order-history'],
		queryFn: async () => (await apiClient.get<Order[]>(`/api/orders/mine`)).data,
	})

//admin
export const useGetAllUsersQuery = () =>
	useQuery({
		queryKey: ['allUser'],
		queryFn: async () => (await apiClient.get<UserInfo[]>(`/admin/users/getAll`)).data,
	})

export const useAdminSignupMutation = () =>
	useMutation({
		mutationFn: async ({email, password, phone, name, isAdmin}: {email: string; password: string; phone: string; name: string; isAdmin: boolean}) => {
			return (
				await apiClient.post<UserInfo>(`admin/users/signup`, {
					email,
					password,
					phone,
					name,
					isAdmin,
				})
			).data
		},
	})

export const useAdminUpdateInforMutation = () =>
	useMutation({
		mutationFn: async ({_id, phone, email, name, isAdmin}: {_id: string; email: string; phone: string; name: string; isAdmin: boolean}) => {
			return (
				await apiClient.patch<UserInfo>(`admin/users/edit/${_id}`, {
					email,
					phone,
					name,
					isAdmin,
				})
			).data
		},
	})

export const useDeleteUserMutation = () =>
	useMutation({
		mutationFn: async (_id: string) => {
			return (await apiClient.delete<UserInfo>(`admin/users/${_id}`)).data
		},
	})
