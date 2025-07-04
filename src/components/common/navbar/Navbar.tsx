import { useAuth } from '@/app/providers/context'
import { internalPaths } from '@/app/providers/router'
import { Button } from '@mantine/core'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'

// const Button = getDynamicComponent('Button')

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
						<Button className={styles.authButton} onClick={handleLogin}>
							Login
						</Button>
					) : (
						<Button className={styles.authButton} onClick={handleLogout}>
							Logout
						</Button>
					)}
				</div>
			</div>
		</nav>
	)
}
