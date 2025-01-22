import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if authToken exists when the component mounts
    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                // Check if the authToken is available (from cookies or local storage)
                const response = await axios.get('https://shadi-backend.vercel.app/verify-token', {
                    withCredentials: true,
                });

                if (response.data.isAuthenticated) {
                    // If the token is valid, redirect the user
                    navigate(`/${response.data.userId}/users`);
                }
            } catch (error) {
                console.log('User is not authenticated or token is invalid.');
            }
        };

        checkAuthToken();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            alert('Please fill input fields')
        }
        else {
            try {
                // Send a POST request to your Node.js backend
                const response = await axios.post('https://shadi-backend.vercel.app/login', {
                    email,
                    password
                }, { withCredentials: true });

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
        setLoading(false)
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
                    <button disabled={loading} class="submit-btn"
                        onClick={(e) => handleLogin(e)}>{loading ? 'Logging In...' : 'Login'}</button>
                </div>
            </div>
        </>
    )
}
