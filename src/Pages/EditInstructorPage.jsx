import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditInstructor from "../Components/Instructor/EditInstructor";

function EditInstructorPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <EditInstructor />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default EditInstructorPage; 
