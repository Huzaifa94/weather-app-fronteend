// src/App.jsx
// import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AuthPage from './components/authPage/AuthPage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {
  // const [errorMessage, setErrorMessage] = useState('');

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<AuthPage errorMessage={errorMessage} />} /> */}
          {/* <Route path="/login" element={<AuthPage errorMessage={errorMessage} />} /> */}
          <Route 
            path="/" 
             element={<HomePage />} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
