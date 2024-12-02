import React, { Fragment } from "react";
import AddBatch from "../Components/Batch/AddBatch";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";

function AddBatchPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
           <div class="container-xl">
                <AddBatch />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddBatchPage; 
