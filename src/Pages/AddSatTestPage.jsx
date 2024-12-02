import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddTest from "../Components/SatTest/AddTest";

function AddSatTestPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <AddTest />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default AddSatTestPage;
