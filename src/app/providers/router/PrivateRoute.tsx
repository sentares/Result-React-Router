import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { internalPaths } from './RoutePaths'
import { useAuth } from '../context'

export const PrivateRoute = () => {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	if (!isAuthenticated) {
		return (
			<Navigate to={internalPaths.login} replace state={{ from: location }} />
		)
	}

	return <Outlet />
}
