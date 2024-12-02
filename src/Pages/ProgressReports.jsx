import React, { Fragment } from "react";
import  Resource from '../Components/Resources/Resource.js';
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ProgressView from "../Components/Account/ProgressReport.js";

function Resources() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
		<ProgressView/>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default Resources; 
