import { Component, type ErrorInfo, type ReactNode } from 'react'

export interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<
	{ children: ReactNode },
	{ hasError: boolean }
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		console.log('####: error', error.message)
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log('####: error', error.message)
		console.log('####: errorInfo', errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h4>Something went wrong 😢</h4>
		}

		return this.props.children
	}
}

export default ErrorBoundary
