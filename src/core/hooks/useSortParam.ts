import { useSearchParams } from 'react-router-dom'
import type { SortType } from '../helpers/sort'

const allowedSorts: SortType[] = ['createdASC', 'createdDESC']

export function useSortParam(): SortType {
	const [searchParams] = useSearchParams()
	const rawSort = searchParams.get('sort') ?? ''
	return allowedSorts.includes(rawSort as SortType) ? (rawSort as SortType) : ''
}
