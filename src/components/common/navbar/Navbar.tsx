import { internalPaths } from '@/app/router/RoutePaths'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'

export function Navbar() {
	const location = useLocation()

	const isActive = (path: string) => {
		return location.pathname === path
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<Link to={internalPaths.home} className={styles.brand}>
					Rick & Morty Universe
				</Link>
				<div className={styles.links}>
					<Link
						to={internalPaths.characters.list}
						className={
							isActive(internalPaths.characters.list) ? styles.active : ''
						}
					>
						Characters
					</Link>
					<Link
						to={internalPaths.locations.list}
						className={
							isActive(internalPaths.locations.list) ? styles.active : ''
						}
					>
						Locations
					</Link>
					<Link
						to={internalPaths.episodes.list}
						className={
							isActive(internalPaths.episodes.list) ? styles.active : ''
						}
					>
						Episodes
					</Link>
				</div>
			</div>
		</nav>
	)
}
