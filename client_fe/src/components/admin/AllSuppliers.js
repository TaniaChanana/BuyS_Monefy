import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'

const AllSuppliers = () => {
    const [sList, setSList] = useState();
    useEffect(() => {
        console.log('hi')
        let list = async() => {
            try{
                const response = await axios.get('http://localhost:3001/api/getAllBuyerAndSupplierList', {
                    params: {
                        userType: "3"
                    }
                })
                console.log(response.data)
                setSList(response.data)
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
            <th>First Name</th>
              <th>Last Name</th>
              <th>UserName</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              {/* <th>Mode of Payment</th>  */}
            </tr>
          </thead>
          <tbody>
            {
                sList && sList.map((s) => (
                    <tr>
                        <td>{s.fname}</td>
                        <td>{s.lname}</td>
                        <td>{s.userName}</td>
                        <td>{s.emailAddress}</td>
                        <td>{s.phoneNumber}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllSuppliers