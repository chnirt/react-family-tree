import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import logo from '../../assets/images/logo.png'

export default function Login() {
	const { login } = useAuth()
	const [username, setUsername] = useState('chnirt')
	const [password, setPassword] = useState('123456')

	function handleLogin() {
		login({ username, password }, username + password)
	}

	return (
		<div>
			Login
			<br />
			<img style={{ width: 100, height: 100 }} src={logo} alt='Logo' />
			<br />
			Family tree
			<br />
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<br />
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<br />
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}
