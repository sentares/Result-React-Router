import { getDynamicComponent } from '@/components/common/dynamic'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

const Navbar = getDynamicComponent('Navbar')

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
