import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ViewStudent from "../Components/Student/ViewStudent";

function ViewStudentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <ViewStudent />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default ViewStudentPage; 
