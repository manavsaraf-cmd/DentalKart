import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AuthProvider from "./context/AuthContext.jsx";
import store from './store/store.js'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import 
CartWishlistSync from './component/common/CartWishlistSync.jsx'


const queryClient =new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <BrowserRouter>
    <CartWishlistSync />
    <App />
    
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
