import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import girlcat from '../assets/girlcat.jpeg';
import NavBar from './navbar';

const Login = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert(result.message);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('email', formData.email); // Save email in localStorage
                handleLogin(result.isAdmin);
                if (result.isAdmin) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="welcome-section">
                    <img src={girlcat} alt="a girl with cat" />
                    <h2>Welcome to NebulaReads</h2>
                    <h5>Your portal to endless books and learning.</h5>
                </div>
                <div className="login-section">
                    <h1>Hello!</h1>
                    <p>Please enter your contact details to Login</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <div className="register">
                        <h4>New here? Don't Worry</h4>
                        <Link to="/register">Register here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
