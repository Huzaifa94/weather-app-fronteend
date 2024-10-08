
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = ({ errorMessage }) => {
  const [authState, setAuthState] = useState('loggedOut');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthState('loggedIn');
    } else {
      setAuthState('loggedOut');
    }
  }, []);

  const handleAuthAction = async (action, credentials) => {
     {
      if (action === 'login') {
        const response = await axios.post('http://localhost:3000/auth/login', credentials);
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        setAuthState('loggedIn');
        toast.success('Login successful!');
        navigate('/home'); 
      } else if (action === 'signup') {
        await axios.post('http://localhost:3000/auth/register', credentials);
        toast.success('Registration successful! Please login.');
        setAuthState('loggedOut'); 
        
      } 
    } 
     
      
    
  };

  return (
    <div className="App">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ToastContainer />
      <AuthForm onSubmit={handleAuthAction} />
    </div>
  );
};

export default AuthPage;
