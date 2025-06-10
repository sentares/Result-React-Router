import { internalPaths } from '@/app/router'
import { DynamicComponent } from '@/components/common/dynamic'
import { getCategoryFromPath } from '@/core/helpers/category'
import { sortByCreated } from '@/core/helpers/sort'
import { useSortParam } from '@/core/hooks'
import { Locations, type Location } from '@/data'
import { useMemo, type ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sorting = (
	props: Omit<ComponentProps<typeof DynamicComponent>, 'nameComponent'>
) => <DynamicComponent nameComponent='Button' {...props} />

export default function LocationsList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)
	const sort = useSortParam()

	const sortedData = useMemo(() => {
		return sortByCreated(Locations, sort)
	}, [sort])

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<Sorting />

			<ul>
				{sortedData.map((item: Location) => (
					<li key={item.id}>
						<Link to={internalPaths.locations.detail(String(item.id))}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
