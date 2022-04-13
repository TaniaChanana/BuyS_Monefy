import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { sessionConst, modeOfPayment } from '../../Constants';
import Header from '../header/Header'
function SupplierViewTransactions() {

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
        const response = await axios.get('http://localhost:3001/api/getAlTransactionsForSupplierId', {
          params: {
            supplierId: window.sessionStorage.getItem(sessionConst.userId)
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
              <th>Buyer Name</th>
              <th>Paid Amount</th>
              <th>Mode Of Payment</th>
              <th>Time Of Payment</th>
            </tr>
          </thead>
          <tbody>
            {
              sList && sList.map((s) => (
                <tr>
                  <td>{s.buyerName}</td>
                  <td>{s.paidAmount}</td>
                  <td>{(modeOfPayment.find((c) => {
                    return (c.modeId === s.modeOfPayment)
                  })).mode}</td>
                  <td>{s.timeOfPayment}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SupplierViewTransactions