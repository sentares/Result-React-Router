import { useLocalStorage } from '@/core/hooks'
import { createContext, useContext, type ReactNode } from 'react'

interface AuthContextType {
	isAuthenticated: boolean
	login: (token: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, { setItem, removeItem }] = useLocalStorage('auth_token')
	const isAuthenticated = !!token

	const login = (token: string) => {
		setItem(token)
	}

	const logout = () => {
		removeItem()
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within AuthProvider')
	return context
}
