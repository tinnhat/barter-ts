import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient'

export const useStatusDashboardMutation = () =>
	useMutation({
		mutationFn: async () => {
			return (await apiClient.get(`admin/dashboard/status`)).data
		},
	})
export const useChartDashboardMutation = () =>
	useMutation({
		mutationFn: async () => {
			return (await apiClient.get(`admin/dashboard/chart`)).data
		},
	})
