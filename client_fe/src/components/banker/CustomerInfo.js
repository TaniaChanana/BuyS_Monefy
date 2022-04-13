import React,{useState} from 'react'
// import './CustomerInfo.css';

function CustomerInfo() {
    const [customer,setcustomer]=useState(JSON.parse(sessionStorage.account));
    // sessionStorage.clear();
  
    
    console.log(customer)
    return (
        
        <div className='acc'>
           
    { customer.map((item,i)=>(<div key={i}>{item}</div>))}
        </div>
    )
}

export default CustomerInfo
