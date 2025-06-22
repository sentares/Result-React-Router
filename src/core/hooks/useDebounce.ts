import { useEffect } from 'react'
import { useTimeout } from './useTimeout'

export function useDebounce(
	callback: () => void,
	delay: number,
	dependencies: unknown[] = []
) {
	const { reset } = useTimeout(callback, delay)

	useEffect(() => {
		reset()
	}, [...dependencies, reset])
}
