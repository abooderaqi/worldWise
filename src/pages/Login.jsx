import { useEffect, useState } from 'react'
import PageNav from '../components/PageNav'

import styles from './Login.module.css'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const { login, isAuthenticated } = useAuth()
	const [email, setEmail] = useState('abood@example.com')
	const [password, setPassword] = useState('abood')
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		if (email && password) login(email, password)
	}

	useEffect(() => {
		if (isAuthenticated === true) navigate('/app')
	}, [isAuthenticated])

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type='primary'>Login</Button>
				</div>
			</form>
		</main>
	)
}
