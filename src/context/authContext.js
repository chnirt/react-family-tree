import React, {
	createContext,
	useContext,
	useLayoutEffect,
	useState,
} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [isAuth, setIsAuth] = useState(false)

	useLayoutEffect(() => {
		setIsAuth(!!localStorage.getItem('accessToken'))
	}, [])

	function login(user, token) {
		localStorage.setItem('accessToken', token)
		setIsAuth(true)
		return true
	}

	function logout() {
		localStorage.removeItem('accessToken')
		setIsAuth(false)
		return true
	}

	return (
		<AuthContext.Provider value={{ isAuth, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
