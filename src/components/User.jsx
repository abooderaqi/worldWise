/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import styles from './User.module.css'

const FAKE_USER = {
	name: 'Abood',
	email: 'abood@example.com',
	password: 'abood',
	avatar: '../../public/368334742_805761281027213_3998745344524640814_n.jpg',
}

function User() {
	const { user } = useAuth()
	const { logout } = useAuth()
	const naviagte = useNavigate()

	console.log(user)

	function handleClick() {
		logout()
		naviagte('/')
	}

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	)
}

export default User

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
