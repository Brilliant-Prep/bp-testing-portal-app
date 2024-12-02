import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditParent from "../Components/Parent/EditParent";

function EditParentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <EditParent />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default EditParentPage; 
