import { internalPaths } from '@/app/router/RoutePaths'
import { Characters } from '@/data'
import { Link, useLocation } from 'react-router-dom'

export function CharactersList() {
	const { pathname } = useLocation()
	const category = pathname.split('/')[1]

	return (
		<div>
			<h1 className='category'>{category.toUpperCase()}</h1>

			<ul>
				{Characters.map(item => (
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
