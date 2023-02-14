import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from "./reducers/root_reducer";
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
const preloadedState = window.__PRELOADED_STATE__

const clientStore = configureStore({
  reducer: rootReducer,
  preloadedState,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={clientStore}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
