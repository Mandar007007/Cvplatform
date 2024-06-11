import { Button, Avatar, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { googleAuthProvider, auth } from '../../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const token = result.user.accessToken;
      const user = result.user;
      console.log(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      window.localStorage.setItem('token', token);
      dispatch({ type: "SET_USER", payload: JSON.stringify(user) });
      setUser(user);
      toast.success("Successfully signed in")
      navigate('/uploadcv');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="bg-[#0e1019]">
        
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CV Platform</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user && (
    <Link
      href="/jobs"
      style={{
        color: "white",
        textDecoration: "none",
        transition: "color 0.3s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = '#cec8c8'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
    >
      Jobs
    </Link>
              )}
              {user && (
                <Button
                  variant="ghost"
                  className="flex items-center justify-center text-white transition-colors duration-300 py-4 px-6"
                  _hover={{ 
                    bg: 'gray.700', 
                    border: '1px solid #00FFFF', // Aqua color for glowing effect
                    boxShadow: '0 0 5px #00FFFF, 0 0 15px #00FFFF, 0 0 20px #00FFFF', // Glowing effect
                    color: '#00FFFF' // Aqua color text glow effect
                  }}
                >
                  <div className="flex flex-col items-center text-white">
                    <p>Upload new CVs</p>
                    <p className="text-xs mt-1">10 Tokens</p>
                  </div>
                </Button>
              )}
              <li>
                {user ? (
                  <Button variant="ghost" onClick={() => navigate('/profile')} onMouseEnter={(e) => {e.currentTarget.style.color="#0e1019"}}>
                    <Avatar name={user.displayName} src={user.photoURL} className="w-10" onMouseEnter={(e) => {e.currentTarget.style.color="#0e1019"}}/>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className= "bg-white"
                    onClick={handleSubmit}
                  >
                    <FaGoogle className="mr-1" /> Google Sign-in
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
    </>
  );
};

export default Navbar;
