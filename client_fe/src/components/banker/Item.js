import React from 'react'
// import './Item.css';
import {Link} from 'react-router-dom';
function Item({name,accno,ifsc}) {
    
    const sendAccountDetails= ()=>{
        let itemArr=[name,accno,ifsc]
        console.log("sending acc details");
        window.sessionStorage.setItem("account",JSON.stringify(itemArr));
    }
    return (
        <tr  className='item'>
            <td>{name.toUpperCase()}</td>  <td>{ifsc}</td> <td>{accno}</td><td><Link to='/customerInfo' onClick={sendAccountDetails} style={{ textDecoration: 'none',fontWeight:'bolder',color:'black' }}>Link</Link></td>
{/*            
           <div>{name.toUpperCase()}</div>
          
           <div>{ifsc.toUpperCase()}</div>
           <div>{accno}</div>
           <div><Link to='/customerInfo' onClick={sendAccountDetails} style={{ textDecoration: 'none',fontWeight:'bolder',color:'black' }}>Customer Details</Link></div> */}
          
         
        </tr>
    )
}

export default Item;
