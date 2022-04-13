import React, { useState, useEffect } from "react";
import Header from '../header/Header'
import video from '../../assets/admin.mp4'
import { sessionConst } from '../../Constants';
function Admin() {

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

export default Admin