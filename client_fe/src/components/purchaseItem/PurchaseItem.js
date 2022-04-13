import React, {useState,useEffect} from 'react';
import './PurchaseItem.module.css';
import axios, { Axios } from 'axios';
import { sessionConst, modeOfPayment } from '../../Constants';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';


let userName = window.sessionStorage.getItem(sessionConst.userName);
let totalPrice = 0;
let supplierMap = new Map();
let selectedItemId = 0;
let itemMap = new Map();
let itemPriceMap = new Map();
let availableItemsMap = new Map();
let arr = [];



function PurchaseItem() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    bname : `${userName}`,
    itemId : 0,
    sname : "",
    noOfItems : "",
    totalPrice : `${totalPrice}`,
    modeOfPayment : "",
  });

  const [items, setItems] = useState([])
  const [supplierItemTransactionDetails , setSupplierItemTransactionDetails] = useState([]);
  const [array,setArray] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryList, setCategoryList] = useState()
  const [itemList,setItemList]=useState([]);
  const [selectedItemId,setSelectedItemId]=useState('');
  const [selectedItem,setSelectedItem]=useState('');
  const [selectedBrandName,setSelectedBrandName]=useState('');
  const [brandList,setBrandList]=useState([]);
const [supplierList,setSupplierList]=useState([]);
const [selectedBrand,setSelectedBrand]=useState('');
const [selectedItemName,setSelectedItemName]=useState('');
const [supplierName,setSupplierName]=useState('');
const [availableItems,setAvailableItems]=useState('');
const [price,setPrice]=useState('');
const [supplier,setSupplier]=useState([]);
const [purchaseItem,setPurchaseItem]=useState('');
const [amount,setAmount]=useState('');
const [mode,setMode]=useState('');
const [supplierId,setSupplierId]=useState('');

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
});

  useEffect(async() => {
    
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllCategories"
        );
        console.log("RESPONSE DATA LIST ",response.data);
        // let l1 = Array(response.data);
        setCategoryList(response.data);
        window.sessionStorage.setItem(sessionConst.cList, JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
      }
    
    
  }, [])
  useEffect(async()=>{
    console.log(categoryList,selectedCategoryName);
   let value_target= categoryList?.find((c) => {
     console.log(c.categoryId,selectedCategoryName);
      return c.categoryId === selectedCategoryName;
    })
    setSelectedCategory(value_target);
   console.log(value_target);
  },[selectedCategoryName])

  useEffect(async() => {
   
      console.log('list');
      if(selectedCategory==='');
      else{
     
     
      try{
        console.log(selectedCategory?.categoryId , 'hi')
     
        const response = await axios.get('http://localhost:3001/api/getAllItemForCategoryId', {
          params: {
            categoryId: selectedCategory?.categoryId 
          }
        });
        console.log(response.data);
        setItemList(response.data)
      }catch(err){
        console.log(err);
        }
      }
      
 
  },[selectedCategory])
  console.log(itemList);

  useEffect(()=>{


    console.log(itemList,selectedItemId);
    setSelectedItem(itemList?.find((c) => {
       return c.itemName === selectedItemName
     }))
    console.log(selectedItem);

  },[selectedItemName])
  console.log(selectedItem);
  //getAllBrandListForCategoryItem
  useEffect(async()=>{
    console.log('item here');
if(selectedItem==='');
else{
  
    try{
      console.log(selectedItem?.itemId , 'hi')
      
      // console.log(window.sessionStorage.getItem(sessionConst.categoryId) , "id");
      const response = await axios.get('http://localhost:3001/api/getAllBrandListForCategoryItem', {
        params: {
          categoryId: selectedCategory?.categoryId ,
          itemId:selectedItem?.itemId,
        }
      });
      console.log(response.data);
      setBrandList(response.data)
    }catch(err){
      console.log(err);
    }
}

  },[selectedItem, selectedBrand])
  //api/getAllSuppliers

  useEffect(async()=>{
    if(selectedBrandName==='');
    else{
    console.log("HERE brand vala supplier");
    console.log(selectedCategory?.categoryId,selectedItem?.itemId,selectedBrandName);
    const response = await axios.get('http://localhost:3001/api/getAllSuppliers', 
    {
      params:{
          categoryId: selectedCategory?.categoryId,
          itemId:selectedItem?.itemId,
          brandName:selectedBrandName,
        }
      });
      console.log(response.data);
      setSupplierList(response.data);
      console.log(supplierList);}

  },[selectedBrandName]);
  useEffect(()=>{
console.log(supplierName);
console.log("WHAT",supplierList);
   let supplier_selected=supplierList?.find((c) => {
      console.log(c.userName,supplierName,c.userName === supplierName);
      return c.userName === supplierName;
    });
    console.log("supplier_selected",supplier_selected);
    setSupplier(supplier_selected);
   window.sessionStorage.setItem(sessionConst.supplierObj,JSON.stringify(supplier_selected));
    setAvailableItems(supplier_selected?.availableItems);
    setPrice(supplier_selected?.pricePerItem);
    setSupplierId(supplier_selected?.userId);
    
  //   console.log(supplierName,options[2].typeId);
  //  const response=await axios.get("http://localhost:3001/api/getUserId",
  //  {
  //    params:{
  //           userName: supplierName,
  //           userType:options[2].typeId
  //   }} );
  //   console.log("userID here--",response.data);

  },[supplierName]);

  useEffect(()=>{
    setAmount(price*purchaseItem);
     console.log(amount);
  },[purchaseItem]);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/getItems").then((response) => {
  //     setItems(response.data);
  //   });
  //   axios.get("http://localhost:3001/api/getSupplierItems").then((response) => {
  //     setSupplierItemTransactionDetails(response.data);
  //   });
  // }, []);

  const handleBrandChange = (e) => {
    let target_category=e.target.value;
       setSelectedBrandName(target_category);
        
      };
      console.log(selectedBrandName);
  const handleCategoryChange = (e) => {
let target_category=JSON.parse(e.target.value);
    setSelectedCategoryName(target_category);
    
    
  };
  console.log(selectedCategory?.categoryId);
  window.sessionStorage.setItem(
    sessionConst.categoryId,
    selectedCategory?.categoryId
  );

  const handleSupplierName = async(e) => {
  setSupplierName(e.target.value);
  console.log(supplierName,supplierList);

  // setAvailableItems()
    // setUser({...user, [name] : value});
    

  }
  const HandleItemChange = (e) => {
    // let target_item=JSON.parse(e.target.value);
    setSelectedItemName(e.target.value);


      // item name : item id  => supplier details
      // itemmap : key : item id value map : (<supplier : available item>)

    //   supplierItemTransactionDetails.map((val) => { 
      
    //   let snameMap = new Map(); // key - supplierName , value - item price
    //   if(!itemMap.has(val.itemId)){
    //     itemMap.set(val.itemId , snameMap);
    //   }

    //   snameMap = itemMap.get(val.itemId);
    //   snameMap.set(val.sname , val.availableItems);
    //   itemMap.set(val.itemId,snameMap);


    //   var str = val.itemId+":"+val.sname;
      
    //   itemPriceMap.set(str,val.itemPrice);
      
    //   availableItemsMap.set(str,val.availableItems);

    // })

    // supplierMap = itemMap.get(parseInt(selectedItemId));

    // arr = Array.from(supplierMap, ([name, value]) => ({ name, value }));
    // setArray(arr);
    // console.log("arrays is : ",arr);
    }
    console.log(selectedItemId);
  const handlePurchaseItem = (e) => {
    
    if(e.target.value>availableItems){
      alert('Stock not Available, please check the number of available items with the supplier.');

    }else{
      setPurchaseItem(e.target.value);
     
    } }
    const handlePaymentMode=(e) =>{
     setMode(e.target.value);
    }
