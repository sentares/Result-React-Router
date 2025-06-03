import { Link } from 'react-router-dom'
import styles from './Home.module.scss'
import { internalPaths } from '@/app/router/RoutePaths'

export function Home() {
	return (
		<div className={styles.home}>
			<h1>Welcome to the Rick and Morty Universe!</h1>
			<p>Select a category from the navigation</p>

			<div className={styles.links}>
				<Link to={internalPaths.characters.list}>Characters</Link>
				<Link to={internalPaths.locations.list}>Locations</Link>
				<Link to={internalPaths.episodes.list}>Episodes</Link>
			</div>
		</div>
	)
}
