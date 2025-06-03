import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { internalPaths } from './RoutePaths'

const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: <NotFound />,
		children: [{ index: true, element: <Home /> }],
	},
])

export default Router
