import { internalPaths } from '@/app/router/RoutePaths'
import { Locations } from '@/data'
import { Link, useLocation } from 'react-router-dom'

export function LocationsList() {
	const { pathname } = useLocation()
	const category = pathname.split('/')[1]

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<ul>
				{Locations.map(item => (
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
