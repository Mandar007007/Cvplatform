import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './Components/Navbar/Navbar.tsx'
import { PrimeReactProvider } from 'primereact/api'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './Store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
     <PrimeReactProvider value={{
        appendTo: 'self',
    }}>
      <Provider store={store}>
      <App />
      
      </Provider>
    </PrimeReactProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
