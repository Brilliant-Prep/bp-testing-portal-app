import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import Excelimport from "../Components/Student/Excelimport";

export function StudentsImport() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <Excelimport />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default StudentsImport;