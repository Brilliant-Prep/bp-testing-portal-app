import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import Content from '../Components/Sidebar/SatContent';

function AddBatchPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <Content />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}

export default AddBatchPage;
