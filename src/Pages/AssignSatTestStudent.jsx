import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import SatTestList from "../Components/SatTest/StudentSatTestList";

function AssignSatTestStudentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <SatTestList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AssignSatTestStudentPage; 
