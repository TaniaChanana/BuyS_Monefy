import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { sessionConst } from '../../Constants';
import Header from '../header/Header';

const ItemsPurch = () => {

    const [list, setList] = useState();
    useEffect(() => {
        console.log('hi')
        let list = async() => {
            try{
                const res = await axios.get('http://localhost:3001/api/getUserId', {
                    params: {
                        userName: window.sessionStorage.getItem(sessionConst.userName),
                        userType: window.sessionStorage.getItem(sessionConst.userType),
                    }
                })
                window.sessionStorage.setItem(sessionConst.userId, res.data[0].userId)
                const response = await axios.get('http://localhost:3001/api/getAllItemPurchasedSupplierId', {
                    params: {
                        supplierId: window.sessionStorage.getItem(sessionConst.userId),
                    }
                })
                setList(response.data)
            }catch(err){
                console.log(err);
            }
        }
        list();
    }, [])

  return (
    <>
        <Header />
      
      <div classNameName="d-flex justify-content-center">
        
        <table className="container table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Buyer Name</th>
              <th>Category Name</th>
              <th>Item Name</th>
              <th>Brand</th>
              <th>No. of Items</th>
              <th>Paid Amount</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
          {
                list && list.map((l) => (
                    <tr>
                        <td>{l.buyerName}</td>
                        <td>{l.categoryName}</td>
                        <td>{l.itemName}</td>
                        <td>{l.brandName}</td>
                        <td>{l.noOfItems}</td>
                        <td>{l.paidAmount}</td>
                        <td>{(l.purchaseDateTime).substring(0, 10) + ', ' + (l.purchaseDateTime).substring(11,19)}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ItemsPurch