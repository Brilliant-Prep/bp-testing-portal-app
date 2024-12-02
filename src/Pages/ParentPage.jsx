import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ParentList from "../Components/Parent/ParentList";

function ParentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <ParentList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default ParentPage; 
