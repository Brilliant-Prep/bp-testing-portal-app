import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditBatch from "../Components/Batch/EditBatch";
function EditBatchPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <EditBatch />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}
export default EditBatchPage;
