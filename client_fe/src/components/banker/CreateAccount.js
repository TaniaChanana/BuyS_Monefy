import React ,{useState, useEffect} from 'react'
// import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useStateValue} from "./StateProvider";
import Header from '../header/Header';
import { sessionConst } from '../../Constants';


function CreateAccount() {
  let navigate = useNavigate();
  const [bankList, setBankList] = useState([]);
  const [bankBranchCodeList, setBankBranchCodeList] = useState([]);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedBankBranchCode, setSelectedBankBrnachCode] = useState('');
  const [state,dispatch]=useStateValue();
  
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
    let getUserId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getUserId",
          {
            params: {
              userName: window.sessionStorage.getItem(sessionConst.userName),
              userType: window.sessionStorage.getItem(sessionConst.userType),
            },
          }
        );
        console.log(response.data[0]);
        window.sessionStorage.setItem(sessionConst.userId, response.data[0].userId);
      } catch (err) {
        console.log(err);
      }
    };
    getUserId();
  }, []);
  const [uname, setUName] = useState(window.sessionStorage.getItem(sessionConst.userName));
    const [user, setUser] = useState({
            bankname:"",  
            branchCode:"",
            amount: "",
            accnum:"",  
    });
  
    let name, value;
    const handleInput = (e) => {
      console.log(e);
      name = e.target.name;
      value = e.target.value;
  
      setUser({...user, [name] : value});
    }
   
    const handleSelectedBank = (e) => {
      setSelectedBankName(e.target.value);
    }
    const handleSelectedBranchCode = (e) => {
      setSelectedBankBrnachCode(e.target.value);
    }

  const  submitDetails = (e) => {
    e.preventDefault();
    console.log(selectedBankName, " ",selectedBankBranchCode)
    axios.post("http://localhost:3001/api/addUserAccount", 
    {
      userId: window.sessionStorage.getItem(sessionConst.userId),
      bankName: selectedBankName,  
      branchCode:selectedBankBranchCode,
      amount: user.amount,
      accountNumber: user.accnum,  
      },).then((res) => {

    console.log("post body");
   navigate('/UserProfile');
   
  }).catch((err) => { 
      console.log('Axios Error:', err);
 });
//  axios.get("http://localhost:3001/api/createAccount", 
//       {customername : user.customername,
//         accnum:user.accnum,
//         bankname:user.bankname,
//         ifsc : user.ifsc,},).then((res) => {
//         //  window.sessionStorage.setItem("bankaccounts",res.data[0]);
//          console.log("FRESH:  ",res.data);
 
//     window.sessionStorage.setItem("acc",JSON.stringify(res.data));
    
   
//           navigate("/");
         
//         }).catch((err) => { 
//             console.log('Axios Error:', err);
//        });

     
  
    };


    return (
      <>
      <Header />
          <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row">
                <div className="col text-center">
                  <h1 className="heading">Create Bank Account</h1>
                  
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="text" className="form-control" id="uname" name="uname" value={uname} required disabled />
                  <label className="mx-3" htmlFor="cystomername">Full Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                <select id="fbname" className="form-control" value={selectedBankName} onChange={handleSelectedBank} required>
                    <option value='' selected>Select Bank Name</option>
                    {bankList && bankList.map((val, index) => (
                      <option key={index} value={val.bankName}>{val.bankName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                <select id="fbcode" className="form-control" value={selectedBankBranchCode} onChange={handleSelectedBranchCode} required>
                    <option value='' selected>Select Branch Code</option>
                    {bankBranchCodeList && bankBranchCodeList.map((val, index) => (
                      <option key={index} value={val.branchCode}>{val.branchCode}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="accnum" placeholder="account no." name="accnum" value={user.accnum}  onChange={handleInput}  required />
                  <label className="mx-3" htmlFor="email">Account Number</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="amount" placeholder="amount" name="amount" value={user.amount}  onChange={handleInput}  required />
                  <label className="mx-3" htmlFor="amount">Amount</label>
                </div>
              </div>
        
          
              <div className="row justify-content-start mt-3">
                <div className="col  d-flex flex-column justify-content-center align-items-center">
               
                  <button className="btn btn-primary mt-3"  onClick={(e) => submitDetails(e)}>Submit</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      </>
  //   <div className="container">
  //   <form className="row justify-content-center" method="post">
  //     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
  //     <span className='title'>Create Account</span>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Full Name</span>
  //     <input type="text" class="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="addon-wrapping"  name="customername" value={user.customername} onChange={handleInput}  required />
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Bank Name</span>
  //     <input type="text" class="form-control" placeholder="Bank Name" aria-label="Bank Name" aria-describedby="addon-wrapping" name="bankname" value={user.bankname} onChange={handleInput} required />
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">IFSC Code</span>
  //     <input type="text" class="form-control" placeholder="IFSC Code" name="ifsc" value={user.ifsc} aria-label="IFSC Code" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Account Number</span>
  //     <input type="text" class="form-control" placeholder="account no." name="accnum" value={user.accnum} aria-label="Account Number" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
  //     </div>
      
      
  //     <div class="d-grid gap-2">
  
  //     <button class="btn btn-dark" type="button" onClick={(e) => submitDetails(e)}>Submit</button>
  //     </div>
  //     </div>
  //   </form>
      
  // </div>
  )
}

export default CreateAccount
