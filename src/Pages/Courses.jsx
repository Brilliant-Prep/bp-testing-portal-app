import React, { Fragment } from "react";
import  Course from '../Components/Courses/Course.js';
import SHeaderbar from "../Components/Navbar/StudentHeader.js";
import SFooterbar from "../Components/Navbar/StudentFooter.js";

function Courses() {
  return (
    <div className="resources courses">
        <SHeaderbar />
        <div class="middle_block">
          <Course />
        </div>
        <SFooterbar />
    </div>
  );
}

export default Courses; 
