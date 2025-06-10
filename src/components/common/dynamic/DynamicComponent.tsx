import type { ButtonProps } from '@/components/ui/button'
import type { InputProps } from '@/components/ui/input'
import {
	lazy,
	Suspense,
	type ComponentType,
	type LazyExoticComponent,
	type ReactNode,
} from 'react'

interface ComponentsMap {
	Input: LazyExoticComponent<ComponentType<InputProps>>
	Button: LazyExoticComponent<ComponentType<ButtonProps>>
	Navbar: LazyExoticComponent<ComponentType>
	Sorting: LazyExoticComponent<ComponentType>
}

const components: ComponentsMap = {
	Input: lazy(() =>
		import('@/components/ui/input').then(module => ({ default: module.Input }))
	),
	Button: lazy(() =>
		import('@/components/ui/button').then(module => ({
			default: module.Button,
		}))
	),
	Navbar: lazy(() =>
		import('@/components/common/navbar').then(module => ({
			default: module.Navbar,
		}))
	),
	Sorting: lazy(() =>
		import('@/components/common/sorting').then(module => ({
			default: module.Sorting,
		}))
	),
}

export function DynamicComponent(props: {
	nameComponent: keyof ComponentsMap
	[key: string]: ReactNode | unknown
}) {
	const { nameComponent, ...rest } = props
	const Component = components[nameComponent]

	if (!Component) {
		return null
	}

	return (
		<Suspense fallback='Loading...'>
			<Component {...rest} />
		</Suspense>
	)
}
