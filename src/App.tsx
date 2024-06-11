import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import UploadCVs from './Components/UploadCVs';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated)
  const dispatch = useDispatch();

  const loadUser = async () => {
    try{
      const user = localStorage.getItem('user');
      if(user)
        {
          dispatch({type:"SET_USER",payload:user});
        }

    }catch(err)
    {
      console.log(err)
    }
  }
  useEffect(() => {
    
    loadUser();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {isLoggedIn ? <Route path='/uploadcv' element={<UploadCVs />} /> : <Route path='/uploadcv' element={<Home />} />}
      </Routes>
      
    </Router>
  );
}

export default App;
