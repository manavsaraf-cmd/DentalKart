import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from './component/layout/Header.jsx'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
function App() {
  return (
    <>
    
      <Header/>
     

       <AppRoutes></AppRoutes>
      

   
    
    </>
  )
}

export default App
