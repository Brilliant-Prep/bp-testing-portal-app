import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import ActTest from "../Components/Admin/NActTest";
import "../Components/styles.css";

function NActTestPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <ActTest />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  ); 
}

export default NActTestPage;
