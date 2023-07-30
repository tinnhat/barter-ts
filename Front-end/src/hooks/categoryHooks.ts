import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient'
import {Category} from '../types/Category'

export const useGetAllCategory = () =>
	useQuery({
		queryKey: ['categories'],
		queryFn: async () => (await apiClient.get<Category[]>(`/admin/category`)).data,
	})
export const useCreateCategoryMutation = () =>
	useMutation({
		mutationFn: async ({name, isUse}: {name: string; isUse: boolean}) => {
			return (
				await apiClient.post<Category>(`admin/category`, {
					isUse,
					name,
				})
			).data
		},
	})
export const useUpdateCategoryMutation = () =>
	useMutation({
		mutationFn: async ({_id, name, isUse}: {_id: string; name: string; isUse: boolean}) => {
			return (
				await apiClient.patch<Category>(`admin/category/edit/${_id}`, {
					isUse,
					name,
				})
			).data
		},
	})
export const useDeleteCategoryMutation = () =>
	useMutation({
		mutationFn: async (_id: string) => {
			return (await apiClient.delete<Category>(`admin/category/${_id}`)).data
		},
	})
