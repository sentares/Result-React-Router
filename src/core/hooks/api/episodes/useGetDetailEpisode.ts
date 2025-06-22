import { $api } from '@/app/api'
import { type Episode } from '@/data'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

export function useGetDetailEpisode(id: string | number) {
	const [episode, setEpisode] = useState<Episode | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const fetchEpisode = async () => {
		try {
			setLoading(true)
			setError(false)

			const response = await $api.get<Episode>(`episode/${id}`)
			setEpisode(response.data)
		} catch (error) {
			if (isAxiosError(error)) {
				console.error('Axios error:', error.message)
			} else {
				console.error('Unexpected error:', error)
			}
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!id) return
		fetchEpisode()
	}, [id])

	return { episode, loading, error }
}
