import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import TestList from "../Components/SatTest/TestList";

function SatTestPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <TestList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}
export default SatTestPage;
