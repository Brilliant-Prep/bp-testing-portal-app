import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddTest from "../Components/Test/AddTest";
function AddTestPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <AddTest />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddTestPage;  
