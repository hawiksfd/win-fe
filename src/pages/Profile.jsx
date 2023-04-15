import React from 'react'
import Navbar from './../components/Navbar';
import { useSelector } from 'react-redux';

const Profile = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar/>
      
      <div className="columns mt-5 is-centered">
          <div className="column is-half">
              <fieldset disabled>
                  <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                          <input 
                              type="text" 
                              className='input' 
                              placeholder='Name' 
                              value={user.name}
                          />
                      </div>
                  </div>
                  <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                          <input 
                              type="text" 
                              className='input'
                              value={user.email}
                          />
                      </div>
                  </div>
                  <div className="field">
                      <label className="label">Gender</label>
                      <div className="control">
                          <input 
                              type="text" 
                              className='input'
                              value={user.gender}
                          />
                      </div>
                  </div>
              </fieldset>
          </div>
      </div>
    </div>
  )
}

export default Profile
