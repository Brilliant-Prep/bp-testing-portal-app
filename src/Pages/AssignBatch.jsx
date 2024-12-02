import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ABatchList from "../Components/Batch/ABatchList";

function AssignBatchPage() {
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <ABatchList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
} 
export default AssignBatchPage;
