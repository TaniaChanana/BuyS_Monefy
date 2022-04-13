import React, { useEffect, useState } from 'react';
import SupplierHomeNavbar from '../SupplierHome/SupplierHomeNavbar';
import { sessionConst } from '../../Constants';
import './UserProfile.css';
import Header from '../header/Header';
import axios from 'axios';
import video from '../../assets/supplier.mp4';

const UserProfile = () => {

  const [name, setName] = useState("");
  const [loggedUser, setLoggedUser] = useState({
    fname: "",
    lname: "",
    phn: "",
    email: "",
    userType: ""
  })
  useEffect(() => {

    let n = window.sessionStorage.getItem(sessionConst.userName);
    setName(n);
    console.log(name)
    // console.log(loggedUser)
    // axios.post("http://localhost:3001/api/loggedUserDetails", {
    //   username : name
    // }).then(response => {
    //   console.log(response);
    //   setLoggedUser({...loggedUser, ...response.data[0]})
    //   console.log(loggedUser);
    // }).catch(err => {
    //     console.log(err);
    //   })
  }, []);

  return (

    <div>
      <Header/>
       <div className='d-flex align-items-center justify-content-between '>
        <div className='headings'>
          <h1 className='first-heading'>Welcome</h1>
          <h3 className='second-heading'> {name} </h3>
        </div>
        <div>
          <video src={video} loop muted autoPlay controls = '' className='video-setting'></video>
        </div>
       </div>
    </div> 
  );
}

export default UserProfile;



/* <div className="u-container d-flex flex-column">
        <div className="wlcm-container">
          <h1>Welcome Back!!</h1>
          <h3>
            {loggedUser.fname} {loggedUser.lname}
          </h3>
        </div>
        <div className="user-details">
          <div className="d-flex">
            <h1 className="u-label">First Name : </h1>
            <h1 className="u-value">{loggedUser.fname}</h1>
          </div>
          <div className="d-flex">
            <h1 className="u-label">Last Name : </h1>
            <h1 className="u-value">{loggedUser.lname}</h1>
          </div>
          <div className="d-flex">
            <h1 className="u-label">Phone no : </h1>
            <h1 className="u-value">{loggedUser.phn}</h1>
          </div>
          <div className="d-flex">
            <h1 className="u-label">Email : </h1>
            <h1 className="u-value">{loggedUser.email}</h1>
          </div>
          <div className="d-flex">
            <h1 className="u-label">User Type : </h1>
            <h1 className="u-value">{loggedUser.userType == 3 ? 'Supplier' : ''}</h1>
          </div>
        </div>
      </div> */