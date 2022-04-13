import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup_page/SignUp';
import Buyer from './components/buyer/Buyer';
import Supplier from './components/supplier_data/Supplier';
import PurchaseItem from './components/purchaseItem/PurchaseItem';
import UserProfile from './components/supplierProfile/UserProfile';
import RegisterBank from './components/banker/RegisterBank';
import BankDashboard from './components/banker/BankDashboard';
import CustomerInfo from './components/banker/CustomerInfo';
import CreateAccount from './components/banker/CreateAccount';
import ViewTransactions from './components/buyer/ViewTransactions';
import Admin from './components/admin/Admin';
import AllBuyers from './components/admin/AllBuyers';
import AllSuppliers from './components/admin/AllSuppliers';
import PurchasedItemsDetails from './components/admin/PurchasedItemsDetails';
import ItemsPurchased from './components/buyer/ItemsPurchased';
import ItemsPurch from './components/supplier_data/ItemsPurch';
import Payment from './components/banker/Payment';
import BankLoan from './components/banker/BankLoan';
import SupplierViewTransactions from './components/supplier_data/SupplierViewTransactions';
import ViewAllTransactions from './components/admin/ViewAllTransactions';
import ViewBankDetailsSupplier from './components/supplier_data/ViewBankDetailsSupplier';
import ViewBankDetailsBuyer from './components/buyer/ViewBankDetailsBuyer';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/" element={<Header/>}/> */}
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/buyer" element={<Buyer />} />
          <Route exact path="/purchaseItem" element={<PurchaseItem />} />
          <Route exact path="/ItemDetails" element={<Supplier />} />
          <Route exact path="/UserProfile" element={<UserProfile />} />
          <Route exact path="/createaccount" element={<CreateAccount />} />
          <Route exact path="/customerInfo" element={<CustomerInfo />} />
          <Route exact path="/bankdashboard" element={<BankDashboard />} />
          <Route exact path="/addBank" element={<RegisterBank />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/ViewTransactions" element={<ViewTransactions />} />
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/allBuyers" element={<AllBuyers list />} />
          <Route exact path="/allSuppliers" element={<AllSuppliers />} />
          <Route exact path="/purchasedItemDetails" element={<PurchasedItemsDetails />} />
          <Route exact path="/itemsPurchasedDetails" element={<ItemsPurchased />} />
          <Route exact path="/supplierItemsPurchased" element={<ItemsPurch />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/bankLoan" element={<BankLoan />} />
          <Route exact path="/SupplierViewTransactions" element={<SupplierViewTransactions />} />
          <Route exact path="/viewAllTransactions" element={<ViewAllTransactions />} />
          <Route exact path="/ViewBankDetailsSupplier" element={<ViewBankDetailsSupplier />} />
          <Route exact path="/ViewBankDetailsBuyer" element={<ViewBankDetailsBuyer />} />
          
        </Routes>


      </div>
    </Router>

  );
}

export default App;
