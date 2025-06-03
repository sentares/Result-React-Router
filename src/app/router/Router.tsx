import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { internalPaths } from './RoutePaths'
import { CharactersList } from '@/pages/characters/list'
import { CharacterDetail } from '@/pages/characters/detail'

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
		],
	},
])

export default Router
