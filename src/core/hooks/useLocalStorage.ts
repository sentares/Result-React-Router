import { useState, useCallback } from 'react'

type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorageReturn = [
	value: LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void
		removeItem: () => void
	}
]

export function useLocalStorage(key: string): UseLocalStorageReturn {
	const getItem = () => {
		try {
			return localStorage.getItem(key)
		} catch {
			return null
		}
	}

	const [value, setValue] = useState<LocalStorageReturnValue>(getItem)

	const setItem = useCallback(
		(newValue: LocalStorageSetValue) => {
			localStorage.setItem(key, newValue)
			setValue(newValue)
		},
		[key]
	)

	const removeItem = useCallback(() => {
		localStorage.removeItem(key)
		setValue(null)
	}, [key])

	return [value, { setItem, removeItem }]
}
