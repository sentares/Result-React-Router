import { $api } from '@/app/api'
import { type Location } from '@/data'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

export function useGetDetailLocation(id: string | number) {
	const [location, setLocation] = useState<Location | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const fetchLocation = async () => {
		try {
			setLoading(true)
			setError(false)

			const response = await $api.get<Location>(`location/${id}`)
			setLocation(response.data)
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
		fetchLocation()
	}, [id])

	return { location, loading, error }
}
