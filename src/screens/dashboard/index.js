import React from 'react'
import { useAuth } from '../../context'
import { Tree } from '../../components'

export default function Dashboard() {
	const { logout } = useAuth()

	function handleLogout() {
		logout()
	}

	return (
		<div>
			Dashboard
			<button onClick={handleLogout}>Logout</button>
			<Tree />
			<br />
		</div>
	)
}
