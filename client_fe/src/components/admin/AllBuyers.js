import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'

const AllBuyers = () => {

    const [bList, setBList] = useState();
    useEffect(() => {
        console.log('hi')
        let list = async() => {
            try{
                const response = await axios.get('http://localhost:3001/api/getAllBuyerAndSupplierList', {
                    params: {
                        userType: "2"
                    }
                })
                console.log(response.data)
                setBList(response.data)
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
              {/* <th>Mode of Payment</th> */}
            </tr>
          </thead>
          <tbody>
          {
                bList && bList.map((b) => (
                    <tr>
                        <td>{b.fname}</td>
                        <td>{b.lname}</td>
                        <td>{b.userName}</td>
                        <td>{b.emailAddress}</td>
                        <td>{b.phoneNumber}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllBuyers