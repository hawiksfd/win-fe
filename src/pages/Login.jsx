import React, {useState, useEffect} from 'react'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../reducers/auth.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
      e.preventDefault();
      await dispatch(login({email, password}))
      navigate('/');
  };
  
  return (
    <div className='center'>
      <div className="Container">
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className="input is-primary"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className="input is-primary"
        />
        <button 
          className="lButton"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login