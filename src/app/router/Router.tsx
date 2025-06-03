import { CharacterDetail } from '@/pages/characters/detail'
import { CharactersList } from '@/pages/characters/list'
import { Home } from '@/pages/home'
import { LocationDetail } from '@/pages/locations/detail'
import { LocationsList } from '@/pages/locations/list'
import { NotFound } from '@/pages/not-found'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { internalPaths } from './RoutePaths'

const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: internalPaths.characters.list,
				children: [
					{
						index: true,
						element: <CharactersList />,
					},
					{
						path: ':id',
						element: <CharacterDetail />,
					},
				],
			},

			{
				path: internalPaths.locations.list,
				children: [
					{
						index: true,
						element: <LocationsList />,
					},
					{
						path: ':id',
						element: <LocationDetail />,
					},
				],
			},
		],
	},
])

export default Router
