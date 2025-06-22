import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './providers/context'
import { Router } from './providers/router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

function App() {
	return (
		<MantineProvider defaultColorScheme='dark'>
			<AuthProvider>
				<RouterProvider router={Router} />
			</AuthProvider>
		</MantineProvider>
	)
}

export default App
