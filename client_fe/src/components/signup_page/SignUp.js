import React, {useState} from 'react';
import {options} from '../../Constants';
import './SignUp.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

function SignUp() {

  let navigate = useNavigate();

  // const [isSignedUp, setIsSignedUp] = useState(false);

  const [user, setUser] = useState({
    fname : "",
    lname : "",
    phn : "",
    email : "",
    username : "",
    password : "",
    cpassword : "",
    userType : "",
    city: "",
    state:"",
    address:"",
    pincode:"",
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
  }
  const submitDetails = async(e) => {
    e.preventDefault();
    if(user.password!==user.cpassword){alert("passwords not matching");}
    let response = await axios.post("http://localhost:3001/api/signup", 
    {
      fname : user.fname , 
      lname : user.lname,
      phoneNumber : user.phn,
      emailAddress : user.email,
      userName : user.username,
      password : user.password,
      cpassword : user.cpassword,
      userType : user.userType,
      city:user.city,
      state:user.state,
      address:user.address,
      pinCode:user.pincode
    },).then((res) => {
        console.log(res.data[0]);
        var loguser = res.data[0].userName;
        var logpass = res.data[0].password;
        console.log(res);
        if(res.status === 200){
          console.log("signup");
          navigate('/login');

        }
     
    }).catch((err) => { 
      console.log('Axios Error:', err);
      // navigate('/signup');
    })
 
  };

    return (
      <>
      <Header />
        <div className="container">
          <form className="row justify-content-center " method="post">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col text-center">
                  <h1 className="heading">Sign Up</h1>
                  <p className="text-h3">Please fill in this form to create an account.</p>
                </div>
              </div>
             <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating ">
                  <input type="text" className="form-control  " id="f-name" name="fname" value={user.fname} onChange={handleInput} placeholder="Enter your first name" required />
                  <label className="mx-3" htmlFor="fname">First Name</label>
                </div>
          
              
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="l-name" name="lname" value={user.lname} onChange={handleInput} placeholder="Enter your last name" required/>
                  <label className="mx-3" htmlFor="lname">Last Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="phn-no" name="phn" value={user.phn} onChange={handleInput} placeholder="+91 XXXXX XXXXX" required />
                  <label className="mx-3" htmlFor="phn">Phone Number</label>
                </div>
            
             
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="email-id" name="email" value={user.email} onChange={handleInput} placeholder="Enter your Email-id" required />
                  <label className="mx-3" htmlFor="email">Email Id</label>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleInput} placeholder="Enter address" required />
                  <label className="mx-3" htmlFor="fname">Address</label>
                </div>
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="uname" name="username" value={user.username} onChange={handleInput} placeholder="Enter your username" required />
                  <label className="mx-3" htmlFor="username">Username</label>
                </div>
              
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="city" name="city" value={user.city} onChange={handleInput} placeholder="Enter city" required />
                  <label className="mx-3" htmlFor="city">City</label>
                </div>
             
              
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="state" name="state" value={user.state} onChange={handleInput} placeholder="Enter state" required />
                  <label className="mx-3" htmlFor="state">State</label>
                </div>
                
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="pincode" name="pincode" value={user.pincode} onChange={handleInput} placeholder="Enter pincode" required />
                  <label className="mx-3" htmlFor="fname">Pincode</label>
                </div>
              </div>
           
         
          
              
             
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" name="password" value={user.password} onChange={handleInput} id="pass" placeholder="password" required />
                  <label className="mx-3" htmlFor="password">Password</label>
                </div>
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" id="cpass"  name="cpassword" value={user.cpassword} onChange={handleInput} placeholder="password" required />
                  <label className="mx-3" htmlFor="cpassword">Confirm Password</label>
                </div>
              </div>
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="userType" value={user.userType} onChange={handleInput} required >
                  <option value="0">select...</option>
                    {options.map((option, index) => (
                    <option key={index} value={option.typeId}>{option.userType}</option>
                  ))}
                </select>
              </div>
              <div className="row justify-content-start mt-1">
                <div className="col  d-flex flex-column justify-content-center align-items-center">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input checkbox" required />
                      I Read and Accept <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <button className="btn btn-primary mt-1" onClick={submitDetails}>Sign Up</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      </>
    );

}

export default SignUp;