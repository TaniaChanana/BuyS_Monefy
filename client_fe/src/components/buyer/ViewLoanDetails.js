import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { sessionConst, statusConst} from '../../Constants';
import Header from '../header/Header'
function ViewLoanDetails() {

  const [sList, setSList] = useState();

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
  useEffect(() => {
    console.log('hi')
    let list = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getLoanDetails', {
          params: {
            buyerId: window.sessionStorage.getItem(sessionConst.userId)
          }
        })
        console.log("response ",response.data)
        setSList(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    list();
  }, [])

  return (
    <div>
      <Header />

      <div classNameName="d-flex justify-content-center">

        <table className="container table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Bank Name</th>
              <th>Branch Code</th>
              <th>Account Number</th>
              <th>Loan Amount</th>
              <th>Interest</th>
              <th>Total Amount To Be Paid</th>
              <th>EMI Months</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              sList && sList.map((s) => (
                <tr>
                  <td>{s.bankName}</td>
                  <td>{s.branchCode}</td>
                  <td>{s.accountNumber}</td>
                  <td>{s.loanAmount}</td>
                  <td>{s.Interest}</td>
                  <td>{s.totalAmountToBePaid}</td>
                  <td>{s.emiMonths}</td>
                  <td>{(statusConst.find((c) => {
                    return (c.statusId === s.status)
                  })).status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewLoanDetails