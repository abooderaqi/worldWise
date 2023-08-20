/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useReducer,
	useCallback,
} from 'react'

const BASE_URL = 'http://localhost:8000/cities'

const CitiesContext = createContext()

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
}

function reducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case 'loading':
			return { ...state, isLoading: true }

		case 'cities/loaded':
			return { ...state, cities: payload, isLoading: false }

		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: payload }

		case 'cities/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, payload],
				currentCity: payload,
			}

		case 'cities/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== payload),
				currentCity: {},
			}

		case 'rejected':
			return { ...state, error: payload, isLoading: false }
		default:
			throw new Error('Unknown action type!')
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(() => {
		const fetchCities = async () => {
			try {
				dispatch({ type: 'loading' })
				const res = await fetch(`${BASE_URL}`)
				const data = await res.json()

				dispatch({ type: 'cities/loaded', payload: data })
			} catch {
				dispatch({
					type: 'loading',
					payload: 'There was an error loading data...',
				})
			}
		}
		fetchCities()
	}, [])

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === currentCity.id) return

			try {
				dispatch({ type: 'loading' })
				const res = await fetch(`${BASE_URL}/${id}`)
				const data = await res.json()

				dispatch({ type: 'city/loaded', payload: data })
			} catch {
				dispatch({
					type: 'loading',
					payload: 'There was an error loading data...',
				})
			}
		},
		[currentCity.id]
	)

	async function createCity(newCity) {
		try {
			dispatch({ type: 'loading' })
			const res = await fetch(`${BASE_URL}`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await res.json()

			dispatch({ type: 'cities/created', payload: data })
		} catch {
			dispatch({
				type: 'loading',
				payload: 'There was an error creating city.',
			})
		}
	}

	async function deleteCity(id) {
		try {
			dispatch({ type: 'loading' })
			const res = await fetch(`${BASE_URL}/${id}`, {
				method: 'DELETE',
			})

			dispatch({ type: 'cities/deleted', payload: id })
		} catch {
			dispatch({
				type: 'loading',
				payload: 'There was an error deleting city.',
			})
		}
	}
	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	)
}

function useCities() {
	const context = useContext(CitiesContext)
	if (context === undefined)
		throw new Error('You using CitiesContext outside the provider')

	return context
}

export { CitiesProvider, useCities }
