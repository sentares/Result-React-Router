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
	Input: {
		component: LazyExoticComponent<ComponentType<InputProps>>
		props: InputProps
	}
	Button: {
		component: LazyExoticComponent<ComponentType<ButtonProps>>
		props: ButtonProps
	}
	Navbar: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
	Sorting: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
}

const components: {
	[K in keyof ComponentsMap]: ComponentsMap[K]['component']
} = {
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

export function getDynamicComponent<K extends keyof ComponentsMap>(
	nameComponent: K
) {
	return (props: ComponentsMap[K]['props']) => (
		<DynamicComponent nameComponent={nameComponent} {...props} />
	)
}
