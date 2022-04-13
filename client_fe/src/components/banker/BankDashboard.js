import React, {useState} from 'react';
import { sessionConst } from '../../Constants';
// import './BankDashboard.css';
import BankNav from './BankNav';
import Item from './Item';
import Header from '../header/Header';

function BankDashboard() {
        const data=JSON.parse(window.sessionStorage.getItem(sessionConst.bankAccounts));
    
    const [accounts,setaccounts]=useState(data);
    const username =window.sessionStorage.getItem(sessionConst.userName);
    console.log(username,data);
    const accArray=accounts.filter((acc,i)=>{if(acc.bankname===username){return acc;}},username)
    console.log("accArray: ",accArray);    


    return (
        <>
        <Header/>
        <BankNav accounts={accArray} bankName={username}/>
        <div className='bank_dashboard d-flex justify-content-center'>
        
          {/* <table className='bank_details'> 
          <tr><th>Customer Name</th>
          <th>IFSC Code</th>
          <th>Account Number</th></tr>
           
  {accArray.map((acc,i)=>(<Item key={i} name={acc.customername} accno={acc.accnum} ifsc={acc.ifsc} />))}
  </table>         */}
  <table className="container table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Customer Name</th>
              <th>IFSC Code</th>
              <th>Account Number</th>
              <th>Customer Details</th>
            </tr>
          </thead>
          <tbody>
          {accArray.map((acc,i)=>(<Item key={i} name={acc.customername} accno={acc.accnum} ifsc={acc.ifsc} />))}
          </tbody>
        </table>
     </div>
     </>
    )
}

export default BankDashboard;
