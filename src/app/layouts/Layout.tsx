import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'
import { DynamicComponent } from '@/components/common/dynamic'
import type { ComponentProps } from 'react'

const Navbar = (
	props: Omit<ComponentProps<typeof DynamicComponent>, 'nameComponent'>
) => <DynamicComponent nameComponent='Navbar' {...props} />

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
