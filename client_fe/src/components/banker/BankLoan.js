import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import options, { sessionConst } from '../../Constants';
import Header from '../header/Header'

const BankLoan = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [bankList, setBankList] = useState([]);
  const [bankBranchCodeList, setBankBranchCodeList] = useState([]);
  const [supplierBankBranchCodeList, setSupplierBankBranchCodeList] = useState([]);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedBankBranchCode, setSelectedBankBrnachCode] = useState('');
  const [selectedSupplierBankName, setSelectedSupplierBankName] = useState('');
  const [selectedSupplierBankBranchCode, setSelectedSupplierBankBrnachCode] = useState('');
  const [collateral, setCollateral] = useState({data: '' });
  const [bankLoanPDF, setBankLoanPDF] = useState({data: '' });
  const [rate, setRate] = useState();

  const [user, setUser] = useState({
    bname : window.sessionStorage.getItem(sessionConst.userName),
    fbaccountNumber : "",
    famount : "",
    saccountnumber: "",
    timeperiod: "",
    interest: "",
    emiAmount: "",
    userId: "",
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
            userName: window.sessionStorage.getItem(sessionConst.userName),
            userType: window.sessionStorage.getItem(sessionConst.userType),
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
    let irate = async() => {
      try{
        const response = await axios.get('http://localhost:3001/api/getInterestForBank', {
          params: {
            bankName: selectedBankName,
            branchCode: selectedBankBranchCode,
            // amount: user.famount,
            // timePeriod: user.timeperiod,
          }
        })
        console.log("response is : ",response.data);
        setRate(response.data[0].rateOfInterest)
      }catch(err){
        console.log(err);
      }
    }
    irate()
  }, [selectedBankName, selectedBankBranchCode])

  useEffect(() => {
    // console.log((Number(rate)*Number(user.famount)*(Number(user.timeperiod)/12))/100)
        // setUser({...user, interest:(Number(rate)Number(user.famount)(Number(user.timeperiod)/12))/100});
        setUser({...user, emiAmount:(Number(user.famount)+Number(user.interest))/Number(user.timeperiod)})
  }, [user.famount, user.timeperiod, user.interest])

  useEffect(() => {
    console.log((Number(rate)*Number(user.famount)*(Number(user.timeperiod)/12))/100)
        setUser({...user, interest:(Number(rate)*Number(user.famount)*(Number(user.timeperiod)/12))/100});
        // setUser({...user, emiAmount:(Number(user.famount)+Number(user.interest))/Number(user.timeperiod)})
  }, [user.famount, user.timeperiod])

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
  const handleInputCollateral = (e) => {
    e.preventDefault();
    setCollateral(e.target.files[0]);
}

  const handleInputBankLoanPDF = (e) => {
    e.preventDefault();
    setBankLoanPDF(e.target.files[0])
  }

  const submitDetails = async(e) => {

    e.preventDefault();

    const formDataLoan = new FormData();
    formDataLoan.append("file", bankLoanPDF);
    try{
      const response = await fetch('http://localhost:3001/api/uploadMedia', {
        method: 'POST',
        body: formDataLoan
      })

    }catch(err){
      console.log(err);
    }

    let bankLoanPDFId = 0;
    try{
      const response = await axios.get('http://localhost:3001/api/getUpdatedMediaId')
      console.log("my res" , response.data[0].mediaId)
      bankLoanPDFId = response.data[0].mediaId

    }catch(err){
      console.log(err);
    }
    console.log("bank loan id : ", bankLoanPDFId);

    const formData = new FormData();
    formData.append("file", collateral);
    console.log("collateral is : ", formData.get("file"));
    try{
      const response = await fetch('http://localhost:3001/api/uploadMedia', {
        method: 'POST',
        body: formData
      })

    }catch(err){
      console.log(err);
    }
    let collateralPDFId = 0;
    try{
      const response = await axios.get('http://localhost:3001/api/getUpdatedMediaId')
      console.log("my res" , response.data[0].mediaId)
      collateralPDFId = response.data[0].mediaId

    }catch(err){
      console.log(err);
    }

    try{
      console.log(bankLoanPDFId);
      let response = await axios.post('http://localhost:3001/api/addLoanDetails' , {
                userId : user.userId,
                bankName : selectedBankName,
                branchCode : selectedBankBranchCode,
                loanAmount : user.famount,
                accountNumber : user.fbaccountNumber,
                emiMonths : user.timeperiod,
                interestAmount: user.emiAmount,
                mediaIdCollateral : collateralPDFId,
                mediaIdLoanPDF : bankLoanPDFId,
            })
    console.log(response)
    }catch(err){
      console.log(err);
    }
    let amountNow = location.state.amount;
    let suppName = location.state.sname;
    console.log("amount", amountNow, " ", "supplier" , suppName);
    navigate('/payment', {state: {amount : amountNow, modeOfPayment : 2, sname : suppName}})
 
  };
  return (
    <>
        <Header />
        <div className='container'>
        <form className="row justify-content-center " method="post">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col text-center">
                  <h1 className="heading">Bank Loan</h1>
                </div>
              </div>
             <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating ">
                  <input type="text" className="form-control" id="bname" name="bname" value={user.bname} placeholder="Buyer name" required disabled />
                  <label className="mx-3" htmlFor="bname">Buyer Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col form-floating mt-1">
                <select id="fbname" className="form-control" value={selectedBankName} onChange={handleSelectedBank} required>
                    <option value='' selected>Select Bank</option>
                    {bankList && bankList.map((val, index) => (
                      <option key={index} value={val.bankName}>{val.bankName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <select id="fbcode" className="form-control" value={selectedBankBranchCode} onChange={handleSelectedBranchCode} required>
                    <option value='' selected>Select Branch Code</option>
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
                  <input type="text" className="form-control" id="famount" name="famount" value={user.famount} onChange={handleInput} placeholder="Enter amount" required />
                  <label className="mx-3" htmlFor="famount">Amount</label>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-1 form-floating">
                  <input type="number" className="form-control" id="timeperiod" name="timeperiod" value={user.timeperiod} onChange={handleInput} placeholder="Enter time period" required />
                  <label className="mx-3" htmlFor="timeperiod">Time Period</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <input type="number" className="form-control" id="interest" name="interest" value={user.interest} required disabled />
                  <label className="mx-3" htmlFor="interest">Interest Amount</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <input type="number" className="form-control" id="emiAmount" name="emiAmount" value={user.emiAmount} required />
                  <label className="mx-3" htmlFor="emiAmount">EMI Amount</label>
                </div>
              </div>

              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="file" className="form-control" id="bankLoanOnlineApplication" name="bankLoanOnlineApplication" onChange = {handleInputBankLoanPDF} placeholder="" required />
                  <label className="mx-3" htmlFor="bankLoanOnlineApplication">Upload Bank Loan PDF</label>
                </div>
              </div>

              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                  <input type="file" className="form-control" id="collateral" name="collateral" onChange = {handleInputCollateral} placeholder="" required />
                  <label className="mx-3" htmlFor="collateral">Upload Collateral</label>
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

export default BankLoan