import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill input fields')
        }
        else {
            try {
                // Send a POST request to your Node.js backend
                const response = await axios.post('http://localhost:3001/login', {
                    email,
                    password
                });

                if (response.data.mes == 'Login Successfully') {
                    // Handle successful login (e.g., redirect, store token)
                    console.log('Login Successfully');
                    navigate(`/${response.data.user._id}/users`)
                } else {
                    // Handle unsuccessful login
                    alert('Invalid credentials');
                }
            } catch (error) {
                // Handle error (e.g., network issues)
                console.log('An error occurred. Please try again.');
            }
        }
    };
    return (
        <>
             <div class="modal-overlay">
            
            <div class="login-modal-content">
                <h1 id="iuy">Login Form</h1>
                <label id="la">Email:</label>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label id="la">Password:</label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button class="submit-btn" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
        </div>
        </>
    )
}
