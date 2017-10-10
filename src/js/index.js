import 'whatwg-fetch'
import { polyfill as promisePolyfill } from 'es6-promise'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Main from './components/Main'

import '../scss/index.scss'

promisePolyfill()

const element = document.getElementById('content')
ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>,
	element,
)

document.body.classList.remove('loading')
