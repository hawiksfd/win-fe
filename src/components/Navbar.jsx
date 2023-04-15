import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../reducers/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!uid){
      navigate("/login");
    }
  }, [uid, navigate])
  
  const handleLogout = async () => {
    await dispatch(logout());
  }; 
  
  const handleProfil = async () => {
    await dispatch(getUser(uid));
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <h1>HOME</h1>
        </Link>

        <div className="rightIcon">
          <div className="mx-3">      
            <Link to={`/profile/${uid}`}>
              <button onClick={handleProfil} className="button mx-3 ok">PROFIL</button>
            </Link>
            <button onClick={handleLogout} className="button">LOGOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;