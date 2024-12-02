import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import InstructorList from "../Components/Instructor/InstructorList";

function InstructorPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <InstructorList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default InstructorPage; 
