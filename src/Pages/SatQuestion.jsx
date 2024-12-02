import React, { Fragment } from 'react';
import Home from '../Components/Home/Home';
import Nav from '../Components/Navbar/Unav';
import Sidebar from '../Components/Sidebar/Sidebar';
import Leftbar from '../Components/Sidebar/Leftbar';
import Headerbar from '../Components/Sidebar/Headerbar';
import Excelimport from '../Components/SatQuestion';

function SatQuestion() {
  return (
    <div>
      <div id="main-wrapper"> 
        <Excelimport /> 
      </div>
    </div>
  );
}

export default SatQuestion;
