import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'

const PurchasedItemsDetails = () => {

    const [list, setList] = useState();
    useEffect(() => {
        console.log('hi')
        let list = async() => {
            try{
                const response = await axios.get('http://localhost:3001/api/getAllItemPurchased')
                console.log(response.data)
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
              <th>Supplier Name</th>
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
                        <td>{l.supplierName}</td>
                        <td>{l.categoryName}</td>
                        <td>{l.itemName}</td>
                        <td>{l.brandName}</td>
                        <td>{l.noOfItems}</td>
                        <td>{l.paidAmount}</td>
                        <td>{l.purchaseDateTime}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PurchasedItemsDetails