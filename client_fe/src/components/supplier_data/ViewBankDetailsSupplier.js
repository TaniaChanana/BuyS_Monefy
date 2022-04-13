import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { sessionConst, modeOfPayment } from '../../Constants';
import Header from '../header/Header'
function ViewBankDetailsSupplier() {

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
        const response = await axios.get('http://localhost:3001/api/getBankDetails', {
          params: {
            userId: window.sessionStorage.getItem(sessionConst.userId)
          }
        })
        console.log(response.data)
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
              <th>Amount</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
            {
              sList && sList.map((s) => (
                <tr>
                  <td>{s.bankName}</td>
                  <td>{s.branchCode}</td>
                  <td>{s.amount}</td>
                  <td>{s.accountNumber}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewBankDetailsSupplier