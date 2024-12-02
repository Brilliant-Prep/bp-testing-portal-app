import React, { Fragment } from "react";
import  PracticeTest from '../Components/PracticeTests/PracticeTest.js'
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";

function PracticeTests() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
           <div class="container-xl">
                <PracticeTest />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default PracticeTests; 
