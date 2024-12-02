import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ActTestList from "../Components/Test/StudentActTestList.js";

function AssignActTestStudentPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <ActTestList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AssignActTestStudentPage; 
