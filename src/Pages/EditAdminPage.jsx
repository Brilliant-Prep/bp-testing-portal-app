import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditAdmin from "../Components/Admin/EditAdmin";

function AddAdminPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <EditAdmin />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddAdminPage; 
