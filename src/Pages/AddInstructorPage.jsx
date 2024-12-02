import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddInstructor from "../Components/Instructor/AddInstructor";

function AddInstructorPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <AddInstructor />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddInstructorPage; 
