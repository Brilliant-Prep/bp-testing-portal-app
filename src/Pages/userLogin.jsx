import React, { Fragment } from 'react'
import Login from '../Components/Login/Login'
import SHeaderbar from "../Components/Navbar/StudentLHeader.js";
import SFooterbar from "../Components/Navbar/StudentFooter.js";
function userLogin() {
  return (
    <div className="resources">
        <Login />
    </div>
  )
}

export default userLogin