import React, {useState} from 'react';
// import './Buyer_transaction.css';
import axios from 'axios';
import Header from '../header/Header';

function Buyer_transaction(props) {
  
  const loginuserName = localStorage.getItem('userName');
  console.log(loginuserName);
  const logout = localStorage.removeItem('userName');
  console.log(logout);

  const [user, setUser] = useState({
    busername : "",
    susername : "",
    item : "",
    itemcount : "",
    amount : "",
    date : ""
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
  }
  const submitDetails = () => {
    alert("hello");
    console.log(user.busername);
    console.log(user.susername);
    console.log(user.item);
    console.log(user.itemcount);
    console.log(user.amount);
    console.log(user.date);
    axios.post("http://localhost:3001/api/buyer_transaction", 
    {
      busername : user.busername , 
      susername : user.susername,
      item : user.item,
      itemcount : user.itemcount,
      amount : user.amount,
      date : user.date
    },).then(() => {
      console.log("post body");
    }).catch((err) => { console.log('Axios Error:', err); })
  };

    return (
      <>
      <Header />
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-5">
                <div className="col text-center">
                  <h1 className="heading">Buyer Transaction</h1>
                  <p className="text-h3">Please fill in this form to do buyer transaction.</p>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="text" className="form-control" id="b-username" name="busername" value={user.busername} onChange={handleInput} placeholder="Enter buyer user name" required />
                  <label className="mx-3" htmlFor="busername">Buyer Username</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="s-username" name="susername" value={user.susername} onChange={handleInput} placeholder="Enter supplier user name" required/>
                  <label className="mx-3" htmlFor="susername">Supplier Username</label>
                </div>
              </div>
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlItem" name="item" value={user.item} onChange={handleInput} required >
                <option value="1">Jeans</option>
                <option value="2">Shirts</option>
                <option value="3">Pents</option>
                <option value="4">Blanket</option>
                </select>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="item-count" name="itemcount" value={user.itemcount} onChange={handleInput} placeholder="Enter number of items" required />
                  <label className="mx-3" htmlFor="itemcount">Number of Items</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="amnt" name="amount" value={user.amount} onChange={handleInput} placeholder="Enter amount" required />
                  <label className="mx-3" htmlFor="amount">Amount</label>
                </div>
              </div>
              <div className="row align-items-center mt-4 inputBox">
                <div className="col mt-1 form-floating">
                  <input type="date" className="form-control" id="date" name="date" value={user.date} onChange={handleInput} placeholder="Enter your username" required />
                  <label className="mx-3" htmlFor="date">Date</label>
                </div>
              </div>
                  
                  <button className="btn btn-primary mt-3" onClick={submitDetails}>Submit</button>
                  
                </div>           
            </form>
      </div>
      </>
    );

}

export default Buyer_transaction
;