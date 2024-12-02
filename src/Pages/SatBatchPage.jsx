import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import SatBList from "../Components/SatTest/SatBList";

function SatBatchPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <SatBList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );

}

export default SatBatchPage;
