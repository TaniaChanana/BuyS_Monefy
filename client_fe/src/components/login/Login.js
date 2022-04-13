// import './Login.css';
import React, { useState, useEffect } from "react";
import { options, sessionConst } from '../../Constants'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import axios from 'axios';
import { Link } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    userType: ""
  });
  let name, value;
  const handleInput = (e) => {

    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setLogin({ ...login, [name]: value });
  }

  const loginValidate = async (e) => {
    // console.log(login.userName);
    e.preventDefault();
    // const res = await axios.get("http://localhost:3001/api/createAccount")   
    // console.log(res);   
    // window.sessionStorage.setItem(sessionConst.bankAccounts, JSON.stringify(res.data));
    // let response = await axios.get("http://localhost:3001/api/loginValidate", )
    const response = await axios.post("http://localhost:3001/api/loginValidate",
      {
        
          userName: login.userName,
          password: login.password,
          userType: login.userType,
        
      })
      .then((res) => {
        window.sessionStorage.setItem(sessionConst.userName, login.userName);
        window.sessionStorage.setItem(sessionConst.userType, login.userType);
        console.log("LOGIN SUCCESSFUL-->>>>>");
        if(res.status === 200){
          if(login.userType === "1"){
            navigate("/Admin")
          }
          if (login.userType === "2") {
            navigate("/Buyer")
          }
          if(login.userType === "4"){
            console.log(response);
            navigate("/BankDashBoard");
          }
          if(login.userType === "3"){
            navigate('/UserProfile')
          }

        }else{
          console.log("login not successful");
        }
        
      })
      
  };

  return (
    <>
      <Header />
      {/* <div className="login">
        <h1>Login</h1>
        <form method="get">
          <div className="txt_field">
            <input type="text" name="userName" value={login.userName} required onChange={handleInput}></input>
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input type="password" name="password" value={login.password} required onChange={handleInput}></input>
            <label>Password</label>
          </div>

          <div className="pass">Forgot Password?</div>
          <label>Select User Type :  </label>
          <select className="txt_field" id="ddlUserType" value={login.userType} name="userType" onChange={handleInput}>

            <option value="0">Please select</option>
            {
              options.map((option, index) => (<option key={index} value={option.typeId}>{option.userType}</option>))
            }
          </select>
          <input type="submit" value="Login" onClick={(e) => { loginValidate(e) }}></input>
          <div className="signup_link">Not a member? <a href="#">SignUp</a></div>
        </form>
      </div> */}
       <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-5">
                <div className="col text-center">
                  <h1 className="heading">Login</h1>
                 
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="text" className="form-control" name="userName" value={login.userName} required onChange={handleInput} placeholder="Enter Username"  />
                  <label className="mx-3">Username</label>
                </div>
              </div>
           
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" name="password" value={login.password} required onChange={handleInput} placeholder="Enter Password"/>
                  <label className="mx-3" htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select " id="ddlUserType" name="userType" value={login.userType} onChange={handleInput} required >
                  <option value="0">select...</option>
                    {options.map((option, index) => (
                    <option key={index} value={option.typeId}>{option.userType}</option>
                  ))}
                </select>
              </div>
              <div className="row justify-content-start mt-3">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <p className="text-center">Not a member yet? <span><Link to="/signup">Sign Up</Link></span></p>
                  <button className="btn btn-primary mt-3 " value="Login" onClick={(e) => { loginValidate(e) }}>Login</button>
                </div>
              </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
