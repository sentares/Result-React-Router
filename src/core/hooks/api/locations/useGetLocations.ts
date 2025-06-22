import { $api } from '@/app/api'
import type { PagiantionResponse } from '@/app/api/types'
import type { Location } from '@/data'
import axios, { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface ApiResponse extends PagiantionResponse<Location> {}

interface HookReturn {
	loading: boolean
	error: boolean
	locations: Location[]
	hasMore: boolean
	notFound: boolean
}

export function useGetlocations(
	query: { search: string },
	pageNumber: number = 1
): HookReturn {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [notFound, setNotFound] = useState(false)
	const [locations, setLocations] = useState<Location[]>([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setLocations([])
		setHasMore(false)
		setNotFound(false)
	}, [query])

	const fetchLocations = useCallback(async () => {
		let cancel

		try {
			setLoading(true)
			setError(false)

			const response = await $api.get<ApiResponse>('location', {
				params: {
					name: query.search,
					page: pageNumber,
				},
				cancelToken: new axios.CancelToken(c => (cancel = c)),
			})

			if (!response?.data?.results || !Array.isArray(response.data.results)) {
				setNotFound(true)
				setLocations([])
				return
			}

			const results = response?.data?.results ?? []
			const info = response?.data?.info

			setLocations(prevLocations => {
				const newLocations = results.filter(
					newLocation =>
						!prevLocations.some(location => location.id === newLocation.id)
				)
				return [...prevLocations, ...newLocations]
			})

			setHasMore(Boolean(info?.next))
		} catch (error: unknown) {
			if (axios.isCancel(error)) {
				return
			}

			if (isAxiosError(error)) {
				if (error.code === 'ERR_CANCELED') return
				console.error('Axios error fetching locations:', error.message)
			} else {
				console.error('Unexpected error fetching locations:', error)
			}
			setError(true)
		} finally {
			setLoading(false)
		}
	}, [query, pageNumber])

	useEffect(() => {
		fetchLocations()
	}, [fetchLocations])

	return { loading, notFound, error, locations, hasMore }
}
