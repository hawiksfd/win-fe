import React, {useState, useEffect} from 'react'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../reducers/auth.js";
import swal from 'sweetalert';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
      e.preventDefault();
      await dispatch(login({email, password}))
      await swal({
        title: "Login Success!",
        // text: "You clicked the button!",
        icon: "success",
        button: "OK",
        });
      navigate('/');
  }; 

  const handleSignUp = async () => {
    navigate('/register');
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
        <span>Don't have an account?</span>
        <button 
          className="lButton"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Login