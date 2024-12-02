import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ActBList from "../Components/Test/ActBList";

function ActBatchPage() {
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <ActBList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
} 
export default ActBatchPage;