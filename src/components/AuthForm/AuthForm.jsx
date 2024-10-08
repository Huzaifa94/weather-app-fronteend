import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const AuthForm = ({  onSubmit,errorMessage }) => {
  const [authType, setAuthType] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(authType, formData);
      if (authType === 'signup') {
        setAuthType('login'); 
      }
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Login Section */}
        <div
          className={`w-1/2 px-9 py-12 text-white transition-opacity duration-500 ${
            authType === 'login' ? 'opacity-100' : 'opacity-50'
          }`}
          style={{ backgroundColor: '#4C51BF' }}
        >
          <Transition
            show={authType === 'login'}
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <h2 className="text-4xl font-bold text-center mb-6 text-gray-100">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-lg font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-center mb-4">{error}</div>}

                <button
                  type="submit"
                  className={`w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>

                <div className="mt-6 text-center flex gap-3">
                  <p className="text-lg text-white mt-2">Don't have an account?</p>
                  <button
                    type="button"
                    onClick={() => setAuthType('signup')}
                    className="text-lg font-semibold text-indigo-200 hover:underline mt-2"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
        <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
    </div>

        {/* Signup Section */}
        <div
          className={`w-1/2 p-12 transition-opacity duration-500 ${
            authType === 'signup' ? 'opacity-100' : 'opacity-50'
          }`}
          style={{ backgroundColor: '#319795' }}
        >
          <Transition
            show={authType === 'signup'}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <h2 className="text-4xl font-bold text-center mb-6 text-gray-100">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-lg font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-center mb-4">{error}</div>}

                <button
                  type="submit"
                  className={`w-full bg-teal-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-teal-600 transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>

                <div className="mt-6 text-center flex gap-3">
                  <p className="text-lg text-white mt-2">Already have an account?</p>
                  <button
                    type="button"
                    onClick={() => setAuthType('login')}
                    className="text-lg font-semibold text-teal-200 hover:underline mt-2"
                  >
                    Login
                  </button>
                  
                </div>
               
              </form>
            </div>
          </Transition>
        </div>
        
     
      </div>
      
    </div>
  );
};

export default AuthForm;
