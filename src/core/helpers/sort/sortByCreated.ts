import type { SortType } from './types'

export function sortByCreated<T extends { created: string; id: number }>(
	items: T[],
	sort: SortType
): T[] {
	return [...items].sort((a, b) => {
		const dateA = new Date(a.created).getTime() || 0
		const dateB = new Date(b.created).getTime() || 0

		if (sort === 'createdASC') return dateA - dateB
		if (sort === 'createdDESC') return dateB - dateA
		return 0
	})
}
