import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient'
import {Product} from '../types/Product'

export const useGetProductsQuery = () =>
	useQuery({
		queryKey: ['products'],
		queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
	})

export const useGetProductDetailBySlugQuery = (slug: string) =>
	useQuery({
		queryKey: ['products', slug],
		queryFn: async () => (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
	})

//admin
export const useCreateProductMutation = () =>
	useMutation({
		mutationFn: async ({image, category, countInStock, description, name, price}: {image: string; category: string; countInStock: number; description: string; name: string; price: number}) => {
			return (
				await apiClient.post<Product>(`admin/products`, {
					image,
					category,
					countInStock,
					description,
					name,
					price,
				})
			).data
		},
	})

export const useUpdateProductMutation = () =>
	useMutation({
		mutationFn: async ({
			_id,
			image,
			category,
			countInStock,
			description,
			name,
			price,
		}: {
			_id: string
			image?: string
			category: string
			countInStock: number
			description: string
			name: string
			price: number
		}) => {

			return (
				await apiClient.patch<Product>(`admin/products/edit/${_id}`, {
					image,
					category,
					countInStock,
					description,
					name,
					price,
				})
			).data
		},
	})

  export const useDeleteProductMutation = () =>
	useMutation({
		mutationFn: async (_id:string) => {
			return (await apiClient.delete<Product>(`admin/products/${_id}`)).data
		},
	})