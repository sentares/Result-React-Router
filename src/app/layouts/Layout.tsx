import { Navbar } from '@/copmonents/common'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

export function Layout() {
	return (
		<div className='app'>
			<Navbar />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
