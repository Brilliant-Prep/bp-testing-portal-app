import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";

function errorPage() {
  return (
    <div>
        <SHeaderbar /> 
        <div class="app-wrapper">
				<div class="app-content pt-3 p-md-3 p-lg-4">
					<div class="container-xl">
						<div class="row g-4 mb-4 weekly-calendar">
							<div class="col-12 col-lg-12">
								<h5 align="center">You don't have access this page</h5>
							</div> 
						</div>  
					</div>
				</div>
				<SFooterbar />
		    </div> 
    </div>
  );
}
export default errorPage; 
