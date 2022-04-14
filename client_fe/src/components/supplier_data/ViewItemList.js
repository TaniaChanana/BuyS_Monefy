import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { sessionConst} from '../../Constants';
import Header from '../header/Header'
function ViewItemList() {

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
        const response = await axios.get('http://localhost:3001/api/getItemList', {
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
              <th>Category Name</th>
              <th>Item Name</th>
              <th>Brand Name</th>
              <th>Price Per Item</th>
              <th>Stock Available</th>
            </tr>
          </thead>
          <tbody>
            {
              sList && sList.map((s) => (
                <tr>
                  <td>{s.categoryName}</td>
                  <td>{s.itemName}</td>
                  <td>{s.brandName}</td>
                  <td>{s.pricePerItem}</td>
                  <td>{s.availableItems}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewItemList