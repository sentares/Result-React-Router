import { $api } from '@/app/api'
import type { PagiantionResponse } from '@/app/api/types'
import type { Character } from '@/data'
import axios, { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface ApiResponse extends PagiantionResponse<Character> {}

interface HookReturn {
	loading: boolean
	error: boolean
	characters: Character[]
	hasMore: boolean
	notFound: boolean
}

export function useGetCharacters(
	query: { search: string; sort: string },
	pageNumber: number = 1
): HookReturn {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [notFound, setNotFound] = useState(false)
	const [characters, setCharacters] = useState<Character[]>([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setCharacters([])
		setHasMore(false)
		setNotFound(false)
	}, [query])

	const fetchCharacters = useCallback(
		async (customPage?: number) => {
			let cancel

			try {
				setLoading(true)
				setError(false)

				const response = await $api.get<ApiResponse>('character', {
					params: {
						name: query.search,
						sort: query.sort,
						page: customPage ?? pageNumber,
					},
					cancelToken: new axios.CancelToken(c => (cancel = c)),
				})

				if (!response?.data?.results || !Array.isArray(response.data.results)) {
					setNotFound(true)
					setCharacters([])
					return
				}

				const results = response?.data?.results ?? []
				const info = response?.data?.info

				setCharacters(prevCharacters => {
					const newCharacters = results.filter(
						newCharacter =>
							!prevCharacters.some(
								character => character.id === newCharacter.id
							)
					)
					return [...prevCharacters, ...newCharacters]
				})

				setHasMore(Boolean(info?.next))
			} catch (error: unknown) {
				if (axios.isCancel(error)) {
					return
				}

				if (isAxiosError(error)) {
					if (error.code === 'ERR_CANCELED') return
					console.error('Axios error fetching characters:', error.message)
				} else {
					console.error('Unexpected error fetching characters:', error)
				}
				setError(true)
			} finally {
				setLoading(false)
			}
		},
		[query, pageNumber]
	)

	useEffect(() => {
		fetchCharacters()
	}, [fetchCharacters])

	return { loading, notFound, error, characters, hasMore }
}
