import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import StudentActList from "../Components/Student/StudentSatScoreList";
function StudentSats() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <StudentActList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}
export default StudentSats;
