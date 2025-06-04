import { useAuth } from '@/app/context'
import { internalPaths } from '@/app/router/RoutePaths'
import { Button } from '@/components/ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'

export function Navbar() {
	const location = useLocation()
	const navigate = useNavigate()
	const { isAuthenticated, logout } = useAuth()

	const isActive = (path: string) => location.pathname === path

	const handleLogout = () => {
		logout()
		navigate(internalPaths.home)
	}

	const handleLogin = () => {
		navigate(internalPaths.login)
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

					{!isAuthenticated ? (
						<Button
							variant='BACKGROUND'
							className={styles.authButton}
							onClick={handleLogin}
						>
							Login
						</Button>
					) : (
						<Button
							variant='LIGHT'
							className={styles.authButton}
							onClick={handleLogout}
						>
							Logout
						</Button>
					)}
				</div>
			</div>
		</nav>
	)
}
