import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './Components/Navbar/Navbar.tsx'
import { PrimeReactProvider } from 'primereact/api'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <PrimeReactProvider value={{
        appendTo: 'self',
    }}>
    <Navbar />
    <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
