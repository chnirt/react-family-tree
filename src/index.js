import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ScrollToTop } from './components'
import { AuthProvider, TreeProvider } from './context'
import { MyConsole } from './configs'

MyConsole.run()

ReactDOM.render(
	<RecoilRoot>
		<AuthProvider>
			<TreeProvider>
				<BrowserRouter>
					<ScrollToTop />
					<App />
				</BrowserRouter>
			</TreeProvider>
		</AuthProvider>
	</RecoilRoot>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
