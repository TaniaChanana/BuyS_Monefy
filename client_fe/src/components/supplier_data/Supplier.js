import React, {useState, useEffect} from 'react';
import './Supplier.css';
import axios from 'axios';
import { sessionConst } from '../../Constants';
import SupplierHomeNavbar from '../SupplierHome/SupplierHomeNavbar';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';



function Supplier({user}) {

  let navigate = useNavigate();

  const [itemName, setItemName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedItemName, setSelectedItemName] = useState('')
  const [brandList, setBrandList] = useState();
  const [item, setItem] = useState({
    itemid : 0,
    sname : "",
    availableItems : 1,
    itemPrice : 0,
    brand : "",
  });

  const [itemList, setItemList] = useState();
  const [categoryList, setCategoryList] = useState([]);

  // const getItemList = async() => {
  //   try{
  //     const response = await axios.get("http://localhost:3001/api/getItem");
  //       setItemList(response.data);
  //     }catch(err) {
  //       console.log(err);
  //     }
  // }
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
    let categoryL = async () => {
      console.log('list');
      try{
        const response = await axios.get('http://localhost:3001/api/getAllCategories');
        console.log(response.data);
        let l1 = Array(response.data);
        setCategoryList(l1)
        console.log(categoryList)
        window.sessionStorage.setItem(sessionConst.cList, JSON.stringify(l1));

      }catch(err){
        console.log(err);
      }
    }
    categoryL();
  }, [categoryName,])
  console.log(categoryList)

  useEffect(() => {
    console.log(selectedCategoryName)
    setSelectedCategory((categoryList[0]?.find((c) => {
      console.log("hi id block")
      console.log(c.categoryId);
      return (c.categoryName === selectedCategoryName)
      
    })))
    console.log(selectedCategory);
  }, [categoryList, selectedCategoryName])
  console.log(selectedCategory?.categoryId);
  window.sessionStorage.setItem(sessionConst.categoryId, selectedCategory?.categoryId);

  useEffect(() => {
    console.log(selectedItemName)
    setSelectedItem((itemList?.find((c) => {
      console.log("hi item block")
      console.log(c.itemId);
      return (c.itemName === selectedItemName)
      
    })))
    console.log(selectedItem);
  }, [selectedItemName])

  console.log(selectedItem);

  useEffect(() => {
    let itemL = async () => {
      console.log('list');
      if(selectedCategoryName === '');
      else{
      try{
        console.log(selectedCategory?.categoryId + 'hi')
        console.log(window.sessionStorage.getItem(sessionConst.categoryId) + "id");
        const response = await axios.get('http://localhost:3001/api/getAllItemForCategoryId', {
        params : {  
          categoryId: selectedCategory?.categoryId
        }
        });
          console.log(response.data);
          setItemList(response.data)
      }catch(err){
        console.log(err);
      }
    } 
    }
    itemL();
  }, [selectedCategory, selectedItemName])

  useEffect(() => {
    let brandL = async () => {
      console.log('list');
      if(selectedItemName === '');
      else{
      try{
        console.log('hi')
        const response = await axios.get('http://localhost:3001/api/getAllBrandListForCategoryItem', {
        params : {  
          categoryId: selectedCategory?.categoryId,
          itemId: selectedItem.itemId
        }
        });
          console.log(response.data);
          setBrandList(response.data)        
      }catch(err){
        console.log(err);
      }
    } 
    }
    brandL();
  }, [selectedItem, selectedBrand])

  const newItemUpdate = (e) => {
    e.preventDefault();
    let list = async () => {
      try{
        await axios.post("http://localhost:3001/api/addItem", {
          categoryId: selectedCategory?.categoryId,
          itemName: itemName
        })
        setSelectedItemName(itemName);
      }catch(err){
        console.log(err);
      }
    }
    list();
    setItemName('');
  }

  const newCatgoryUpdate = (e) => {
    e.preventDefault();
    let list = async () => {
      console.log('category');
      console.log(categoryName);
      try{
        await axios.post('http://localhost:3001/api/addCategory', {
          categoryName: categoryName
        })
        setSelectedCategoryName(categoryName);
      }catch(err){
        console.log(err)
      }
    }
    list();
    setCategoryName('');
  }

  const newBrandUpdate = (e) => {
    e.preventDefault();
    let list = async () => {
      try{
        await axios.post('http://localhost:3001/api/addBrand', {
          categoryId: selectedCategory?.categoryId,
          itemId: selectedItem.itemId,
          brandName: brandName
        })
        setSelectedBrand(brandName);
      }catch(err){
        console.log(err)
      }
    }
    list();
    setBrandName('');
  }


