import React, { useState } from 'react';
import styles from './Header.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {sessionConst } from '../../Constants';
import { Link as Lik, animateScroll as scroll } from "react-scroll";
function Header() {
  
  const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

  const [usertype, setUsertype]=useState(sessionStorage.getItem(sessionConst.userType));
  console.log(usertype);
  const navigate = useNavigate();
  const logoutHandle = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem(sessionConst.userType, null);
    setUsertype(null);
    navigate('/');
    console.log(usertype);
  }
    return (
        <>
        

<nav class={`navbar navbar-expand-lg navbar-light mb-2 bg-white ${styles["navbar1"]}`}>
<div className={`d-flex align-items-center justify-content-center ${styles["header-nav-container"]}`}>

  <Link  to="/" class="navbar-brand">
    <img src={logo} class="navbar-brand-img" id={styles["logo-img"]} alt="logo" />
  </Link>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fe fe-x"></i>
    </button>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        {usertype==='2'?<Link to="/Buyer" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "Buyer" ? styles["active"] : ""}`} id="navbarLandings" >
          Home
        </Link>:( usertype === '3' ? (<Link to="/UserProfile" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "UserProfile" ? styles["active"] : ""}`} id="navbarLandings" >
          Home
        </Link>) : (usertype==='4'?(<Link to="/Bankhome" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "Bankhome" ? styles["active"] : ""}`} id="navbarLandings" >
          Home
        </Link>):(usertype==='1'?(<Link to="/Admin" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "Admin" ? styles["active"] : ""}`} id="navbarLandings" >
          Home
        </Link>):(<Lik to="home" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "" ? styles["active"] : ""}`} id="navbarLandings" >
          Home
        </Lik>))))}
      </li>
      <li class="nav-item">
        {usertype==='2'?<Link to="/PurchaseItem" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "PurchaseItem" ? styles["active"] : ""}`} id="navbarPages" >
         Buy Item
        </Link>:( usertype === '3' ? (<Link to="/ItemDetails" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ItemDetails" ? styles["active"] : ""}`} id="navbarLandings" >
         Add Item Details
        </Link>) :(usertype==='4'?(<Link to="/BankDashboard" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "BankDashboard" ? styles["active"] : ""}`} id="navbarLandings" >
          Bank Dashboard
        </Link>):(usertype==='1'?(<Link to="/allBuyers" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "allBuyers" ? styles["active"] : ""}`} id="navbarLandings" >
          View All Buyers
        </Link>): (<Lik to="about" class={`nav-link ${styles["nav-link"]}`}>
          About
        </Lik>))))}
      </li>
      <li class="nav-item">
        {usertype==='2'?<Link to="/createaccount" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "createaccount" ? styles["active"] : ""}`} id="navbarAccount">
          Create Bank Account
        </Link>:( usertype === '3' ? (<Link to="/createaccount" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "createaccount" ? styles["active"] : ""}`} id="navbarAccount">
          Create Bank Account
        </Link>):(usertype==='1'?(<Link to="/allSuppliers" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "allSuppliers" ? styles["active"] : ""}`} id="navbarLandings" >
          View All Suppliers
        </Link>):(usertype==='4'?(<></>): (<Lik to="services" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "services" ? styles["active"] : ""}`} id="navbarLandings" >
         Services
        </Lik>))))}
      </li>

      <li class="nav-item">
       { usertype==='2'?<Link to="/ViewTransactions" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ViewTransactions" ? styles["active"] : ""}`} id="navbarDocumentation" >
          View Transactions
        </Link>:(usertype==='1'?(<Link to="/purchasedItemDetails" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "purchasedItemDetails" ? styles["active"] : ""}`} id="navbarLandings" >
          Purchased Items
        </Link>):( usertype === '3' ? (<Link to="/supplierItemsPurchased" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "supplierItemsPurchased" ? styles["active"] : ""}`} id="navbarAccount">
          Purchased Items
        </Link>):(usertype==4?(<></>):(<Lik to="contact" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "contact" ? styles["active"] : ""}`} id="navbarAccount">
          Contact
        </Lik>))))}
        
      </li>
      <li class="nav-item">
       { usertype==='1'?<Link to="/viewAllTransactions" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "viewAllTransactions" ? styles["active"] : ""}`} id="navbarDocumentation" >
          View Transactions
        </Link>:(usertype==='2'?(<Link to="/itemsPurchasedDetails" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "itemsPurchasedDetails" ? styles["active"] : ""}`} id="navbarDocumentation" >
          Purchased Items
        </Link>):(<></>))}

      </li>

      <li class="nav-item">
       { usertype==='2'?<Link to="/ViewLoanDetails" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ViewLoanDetails" ? styles["active"] : ""}`} id="navbarDocumentation" >
          Loan Details
        </Link>:(usertype==='3'?(<Link to="/ViewItemList" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ViewItemList" ? styles["active"] : ""}`} id="navbarDocumentation" >
          Your Items
        </Link>):(<></>))}

      </li>

      <li class="nav-item">
       { usertype==='2'?<Link to="/ViewBankDetailsBuyer" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ViewBankDetailsBuyer" ? styles["active"] : ""}`} id="navbarDocumentation" >
         Bank Details
        </Link>:(usertype==='3'?(<Link to="/ViewBankDetailsSupplier" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "ViewBankDetailsSupplier" ? styles["active"] : ""}`} id="navbarDocumentation" >
         Bank Details
        </Link>):(<></>))}
        
      </li>

      <li class="nav-item">
       { usertype==='1'?<Link to="/addBank" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "addBank" ? styles["active"] : ""}`} id="navbarDocumentation" >
          Add Bank
        </Link>:(usertype==='3'?(<Link to="/SupplierViewTransactions" class={`nav-link ${styles["nav-link"]} ${splitLocation[1] === "SupplierViewTransactions" ? styles["active"] : ""}`} id="navbarDocumentation" >
          View Transactions
        </Link>):(<></>))}
        
      </li>


    </ul>

   {/* {(usertype==='2' || usertype === '3' || usertype === '4' || usertype === '1') ? (<div className={styles['header-butns']}>
    <button class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" onClick={logoutHandle} >
      Logout
    </button>
    </div> ) : ( <div className={styles['header-butns']}>
    <Link to="/Login" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2"  >
      Login
    </Link>
    <Link to="/signup" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" >
      Sign Up
    </Link>
    </div>) 
    } */}

    {(usertype==='2' || usertype === '3' || usertype === '4' || usertype === '1') ? (<>
   <h3 className='ms-auto text-black-50'>{window.sessionStorage.getItem(sessionConst.userName)}</h3><div className={styles['header-butns']}>
    <button class="navbar-btn btn btn-sm btn-primary lift ms-auto mr-2" onClick={logoutHandle} >
      Logout
    </button>
    </div></> ) : ( <div className={styles['header-butns']}>
    <Link to="/Login" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2"  >
      Login
    </Link>
    <Link to="/signup" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" >
      Sign Up
    </Link>
    </div>) 
    }

  </div>

</div>
</nav>
</>
    )
}

export default Header
