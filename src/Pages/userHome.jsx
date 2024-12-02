import React, { Fragment, useState, useEffect } from "react";
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import SUserHome from "../Components/UserHome";
import Leftbar from "../Components/Sidebar/Leftbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function UserHome() {
  const rolename = localStorage.getItem("role");
  const [parentCount, setParentCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [actCount, setActCount] = useState(0);
  const [satCount, setSatCount] = useState(0);
  useEffect(() => {
    // Fetch the student count from the backend API here
    fetch(`${process.env.REACT_APP_BASE_URL}getallcounts`)
      .then((response) => response.json())
      .then((data) => {
        setParentCount(data.parents_count);
        setStudentCount(data.students_count);
        setActCount(data.act_count);
        setSatCount(data.sat_count);
      })
      .catch((error) => {
        console.error("Error fetching student count:", error);
      });
  }, []);
  const currentDate = new Date(); // Create a new Date object to get the current date
  const formattedDate = currentDate.toDateString();
  if (rolename === "admin" || rolename === "subadmin") { 
    return (
      <div> 
      <div id="main-wrapper">
        <SHeaderbar /> 
        <div class="app-wrapper">	    
          <div class="app-content pt-3">
              <div class="container-xl">
        <div class="content-body container">
             <div class="container-fluid">
                  <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                          <div class="col-sm-9">
                            <div class="row">
                              <div class="col-sm-12 pr-0">
                                <div class="d-lg-flex">
                                  <h3 class="text-dark font-weight-bold mb-0 mr-5">Dashboard</h3> 
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-3">
                              <div class="dropdown float-right">
                                <span class="btn btn-sm bg-white">
                                  <i class="mdi mdi-calendar mr-1"></i>Today {formattedDate}
                                </span> 
                              </div>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <Link  to="/parents" class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
                            <div class="card"  style={{background:"#fbad4c"}}>
                              <div class="card-body" style={{padding:"0.15rem 1.875rem"}}>
                                <h4 class="card-title text-light">Parents</h4>
                                <div class="d-flex justify-content-between align-items-center">
                                  <h2 class="text-light font-weight-bold">{parentCount}</h2>
                                  
                                </div> 
                              </div>
                            </div>
                          </Link >
                          <Link to="/students" class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
                            <div class="card"  style={{background:"#59d05d"}}>
                              <div class="card-body" style={{padding:"0.15rem 1.875rem"}}>
                                <h4 class="card-title text-light">Students</h4>
                                <div class="d-flex justify-content-between align-items-center">
                                  <h2 class="text-light font-weight-bold">{studentCount}</h2>
                                  
                                </div> 
                              </div>
                            </div>
                          </Link>
                          <Link to="/tests" class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
                            <div class="card"  style={{background:"#ff646d"}}>
                              <div class="card-body" style={{padding:"0.15rem 1.875rem"}}>
                                <h4 class="card-title text-light">ACT Tests</h4>
                                <div class="d-flex justify-content-between align-items-center">
                                  <h2 class="text-light font-weight-bold">{actCount}</h2>
                                  
                                </div> 
                              </div>
                            </div>
                          </Link>
                          <Link to="/sattests" class="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
                            <div class="card"  style={{background:"#1D62F0"}}>
                              <div class="card-body" style={{padding:"0.15rem 1.875rem"}}>
                                <h4 class="card-title text-light">SAT Tests</h4>
                                <div class="d-flex justify-content-between align-items-center">
                                  <h2 class="text-light font-weight-bold">{satCount}</h2>
                                </div> 
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div class="row flex-grow" style={{display:"none"}}>
                          <div class="col-lg-12 col-xl-6 grid-margin-md stretch-card flex-column d-flex">
                            <div class="row flex-grow">
                              <div class="col-sm-12 grid-margin stretch-card">
                                <div class="card">
                                  <div class="card-body px-0 pb-0 border-bottom">
                                    <div class="px-4 pb-3">
                                      <h4 class="card-title ml-1">Tests overview</h4> 
                                    </div>   
                                  </div>
                                  <div class="card-body">
                                    <canvas id="resources-overview" class="mt-3"></canvas> 
                                    <div class="row mt-4">
                                      <div class="col-sm-6">
                                        <h6 class="text-dark font-weight-bold">ACT Tests Attended</h6>
                                        <h3 class="text-dark font-weight-bold">123,657</h3> 
                                      </div>
                                      <div class="col-sm-6">
                                          <h6 class="text-dark font-weight-bold">SAT Tests Attended</h6>
                                          <h3 class="text-dark font-weight-bold">100,278</h3> 
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div class="col-lg-12 col-xl-6 grid-margin stretch-card flex-column">
                            <div class="card">
                              <div class="card-body">
                                <h4 class="card-title">Sales overview</h4>
                                <p>Showing data from Jan 1st 2023 - Dec 31st 2023</p>
                                <div class="row mb-2">
                                  <div class="col-sm-6">
                                    <h6 class="text-dark font-weight-bold mt-2">ACT SALES</h6>
                                    <div class="d-flex align-items-center">
                                      <h2 class="text-dark font-weight-bold mr-1 mb-0">14,000</h2>
                                      <div class="text-success text-small d-flex align-items-center">
                                        <h6><i class="mdi mdi-chevron-up mdi-24px"></i> <span>30.68%</span></h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-sm-6">
                                    <h6 class="text-dark font-weight-bold mt-2">SAT SALES</h6>
                                    <div class="d-flex align-items-center">
                                      <h2 class="text-dark font-weight-bold mr-1 mb-0">41,160</h2>
                                      <div class="text-success text-small  d-flex align-items-center">
                                        <h6><i class="mdi mdi-chevron-up mdi-24px"></i> <span>68.22%</span></h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <canvas id="sales-overview"></canvas>
                              </div>
                            </div>
                          </div>
                        </div> 
                    </div>
                  </div>
             </div>
        </div> 
              </div>
          </div>
          <SFooterbar/>
        </div>
      </div>
    </div>
    );
  } 
}

export default UserHome;