// const getId = async() => {
//   try{
//     const response = await axios.post("http://localhost:3001/api/itemid", {
//     selectedItem: selectedItem
//   })
//   console.log(response.data);
//   setItem({...item, itemid : response.data[0].itemId})
//   }catch(err) {
//     console.log(err);
//   }
// }

  // useEffect(() => {
  //   let n = window.sessionStorage.getItem(sessionConst.userName);
  //   setItem({...item, sname : n})
    
  //   getItemList()
  //   getId();
  // }, [selectedItem])

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setItem({...item, [name] : value});
  }

  const handleSelectedItem = (e) => {
    setSelectedItemName(e.target.value);
    console.log(e.target.value);
    // getId();
  }
  const handleSelectedCategory = (e) => {
    setSelectedCategoryName(e.target.value);
    // console.log(e.target.value);
    // getId();
  }
  const handleSelectedBrand = (e) => {
    setSelectedBrand(e.target.value);
  }

  const handleInputNewItem = (e) => {
    console.log(e)
    value = e.target.value;
    setItemName(value);
    console.log(itemName)
  }

  const handleInputNewCategory = (e) => {
    console.log(e);
    value = e.target.value;
    setCategoryName(value);
    console.log(categoryName);
  }

  const handleInputNewBrand = (e) => {
    console.log(e);
    value = e.target.value;
    setBrandName(value);
    console.log(brandName);
  }

  const submitDetails = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/addSupplierItem", {
        categoryId: selectedCategory.categoryId,
        itemId: selectedItem.itemId,
        brandName: selectedBrand,
        userId: window.sessionStorage.getItem(sessionConst.userId),
        pricePerItem: item.itemPrice,
        availableItems: item.availableItems,
      });
      // navigate('/UserProfile')
      alert("Item Added Successfully");
      setSelectedCategoryName('');
      setSelectedItemName('');
      setSelectedBrand('');
      setItem({...item,itemPrice : '', availableItems:''});
      // setUser({...user, bankname:'', ifsc:'',city:'',state:'', address:'',pinCode:'',branchcode:'',interest:''})
    } catch (err) {
      console.log(err);
    }
  };

    return(
      <>
      {/* <SupplierHomeNavbar /> */}
      <Header/>
      
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-5 col-md-2 col-lg-2 col-xl-5">
              <div className="row mt-1">
                <div className="col text-center">
                  <h1 className="heading">Item Details</h1>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="itname iname" className="form-control item_input" value={selectedCategoryName} onChange={handleSelectedCategory} required>
                    <option value='' selected>Select...</option>
                    {categoryList[0] && categoryList[0].map((val) => (
                      <option key={val.categoryId} value={val.categoryName}>{val.categoryName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="itname">Category</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal">Add New Category</button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Category</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                    
                        <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="ctname" name="categoryName" value={categoryName} onChange={handleInputNewCategory} placeholder="Enter category name" required/>
                            <label className="mx-3" htmlFor="ctname">Category</label>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={newCatgoryUpdate}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="itname iname" className="form-control item_input" value={selectedItemName} onChange={handleSelectedItem} required>
                    <option value='' selected>Select...</option>
                    {itemList && itemList.map((val) => (
                      <option key={val.itemId} value={val.itemName}>{val.itemName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="itname">Item Name</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal1">Add New Item</button>
                  <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Item</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                      <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="itname" name="itemName" value={selectedCategoryName} required disabled/>
                            <label className="mx-3" htmlFor="iname">Category Name</label>
                          </div>
                        </div>
                        <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="itname" name="itemName" value={itemName} onChange={handleInputNewItem} placeholder="Enter item name" required/>
                            <label className="mx-3" htmlFor="iname">Item Name</label>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={newItemUpdate}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                
                  <input type="text" className=" form-control" id="brand" name="brand" value={item.brand} onChange={handleInput} placeholder="Enter brand name" required />
                  <label className=" mx-3" htmlFor="brand">Brand</label>
                </div>
              </div> */}
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="brand" className="form-control item_input" value={selectedBrand} onChange={handleSelectedBrand} required>
                    <option value='' selected>Select...</option>
                    {brandList && brandList.map((val, index) => (
                      <option key={index} value={val.brandName}>{val.brandName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="brand">Brand Name</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal2">Add New Brand</button>
                  <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Brand</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                    
                        <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="brand" name="brand" value={brandName} onChange={handleInputNewBrand} placeholder="Enter brand name" required/>
                            <label className="mx-3" htmlFor="brand">Brand Name</label>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={newBrandUpdate}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <input type="number" className=" form-control" id="availableItems" name="availableItems" value={item.availableItems} onChange={handleInput} placeholder="1" required />
                <label className=" mx-3" htmlFor="availableItems">Number of Items</label>
                 
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
               
                  <input type="number" className=" form-control" id="itemPrice" name="itemPrice" value={item.itemPrice} onChange={handleInput} placeholder="Enter amount per item" required />
                  <label className=" mx-3" htmlFor="itemPrice">Amount per Item</label>
                </div>
              </div>
             
              <div className="row justify-content-start my-3">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-primary btn-lg mt-1" onClick={submitDetails}>Submit</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      </>
    );
}

export default Supplier;