import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { BlogType } from '../types/Blog'

export const useGetAllBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: async () =>
      (await apiClient.get<BlogType[]>(`/api/blogs`)).data,
  })

  export const useGetBlogById = (id:string) =>
  useQuery({
    queryKey: ['blog'],
    queryFn: async () =>
      (await apiClient.get<BlogType>(`/api/blogs/${id}`)).data,
  })