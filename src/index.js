import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ScrollToTop } from './components'
import { AuthProvider } from './context'
import { MyConsole } from './configs'

MyConsole.run()

ReactDOM.render(
	<RecoilRoot>
		<AuthProvider>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</AuthProvider>
	</RecoilRoot>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
