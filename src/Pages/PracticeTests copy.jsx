import React, { Fragment } from "react";
import  PracticeTest from '../Components/PracticeTests/PracticeTest.js';
import SHeaderbar from "../Components/Navbar/StudentHeader.js";
import SFooterbar from "../Components/Navbar/StudentFooter.js";

function PracticeTests() {
  return (
    <div className="resources">
        <SHeaderbar />
        <div class="middle_block">
          <PracticeTest />
        </div>
        <SFooterbar />
    </div>
  );
}

export default PracticeTests; 
