/* eslint-disable no-unreachable */

import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'

import CityList from './components/CityList'
import City from './components/City'
import CountriesList from './components/CountriesList'
import Form from './components/Form'
import ProtectedRoute from './pages/ProtectedRoute'
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import HomePage from './pages/HomePage'
// import PageNotFound from './pages/PageNotFound'
// import Login from './pages/Login'
// import AppLayout from './pages/AppLayout'

// dist/assets/index-22651cd9.css   30.15 kB │ gzip:   5.07 kB
// dist/assets/index-054761c8.js   524.69 kB │ gzip: 148.69 kB

// Lazy loading
const HomePage = lazy(() => import('./pages/HomePage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path='pricing' element={<Pricing />} />

						<Route path='product' element={<Product />} />

						<Route path='login' element={<Login />} />

						<Route
							path='app'
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to='cities' />} />

							<Route path='cities' element={<CityList />} />

							<Route path='cities/:id' element={<City />} />
							<Route path='countries' element={<CountriesList />} />

							<Route path='form' element={<Form />} />
						</Route>

						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</Suspense>
			</CitiesProvider>
		</AuthProvider>
	)
}

export default App
