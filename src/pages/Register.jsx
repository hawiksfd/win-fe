import React, {useState, useEffect} from 'react'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from './../reducers/auth.js';
import swal from 'sweetalert';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async (e) => {
      e.preventDefault();
      if (!name || !email || !password || !gender){
        swal({
        title: "Form must be filled!",
        // text: "You clicked the button!",
        icon: "warning",
        button: "Ok",
        });
      }else {
        await dispatch(register({name, email, password, gender}))
        await swal({
          title: "Register Success!",
          // text: "You clicked the button!",
          icon: "success",
          button: "OK",
          });
        navigate('/');
      }
  };
  const handleToLogin = async () => {
    navigate('/login');
  };
  
  return (
    <div className='center'>
      <div className="Container">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            className="input is-primary"
        />
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
        <div className="select is-normal is-primary is-fullwidth">
          <select
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <button 
          className="lButton"
          onClick={handleRegister}
        >
          Register
        </button>
        <span>Have an account?</span>
        <button 
          className="lButton"
          onClick={handleToLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Login