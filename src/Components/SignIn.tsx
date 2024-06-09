import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { json, useNavigate } from 'react-router';
import Navbar from './Navbar/Navbar.js';


const SignIn = () => {
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if (userCredentials.user) {
                localStorage.setItem("token", userCredentials.user.accessToken);
                localStorage.setItem("user", JSON.stringify(userCredentials.user));
                navigate('/uploadcv');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <div className="flex justify-center items-center flex-grow">
                <div className="bg-white py-6 px-8 rounded-lg w-full max-w-md" style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                    <div className="flex flex-col space-y-4">
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;


