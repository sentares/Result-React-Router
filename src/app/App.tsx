import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import { AuthProvider } from './context'

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={Router} />
		</AuthProvider>
	)
}

export default App