console.log(mode);
  const submitDetails = async(e) => {
    // setUser({...user,[user.totalPrice] : `${totalPrice}`});
    e.preventDefault();
    
    console.log(supplierId);
    axios.post("http://localhost:3001/api/addBuyerItemPurchase", 
    {
      categoryId: selectedCategory?.categoryId,
          itemId:selectedItem?.itemId,
          brandName:selectedBrandName,
          supplierId : supplierId,
          buyerId : window.sessionStorage.getItem(sessionConst.userId),
          noOfItems:purchaseItem,
          totalPrice:amount,
          modeOfPayment : mode
    },).then((response) => {
      const buyerItemPurchaseId =  response.data[0].buyerItemPurchaseId;
      console.log("response checking" ,  response.data[0].buyerItemPurchaseId);
      if(mode === '1'){
        navigate('/payment',{state:{amount:amount, sname:supplierName, modeOfPayment : 1 , buyerItemPurchaseId : buyerItemPurchaseId}});
      }else if(mode === '2'){
        navigate('/bankLoan',{state: {amount : amount, modeOfPayment : 2, sname : supplierName}})
      }
    }).catch((err) => { console.log('Axios Error:', err); })
  };

    return (
      <>
      <Header />
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-5 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-1">
                <div className="col text-center">
                  <h1 className="heading">Purchase Item</h1>
                  <p className="text-h3">Please fill in this form to purchase any item</p>
                </div>
              </div>
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="categoryId" value={selectedCategoryName} onChange={handleCategoryChange} required >
                  <option value="0" selected>Select Category</option>
                    {categoryList && categoryList?.map((val) => (
                    <option value={val.categoryId}>{val.categoryName}</option>
                  ))}
                </select>
              </div>
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="itemName" value={selectedItemName} onChange={HandleItemChange} required >
                  <option value="0">Select Item</option>
                    {itemList && itemList.map((val) => (
                    <option value={val.itemName}>{val.itemName}</option>
                  ))}
                </select>
              </div>
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="brandName" value={selectedBrandName} onChange={handleBrandChange} required >
                  <option value="0" selected>Select Brand</option>
                    {brandList && brandList.map((val) => (
                    <option value={val.brandName}>{val.brandName}</option>
                  ))}
                </select>
              </div>
              
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="supplierName" value={supplierName} onChange={handleSupplierName} required >
                  <option value="0">Select Supplier Name</option>
                    {supplierList && supplierList?.map((val) => (
                     
                      <option value={val.userName}>{val.userName}</option>
                    ))}
                    </select>
              </div>
              
              <div className="row align-items-center inputBox mt-1 input-div">
                <div className="col form-floating mt-1 px-0">
                  <input type="text" className="form-control" id="available-items" name="available-items" value={availableItems}   disabled/>
                  <label className="mx-3" htmlFor="available-items">No. of Items Available</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1 input-div">
                <div className="col form-floating mt-1 px-0">
                  <input type="text" className="form-control" id="price" name="price" value={price}   disabled/>
                  <label className="mx-3" htmlFor="price">Price per item</label>
                </div>
              </div>
             
              
              <div className="row align-items-center inputBox mt-1 input-div">
                <div className="col form-floating mt-1 px-0">
                  <input type="number" className="form-control" id="purchase-item" name="purchase-item" value={purchaseItem} onChange={handlePurchaseItem} placeholder="Enter no. of Items" required/>
                  <label className="mx-3" htmlFor="purchase-item">Number of Purchase Items</label>
                </div>
              </div>
              { price && availableItems && amount ? (<div className="row align-items-center inputBox mt-1 input-div">
                <div className="col form-floating mt-1 px-0">
                  <input type="text"  className="form-control" id="total-price" name="totalPrice" value={amount}  disabled />
                  <label className="mx-3" htmlFor="totalPrice">Total Price</label>
                </div>
              </div>):(<></>)}
              
             
              
              <div className="row justify-content-center mt-1 inputBox">
                <select className="mt-1 form-select" id="ddlUserType" name="modeOfPayment" value={mode} onChange={handlePaymentMode} required >
                  <option value="0">Select mode of payment</option>
                    {modeOfPayment.map((option, index) => (
                    <option key={index} value={option.modeId}>{option.mode}</option>
                  ))}
                </select>
              </div>

              <div className="row justify-content-start mt-1">
                <div className="col d-flex justify-content-center flex-column align-items-center">
                  <button className="btn btn-primary mt-2" onClick = {(e) => submitDetails(e)}>Purchase Item</button>
                </div>
              </div>
              
          </div>
        </form>
      </div>
      </>
    );

}

export default PurchaseItem;