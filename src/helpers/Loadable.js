import React, { lazy } from 'react'

export const Loadable = ({ route = 'login', ...rest }) => {
	const MyComponent = lazy(() => {
		const myModule = import(`../screens/${route}`)
		return myModule
	})

	return <MyComponent {...rest} />
}
