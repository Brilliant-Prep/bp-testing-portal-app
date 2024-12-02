import React, { Fragment } from "react";
import { Link, useNavigate } from"react-router-dom";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AccountView from '../Components/Account/profile'; 
function Account() {
    return ( 
      <div>
          <SHeaderbar />
          <div class="app-wrapper">	    
              <div class="app-content pt-3 p-md-3 p-lg-4">
                <div class="container-xl"><AccountView /></div>
              </div>
              <SFooterbar/>
          </div>
      </div>
    );
  }
  
export default Account;
