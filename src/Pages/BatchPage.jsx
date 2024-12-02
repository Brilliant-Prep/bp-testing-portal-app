import React, { Fragment } from "react";
import BatchList from "../Components/Batch/BatchList";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";

function BatchPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
           <div class="container-xl">
                <BatchList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default BatchPage; 
