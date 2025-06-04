import { internalPaths } from '@/app/router'
import { Sorting } from '@/components/common/sorting'
import { getCategoryFromPath } from '@/core/helpers/category'
import { sortByCreated } from '@/core/helpers/sort'
import { useSortParam } from '@/core/hooks'
import { Characters, type Character } from '@/data'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function CharactersList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)
	const sort = useSortParam()

	const sortedData = useMemo(() => {
		return sortByCreated(Characters, sort)
	}, [sort])

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<Sorting />

			<ul>
				{sortedData.map((item: Character) => (
					<li key={item.id}>
						<Link to={internalPaths.characters.detail(String(item.id))}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
