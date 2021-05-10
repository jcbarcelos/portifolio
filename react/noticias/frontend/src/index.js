import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import {applyMiddleware,createStore} from 'redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import { Provider} from 'react-redux'
import redurces from './main/reducers'
const store = applyMiddleware(multi, thunk, promise)(createStore)(redurces)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals();
