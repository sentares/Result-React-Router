import { internalPaths } from '@/app/router'
import { DynamicComponent } from '@/components/common/dynamic'
import { getCategoryFromPath } from '@/core/helpers/category'
import { sortByCreated } from '@/core/helpers/sort'
import { useSortParam } from '@/core/hooks'
import { Episodes, type Episode } from '@/data'
import { useMemo, type ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sorting = (
	props: Omit<ComponentProps<typeof DynamicComponent>, 'nameComponent'>
) => <DynamicComponent nameComponent='Sorting' {...props} />

export default function EpisodesList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)
	const sort = useSortParam()

	const sortedData = useMemo(() => {
		return sortByCreated(Episodes, sort)
	}, [sort])

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<Sorting />

			<ul>
				{sortedData.map((episode: Episode) => (
					<li key={episode.id}>
						<Link to={internalPaths.episodes.detail(String(episode.id))}>
							{episode.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
