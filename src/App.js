import React, { Suspense } from 'react'
import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import './App.less'
import { Loading } from './components'
import { PrivateRoute, PublicRoute, Loadable } from './helpers'
import Notfound from './screens/notfound'
import { loadingState } from './atoms'
import { FadeIn } from './animations'
import { MyLayout } from './layout'

function App() {
	const isLoading = useRecoilValue(loadingState)
	return (
		<Fragment>
			<Suspense fallback={<Loading />}>
				<Loading spinning={isLoading}>
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
								<FadeIn>
									<Loadable route='register' />
								</FadeIn>
							</PublicRoute>
						</Route>
						<Route path='/dashboard'>
							<PrivateRoute>
								<MyLayout>
									<FadeIn>
										<Loadable route='dashboard' />
									</FadeIn>
								</MyLayout>
							</PrivateRoute>
						</Route>
						<Route path='/table'>
							<PrivateRoute>
								<MyLayout>
									<FadeIn>
										<Loadable route='table' />
									</FadeIn>
								</MyLayout>
							</PrivateRoute>
						</Route>
						<Route path='*'>
							<FadeIn>
								<Notfound />
							</FadeIn>
						</Route>
					</Switch>
				</Loading>
			</Suspense>
		</Fragment>
	)
}

export default App
