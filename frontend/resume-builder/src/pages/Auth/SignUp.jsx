import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");

    try {
      console.log("SignUp data:", { fullName, email, password, profilePic });
      // navigate('/dashboard');
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSubmit}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label='Full Name'
            placeholder='riveenmax'
            type='text'
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            placeholder='max@gmail.com'
            type='text'
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            placeholder='Min 8 Characters'
            type='password'
          />
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          SIGNUP
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
