import React, { Fragment } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import StudentBList from "../Components/Student/StudentBList";
function StudentPage() { 
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <StudentBList />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
}
export default StudentPage;
