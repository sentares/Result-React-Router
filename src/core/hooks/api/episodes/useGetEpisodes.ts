import { $api } from '@/app/api'
import type { PagiantionResponse } from '@/app/api/types'
import type { Episode } from '@/data'
import axios, { isAxiosError } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ApiResponse extends PagiantionResponse<Episode> {}

interface HookReturn {
	loading: boolean
	error: boolean
	episodes: Episode[]
	hasMore: boolean
	notFound: boolean
}

export function useGetEpisodes(
	query: { search: string },
	pageNumber: number = 1
): HookReturn {
	const cancelRef = useRef<(() => void) | null>(null)

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [notFound, setNotFound] = useState(false)
	const [episodes, setEpisodes] = useState<Episode[]>([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setEpisodes([])
		setHasMore(false)
		setNotFound(false)
	}, [query])

	const fetchEpisodes = useCallback(async () => {
		try {
			setLoading(true)
			setError(false)

			const response = await $api.get<ApiResponse>('episode', {
				params: {
					name: query.search,
					page: pageNumber,
				},
				cancelToken: new axios.CancelToken(cancel => {
					cancelRef.current = cancel
				}),
			})

			if (!response?.data?.results || !Array.isArray(response.data.results)) {
				setNotFound(true)
				setEpisodes([])
				return
			}

			const results = response?.data?.results ?? []
			const info = response?.data?.info

			setEpisodes(prevEpisodes => {
				const newEpisodes = results.filter(
					newEpisode =>
						!prevEpisodes.some(episode => episode.id === newEpisode.id)
				)
				return [...prevEpisodes, ...newEpisodes]
			})

			setHasMore(Boolean(info?.next))
		} catch (error: unknown) {
			if (axios.isCancel(error)) {
				return
			}

			if (isAxiosError(error)) {
				if (error.code === 'ERR_CANCELED') return
				console.error('Axios error fetching episodes:', error.message)
			} else {
				console.error('Unexpected error fetching episodes:', error)
			}
			setError(true)
		} finally {
			setLoading(false)
		}
	}, [query, pageNumber])

	useEffect(() => {
		fetchEpisodes()
	}, [fetchEpisodes])

	return { loading, notFound, error, episodes, hasMore }
}
