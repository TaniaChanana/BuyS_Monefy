import React, {useState}from 'react'
import Item from './Item';
import './BankNav.css';

function BankNav({accounts,bankName}) {
 const [state,setState]=useState('');
 let name, value;
 const handleInput = (e) => {
   console.log(e);
   
  value = e.target.value.toLowerCase();
  setState(value);
 
   console.log(state);
 }
//  const filterAccounts=(e)=>{
//    e.preventDefault();



//    let filteredAccounts=accounts.filter((item,i)=>{if(item.customername.toLowerCase()===state){return item;}},state)
//    console.log(filteredAccounts);
//    filteredAccounts.map((items,i)=>(<Item key={i} name={items.customername} bankname={items.bankname} ifsc={items.ifsc} accno={items.accnum}/>))
// }



   return (
        <div>
            {/* <nav class="navbar navbar-dark bg-dark">
 
</nav> */}

  <h2 className='text-center'>Bank Name: <u>{bankName.toUpperCase()}</u></h2>


        </div>
    )
}

export default BankNav
