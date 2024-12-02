import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddParent from "../Components/Parent/AddParent";

function AddParentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <AddParent />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddParentPage; 
