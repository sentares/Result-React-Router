import { ErrorBoundary } from '@/components/common/errorBoundary'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { internalPaths } from './RoutePaths'
import { Layout } from '@/app/layouts'

const Home = lazy(() => import('@/pages/home'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/not-found'))

const CharactersList = lazy(() => import('@/pages/characters/list'))
const CharacterDetail = lazy(() => import('@/pages/characters/detail'))

const LocationsList = lazy(() => import('@/pages/locations/list'))
const LocationDetail = lazy(() => import('@/pages/locations/detail'))

const EpisodesList = lazy(() => import('@/pages/episodes/list'))
const EpisodeDetail = lazy(() => import('@/pages/episodes/detail'))

const withSuspense = (element: React.ReactNode) => (
	<ErrorBoundary>
		<Suspense fallback={<h2>Loading...</h2>}>{element}</Suspense>
	</ErrorBoundary>
)

export const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: withSuspense(<NotFound />),
		children: [
			{ index: true, element: withSuspense(<Home />) },
			{
				element: <PrivateRoute />,
				children: [
					{
						path: internalPaths.characters.list,
						children: [
							{ index: true, element: withSuspense(<CharactersList />) },
							{ path: ':id', element: withSuspense(<CharacterDetail />) },
						],
					},
					{
						path: internalPaths.locations.list,
						children: [
							{ index: true, element: withSuspense(<LocationsList />) },
							{ path: ':id', element: withSuspense(<LocationDetail />) },
						],
					},
					{
						path: internalPaths.episodes.list,
						children: [
							{ index: true, element: withSuspense(<EpisodesList />) },
							{ path: ':id', element: withSuspense(<EpisodeDetail />) },
						],
					},
				],
			},
		],
	},
	{
		path: internalPaths.login,
		element: withSuspense(<Login />),
	},
])
