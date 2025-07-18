import { useSearchParams } from 'react-router-dom'
import styles from './Sorting.module.scss'
import type { SortType } from '@/core/helpers/sort'

interface SortingProps {
	onChange?: (sort: SortType) => void
}

export function Sorting({ onChange }: SortingProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const sort = (searchParams.get('sort') || '') as SortType

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newSort = event.target.value as SortType
		const newParams = new URLSearchParams(searchParams)

		if (newSort) {
			newParams.set('sort', newSort)
		} else {
			newParams.delete('sort')
		}

		setSearchParams(newParams)
		onChange?.(newSort)
	}

	return (
		<label className={styles.sorting}>
			Sort by Created:{' '}
			<select
				value={sort}
				onChange={handleChange}
				className={styles.sortingSelect}
			>
				<option value=''>Default</option>
				<option value='createdASC'>Oldest first</option>
				<option value='createdDESC'>Newest first</option>
			</select>
		</label>
	)
}
