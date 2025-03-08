import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
function WithNavBar() {
    return (
        <div>
          <NavBar />
          <>
            <Outlet /> {/* This is where child routes will render */}
          </>
        </div>
      );
    
}

export default WithNavBar
