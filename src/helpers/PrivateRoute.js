import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../context'

export function PrivateRoute({ children }) {
	let { isAuth } = useAuth()
	let location = useLocation()

	return isAuth ? (
		children
	) : (
		<Redirect
			to={{
				pathname: '/',
				state: { from: location },
			}}
		/>
	)
}
