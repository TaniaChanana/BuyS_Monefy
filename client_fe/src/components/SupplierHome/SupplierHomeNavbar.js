import React, { useEffect, useState } from 'react';
// import './SupplierHomeNavbar.css';
import {Link, useLocation} from 'react-router-dom';
import Supplier from '../supplier_data/Supplier';



const SupplierHomeNavbar = () => {

  const location = useLocation();
  const {pathname} = location;
  const splitLocation = pathname.split('/');
  const [widthW, setWidthW] = useState(window.innerWidth);
  const [heightH, setHeightH] = useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidthW(window.innerWidth);
    setHeightH(window.innerHeight);
    {(widthW > 577) ? setSideNavWidth({...sideNavWidth, width: '250px'}) : setSideNavWidth({...sideNavWidth, width: '0'})}
  };

  useEffect(() => {

    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, widthW);

    const [sideNavWidth, setSideNavWidth] = useState({
        width: '250px'
    });
    const openNav = () => {
        // if(widthW < '577px')
        setSideNavWidth({...sideNavWidth, width: '250px'})
      }
      
    const closeNav = () => {
        setSideNavWidth({...sideNavWidth, width: '0'})
      }
  return (
      <header>
        <div id="mySidenav" className="sidenav" style={sideNavWidth}>
            <button className="closebtn" onClick={closeNav}>&times;</button>
            <h1 className='heading-nav'>BuySmonefy</h1>
            <Link exact to='/UserProfile' className={splitLocation[1] === 'UserProfile' ? "active" : ""}>Home</Link>
            <Link exact to='/itemDetails' className={splitLocation[1] === 'itemDetails' ? "active" : ""}>Add Item Info</Link>
            <Link exact to='' className={splitLocation[1] === 'bankBalance' ? "active" : ""}>Bank Balance</Link>
            {/* <Link to=''>Contact</Link> */}
        </div>
        <div className='navbar-m'>
            {/* <h1 className='heading-nav'>BuySmonefy</h1> */}
            <span className='span-btn' onClick={openNav}>&#9776;</span>
        </div>
      </header>
  );
}

export default SupplierHomeNavbar;
