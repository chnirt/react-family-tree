import React, { Suspense } from 'react'
import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { FadeIn } from './animations'

import './App.css'
import { Loading } from './components'
import { PrivateRoute, PublicRoute, Loadable } from './helpers'
import Notfound from './screens/notfound'

function App() {
	return (
		<Fragment>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route path='/' exact>
						<PublicRoute>
							<FadeIn>
								<Loadable route='login' />
							</FadeIn>
						</PublicRoute>
					</Route>
					<Route path='/register'>
						<PublicRoute>
							<Loadable route='register' />
						</PublicRoute>
					</Route>
					<Route path='/dashboard'>
						<PrivateRoute>
							<FadeIn>
								<Loadable route='dashboard' />
							</FadeIn>
						</PrivateRoute>
					</Route>
					<Route path='*'>
						<FadeIn>
							<Notfound />
						</FadeIn>
					</Route>
				</Switch>
			</Suspense>
		</Fragment>
	)
}

export default App
