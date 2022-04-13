import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import options, { sessionConst } from '../../Constants';
import Header from '../header/Header'

const Payment = () => {

    
  let navigate = useNavigate();
  const location = useLocation();
  const [bankList, setBankList] = useState([]);
  const [bankBranchCodeList, setBankBranchCodeList] = useState([]);
  const [supplierBankBranchCodeList, setSupplierBankBranchCodeList] = useState([]);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedBankBranchCode, setSelectedBankBrnachCode] = useState('');
  const [selectedSupplierBankName, setSelectedSupplierBankName] = useState('');
  const [selectedSupplierBankBranchCode, setSelectedSupplierBankBrnachCode] = useState('');

  const [user, setUser] = useState({
    bname : window.sessionStorage.getItem(sessionConst.userName),
    fbaccountNumber : "",
    famount : location.state.amount,
    sname : location.state.sname,
    saccountnumber: "",
    userId: "",
    modeOfPayment : location.state.modeOfPayment,
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
  }

  useEffect(() => {
    let banklist = async () => {
      try{
        const response = await axios.get('http://localhost:3001/api/getAllBanks')
        setBankList(response.data)
      }catch(err){
        console.log(err)
      }
    }
    banklist();
  }, [])

  useEffect(() => {
    let id = async () => {
      try{
        const res = await axios.get('http://localhost:3001/api/getUserId', {
          params: {
            userName: user.sname,
            userType: "3",
          }
        })
        console.log(res.data[0].userId);
        setUser({...user, userId: res.data[0].userId})
        console.log(user.userId)
      }catch(err){
        console.log(err);
      }
    }
  },[])

  useEffect(() => {
    let bankBranchL = async () => {
      try{
        console.log("hi")
        const response = await axios.get('http://localhost:3001/api/getAllBranchForBank', {
          params: {
            bankName: selectedBankName,
          }
        })
        console.log(response.data)
        setBankBranchCodeList(response.data)
      }catch(err){
        console.log(err)
      }
    }
    bankBranchL();
  }, [selectedBankName])

  useEffect(() => {
    let bankBranchL = async () => {
      try{
        const response = await axios.get('http://localhost:3001/api/getAllBranchForBank', {
          params: {
            bankName: selectedSupplierBankName,
          }
        })
        console.log(response.data)
        setSupplierBankBranchCodeList(response.data)
      }catch(err){
        console.log(err)
      }
    }
    bankBranchL();
  }, [selectedSupplierBankName])

  console.log(selectedBankName)

  const handleSelectedBank = (e) => {
    setSelectedBankName(e.target.value);
  }
  const handleSelectedBranchCode = (e) => {
    setSelectedBankBrnachCode(e.target.value);
  }
  const handleSelectedSupplierBank = (e) => {
    setSelectedSupplierBankName(e.target.value);
  }
  const handleSelectedSupplierBranchCode = (e) => {
    setSelectedSupplierBankBrnachCode(e.target.value);
  }

  const submitDetails = async(e) => {
    e.preventDefault();
    try{
      let response = await axios.post("http://localhost:3001/api/addPaymentTransaction", {
      // fromBankName : user.bname , 
      fromBankName : selectedBankName,
      fromBranchCode : selectedBankBranchCode,
      fromAccountNumber : user.fbaccountNumber,
      amountToBePaid : user.famount,
      supplierId : user.userId,
      toBankName : selectedSupplierBankName,
      toBranchCode : selectedSupplierBankBranchCode,
      toAccountNumber:user.saccountnumber,
      modeOfPayment: user.modeOfPayment,
      buyerItemPurchaseId: location.state.buyerItemPurchaseId
    })
    console.log(response)
    }catch(err){
      console.log(err);
    }
    navigate('/Buyer');
 
  };
  return (
    <>
        <Header />
        <div className='container'>
        <form className="row justify-content-center " method="post">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col text-center">
                  <h1 className="heading">Payment</h1>
                </div>
              </div>
             <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating ">
                  <input type="text" className="form-control" id="bname" name="bname" value={user.bname} placeholder="Buyer name" required disabled />
                  <label className="mx-3" htmlFor="bname">Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col form-floating mt-1">
                <select id="fbname" className="form-control" value={selectedBankName} onChange={handleSelectedBank} required>
                    <option value='' selected>Select...</option>
                    {bankList && bankList.map((val, index) => (
                      <option key={index} value={val.bankName}>{val.bankName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <select id="fbcode" className="form-control" value={selectedBankBranchCode} onChange={handleSelectedBranchCode} required>
                    <option value='' selected>Select...</option>
                    {bankBranchCodeList && bankBranchCodeList.map((val, index) => (
                      <option key={index} value={val.branchCode}>{val.branchCode}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="fbaccountNumber" name="fbaccountNumber" value={user.fbaccountNumber} onChange={handleInput} placeholder="Enter buyer account number" required />
                  <label className="mx-3" htmlFor="fbaccountNumber">Account Number</label>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="famount" name="famount" value={user.famount} placeholder="Enter amount" required disabled />
                  <label className="mx-3" htmlFor="famount">Amount</label>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="sname" name="sname" value={user.sname} placeholder="Enter supplier name" required disabled />
                  <label className="mx-3" htmlFor="sname">Supplier Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <select id="sbankname" className="form-control" value={selectedSupplierBankName} onChange={handleSelectedSupplierBank} required>
                    <option value='' selected>Select...</option>
                    {bankList && bankList.map((val, index) => (
                      <option key={index} value={val.bankName}>{val.bankName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <select id="sbranchname" className="form-control" value={selectedSupplierBankBranchCode} onChange={handleSelectedSupplierBranchCode} required>
                    <option value='' selected>Select...</option>
                    {supplierBankBranchCodeList && supplierBankBranchCodeList.map((val, index) => (
                      <option key={index} value={val.branchCode}>{val.branchCode}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="saccountnumber" name="saccountnumber" value={user.saccountnumber} onChange={handleInput} placeholder="Enter supplier account number" required />
                  <label className="mx-3" htmlFor="saccountnumber">Supplier Account Number</label>
                </div>
              </div>
              <div className="row justify-content-start mt-1">
                <div className="col  d-flex flex-column justify-content-center align-items-center">
                  <button className="btn btn-primary mt-1" onClick={submitDetails}>Submit</button>
                </div>
              </div>
          </div>
        </form>
        </div>
    </>
  )
}

export default Payment