import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditStudent from "../Components/Student/EditStudent";

function EditStudentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <EditStudent />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default EditStudentPage; 
