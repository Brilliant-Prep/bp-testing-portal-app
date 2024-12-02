import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddStudent from "../Components/Student/AddStudent";

function AddStudentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <AddStudent />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddStudentPage; 
