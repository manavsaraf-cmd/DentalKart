import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'


const queryClient =new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
