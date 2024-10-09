// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AuthForm from '../AuthForm/AuthForm.jsx';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AuthPage = () => {
//   const [authState, setAuthState] = useState('loggedOut');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
      
//       axios.get('http://localhost:3000/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
//         .then(() => {
//           setAuthState('loggedIn');
//           navigate('/home');
//         })
//         .catch(() => {
//           setAuthState('loggedOut');
//           localStorage.removeItem('token'); 
//         });
//     } else {
//       setAuthState('loggedOut');
//     }
//   }, [navigate]);

//   const handleAuthAction = async (action, credentials) => {
//     try {
//       if (action === 'login') {
//         const response = await axios.post('http://localhost:3000/auth/login', credentials);
//         const { token } = response.data; 
//         localStorage.setItem('token', token); 

//         setAuthState('loggedIn');
//         toast.success('Login successful!');
//         navigate('/home'); 
//       } else if (action === 'signup') {
//         await axios.post('http://localhost:3000/auth/register', credentials);
//         toast.success('Registration successful! Please login.');
//         setAuthState('loggedOut'); 
//       } 
//     } catch (error) {
//       toast.error('Authentication failed. Please try again.'); 
//     }
//   };

//   return (
//     <div className="App">
//       <ToastContainer />
//       <AuthForm onSubmit={handleAuthAction} />
//     </div>
//   );
// };

// export default AuthPage;
