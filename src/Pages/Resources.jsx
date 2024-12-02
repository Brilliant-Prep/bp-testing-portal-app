import React, { useState, useEffect } from "react";
import  Resource from '../Components/Resources/Resource.js';
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import axios from "axios";

function Resources() {
  const rolename = localStorage.getItem("role");
  const urlParams = new URLSearchParams(window.location.search); 
  const student_id = urlParams.get("student_id");  

  
const [studentname, setstudentname] = useState([]);

useEffect(() => {
    if (student_id) { // Only call if student_id exists
      getSingleUser(student_id);
    }
  }, [student_id]); // Add student_id as a dependency

  const getSingleUser = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit/${id}`
    );
    if (response.status === 200) {
		setstudentname({
			first_name: response.data.first_name,
			last_name: response.data.last_name
		});
	}
  };     



  return (
    <div> 
    <SHeaderbar/>
	{rolename === 'parent' && !student_id ? (
	<>
		<div class="app-wrapper">
				<div class="app-content pt-3 p-md-3 p-lg-4">
					<div class="container-xl">
						<div class="row g-4 mb-4 weekly-calendar">
							<div class="col-12 col-lg-9">
								<h5>Parent Dashboard</h5>
							</div> 
						</div> 
					</div>
				</div>
				<SFooterbar />
		</div>
	</>
	) : null}
	{rolename === 'student' || student_id ? (
    <div class="app-wrapper">	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
		    <div class="container-xl"> 
			    <div class="row g-4 mb-4" onclick="window.location.href='/practice_tests';">  
				    <div class="col-12 col-lg-4">
					    <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
						    <div class="app-card-header p-3 border-bottom-0">
						        <div class="row align-items-center gx-3">
							        <div class="col-auto">
								        <div class="app-icon-holder">
											  <i width="1em" height="1em" class="fa fa-tasks"></i>
									    </div>
						                
							        </div>
							        <div class="col-auto">
								        <h4 class="app-card-title">SAT Practice Test</h4>
							        </div>
						        </div>
						    </div>
						    <div class="app-card-body px-4">
							    <div class="intro"></div>
						    </div>
						    <div class="app-card-footer p-4 mt-auto">
								<a 
								className="btn app-btn-secondary" 
								style={{
									fontSize: '18px',
									fontWeight: 'bold',
									color: '#de3c7d'
								  }}
								href={student_id ? `/practice_tests?student_id=${student_id}` : '/practice_tests'}>
								{student_id 
									? `Click here to view ${studentname.first_name} ${studentname.last_name}'s practice SAT scores` 
									: `Click here to take a practice SAT`}
								</a>

						    </div>
						</div>
				    </div>  
				    <div class="col-12 col-lg-4" onclick="window.location.href='/act_practice_tests';">
					    <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
						    <div class="app-card-header p-3 border-bottom-0">
						        <div class="row align-items-center gx-3">
							        <div class="col-auto">
								        <div class="app-icon-holder">
											<i width="1em" height="1em" class="fa fa-tasks"></i>
									    </div>
						                
							        </div>
							        <div class="col-auto">
								        <h4 class="app-card-title">ACT Practice Test</h4>
							        </div>
						        </div>
						    </div>
						    <div class="app-card-body px-4">
							    
							    <div class="intro"></div>
						    </div>
						    <div class="app-card-footer p-4 mt-auto"> 
									<a 
									className="btn app-btn-secondary" 
									style={{
										fontSize: '18px',
										fontWeight: 'bold',
										color: '#de3c7d'
									  }}
									href={student_id ? `/act_practice_tests?student_id=${student_id}` : '/act_practice_tests'}>
									{student_id ? `Click here to view ${studentname.first_name} ${studentname.last_name}'s practice ACT scores`  : "Click here to take a practice ACT"}
									</a>
						    </div>
						</div>
				    </div>  
			    </div> 
		    </div>
	    </div>
	    
	    <SFooterbar/>
    </div>
	) : null}
    </div>
  );
}

export default Resources; 
