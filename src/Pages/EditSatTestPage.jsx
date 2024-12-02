import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditTest from "../Components/SatTest/EditTest";

function EditSatTestPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <EditTest />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}

export default EditSatTestPage;
