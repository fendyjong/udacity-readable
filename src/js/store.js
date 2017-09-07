import { createStore, compose, applyMiddleware } from 'redux'
import root from './reducers/root'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default compose(composeEnhancers(applyMiddleware(logger, thunk)))(createStore)(root)
