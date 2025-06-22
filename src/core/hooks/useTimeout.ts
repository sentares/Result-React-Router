import { useCallback, useEffect, useRef } from 'react'

interface UseTimeoutReturn {
	clear: () => void
	reset: () => void
}

export function useTimeout(
	callback: () => void,
	delay: number | null
): UseTimeoutReturn {
	const callbackRef = useRef(callback)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const set = useCallback(() => {
		if (delay === null || delay < 0) return

		timeoutRef.current = setTimeout(() => {
			callbackRef.current()
		}, delay)
	}, [delay])

	const clear = useCallback(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
	}, [])

	useEffect(() => {
		set()
		return clear
	}, [delay, set, clear])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	return { clear, reset }
}
