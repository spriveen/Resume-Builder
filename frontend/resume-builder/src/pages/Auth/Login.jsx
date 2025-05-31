import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError("");
    // Login api call
    try{

    }catch(error){

    }

      
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your credentials to login.
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='Email Address'
          placeholder='riveen@gmail.com'
          type='text'
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          placeholder='Min 8 Charactors'
          type='password'
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          LOGIN
        </button>
      </form>

      <p className='text-[13px] text-slate-800 mt-3'>
        Don't have an account?
        <button
          className='font-medium text-primary underline cursor-pointer ml-1'
          onClick={() => setCurrentPage('signup')}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
