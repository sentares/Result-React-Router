import { useLocation } from 'react-router-dom'

interface LocationState {
	from?: {
		pathname: string
	}
}

export function useRedirectFrom() {
	const location = useLocation()
	const state = location.state as LocationState | undefined
	return state?.from?.pathname || '/'
}
