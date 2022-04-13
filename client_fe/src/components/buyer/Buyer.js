import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import Header from "../header/Header";
import video from '../../assets/buyer.mp4'
import { sessionConst } from '../../Constants';
function Buyer() {

  const [name, setName] = useState("");
  useEffect(() => {

    let n = window.sessionStorage.getItem(sessionConst.userName);
    setName(n);
    console.log(name)
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
export default Buyer;
