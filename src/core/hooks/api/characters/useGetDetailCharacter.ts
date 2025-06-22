import { useEffect, useState } from 'react'
import { type Character } from '@/data'
import { isAxiosError } from 'axios'
import { $api } from '@/app/api'

export function useGetDetailCharacter(id: string | number) {
	const [character, setCharacter] = useState<Character | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const fetchCharacter = async () => {
		try {
			setLoading(true)
			setError(false)

			const response = await $api.get<Character>(`character/${id}`)
			setCharacter(response.data)
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
		fetchCharacter()
	}, [id])

	return { character, loading, error }
}
