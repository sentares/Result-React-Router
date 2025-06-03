import { internalPaths } from '@/app/router'
import { Episodes } from '@/data'
import { Link, useLocation } from 'react-router-dom'

export function EpisodesList() {
	const { pathname } = useLocation()
	const category = pathname.split('/')[1]

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<ul>
				{Episodes.map(item => (
					<li key={item.id}>
						<Link to={internalPaths.episodes.detail(String(item.id))}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
