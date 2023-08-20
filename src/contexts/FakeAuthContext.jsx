/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
	user: null,
	isAuthenticated: false,
}

const FAKE_USER = {
	name: 'Abood',
	email: 'abood@example.com',
	password: 'abood',
	avatar: '../../public/368334742_805761281027213_3998745344524640814_n.jpg',
}

function reducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case 'login':
			return { ...state, user: payload, isAuthenticated: true }

		case 'logout':
			return initialState

		default:
			throw new Error('Unknown action')
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	)

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: 'login', payload: FAKE_USER })
	}

	function logout() {
		dispatch({ type: 'logout' })
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)

	if (context === undefined)
		throw new Error('You using the AuthContext outside the provider!')

	return context
}

export { AuthProvider, useAuth }
