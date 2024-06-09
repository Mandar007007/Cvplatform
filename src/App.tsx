import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom'
import SignIn from './Components/SignIn'
import UploadCV from './Components/UploadCVs'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        {localStorage.getItem('user') != null ? <Route path='/uploadcv' element={<UploadCV />}/> : <Route path='/uploadcv' element={<SignIn />}/>}
      </Routes>
    </Router>
    </>
  )
}

export default App

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        