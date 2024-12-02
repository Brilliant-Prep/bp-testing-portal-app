import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import AutoLogoutComponent from '../../AutoLogoutComponent';
import axios from "axios";  

function Header() {
  const rolename = capitalizeFirstLetter(localStorage.getItem("role"));
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [pstudents, setPStudents] = useState([]);

  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check conditions to determine if the user is logged in
    if (rolename && first_name && last_name) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
	  
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("userid"); 
	  navigate('/');
    }
	getParentStudents();
  }, [rolename, first_name, last_name]);
  const handleLogout = () => {
    
	localStorage.removeItem("token");
	localStorage.removeItem("role");
	localStorage.removeItem("first_name");
	localStorage.removeItem("last_name");
	localStorage.removeItem("userid"); 
    navigate("/");
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getParentStudents = async () => {
	try {
	  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}get_students/${userid}`);
	  setPStudents(response.data);
	} catch (error) {
	  console.error('Error fetching tabs data:', error);
	}
  };
  // Use location to get the current URL
  const location = useLocation();
  
   // Extract the student_id from the query parameter
   const queryParams = new URLSearchParams(location.search);
   const activeStudentId = queryParams.get('student_id');
   console.log("queryParams",queryParams);
 
  const navItems = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
    { path: "/admins", icon: "fa-user", label: "Sub Admins", role: "Admin" }, // Visible only to Admin
    { path: "/parents", icon: "fa-user-circle-o", label: "Parents" },
    { path: "/students", icon: "fa-graduation-cap", label: "Students" },
    { path: "/batches", icon: "fa-tasks", label: "Batches" },
    { path: "/tests", icon: "fa-tasks", label: "ACT" },
    { path: "/acttopics", icon: "fa-tasks", label: "Topics" },
    { path: "/actsubtopics", icon: "fa-tasks", label: "Sub Topics" },
    { path: "/sattests", icon: "fa-tasks", label: "SAT" },
    { path: "/topics", icon: "fa-tasks", label: "Topics" },
    { path: "/subtopics", icon: "fa-tasks", label: "Sub Topics" },
  ];

  return (
    <>
       <AutoLogoutComponent />
       <header class="app-header fixed-top">	   	            
        <div class="app-header-inner">  
	        <div class="container-fluid py-2">
		        <div class="app-header-content"> 
		            <div class="row justify-content-between align-items-center">
			        
				    <div class="col-auto">
					    <a id="sidepanel-toggler" class="sidepanel-toggler d-inline-block d-xl-none" href="#">
						    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"><title>Menu</title><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
					    </a>
						<h4>Welcome {rolename} ({first_name} {last_name})</h4>
				    </div>
		            
		            <div class="app-utilities col-auto">
			            <div class="app-utility-item app-user-dropdown dropdown">
				            <a class="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><img src="assets/images/graduating-student.png" alt="user profile"/></a>
				            <ul class="dropdown-menu" aria-labelledby="user-dropdown-toggle"> 
								<li>
									<a href="/settings" class="dropdown-item" style={{cursor:"pointer"}}>Profile Settings</a>
								</li>
								<li>
									<a class="dropdown-item" style={{cursor:"pointer"}} onClick={handleLogout}>Log Out</a>
								</li>
							</ul>
			            </div>
		            </div>
		        </div>
	            </div>
	        </div>
        </div>
		{rolename=='Parent' && (
			<div id="app-sidepanel" class="app-sidepanel"> 
	        <div id="sidepanel-drop" class="sidepanel-drop"></div>
	        <div class="sidepanel-inner d-flex flex-column">
		        <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
		        <div class="app-branding">
		            <a class="app-logo">
                        <img class="logo-icon" src="/logo.png" alt="logo"/>
                    </a>
	
		        </div>
		        
			    <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
				    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
					    <li class="nav-item">
					        
					        <a className={`nav-link ${!activeStudentId ? 'active' : ''}`}  href="/resources">
						        <span class="nav-icon">
									<i width="1em" height="1em" class="fa fa-home"></i>
						         </span>
		                         <span class="nav-link-text">Dashboard</span>
					        </a>
					    </li> 
						{pstudents.length > 0 ? (
							pstudents.map((student) => (
								<li className="nav-item" key={student._id}>
								<a className={`nav-link ${activeStudentId === student._id ? 'active' : ''}`} href={`/resources?student_id=${student._id}`}>
									<span className="nav-icon">
									<i className="fa fa-user"></i> {/* Icon for students */}
									</span>
									<span className="nav-link-text">{student.first_name} {student.last_name}</span> {/* Display student name */}
								</a>
								</li>
							))
							) : (
							<li className="nav-item">
								<span className="nav-link-text">No students found</span> {/* Fallback message */}
							</li>
							)}
				    </ul>
			    </nav>
			    <div class="app-sidepanel-footer">
				    <nav class="app-nav app-nav-footer">
					    <ul class="app-menu footer-menu list-unstyled">
						    <li class="nav-item"> 
								<a style={{cursor:"pointer"}} class="nav-link" onClick={handleLogout}>
							        <span class="nav-icon">
							            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	  <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
	  <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
	</svg>
							        </span>
			                        <span class="nav-link-text">Logout</span>
						        </a>
						    </li>
					    </ul>
				    </nav>
			    </div>
		       
	        </div>
	    </div>
		)}
		{rolename=='Student' && (
        <div id="app-sidepanel" class="app-sidepanel"> 
	        <div id="sidepanel-drop" class="sidepanel-drop"></div>
	        <div class="sidepanel-inner d-flex flex-column">
		        <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
		        <div class="app-branding">
		            <a class="app-logo">
					<img class="logo-icon" src="/logo.png" alt="logo"/>
                    </a>
	
		        </div>
		        
			    <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
				    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
					    <li class="nav-item">
					        
					        <a class="nav-link active" href="/resources">
						        <span class="nav-icon">
									<i width="1em" height="1em" class="fa fa-home"></i>
						         </span>
		                         <span class="nav-link-text">Dashboard</span>
					        </a>
					    </li> 
					    <li class="nav-item">
					        
					        <a class="nav-link" href="/practice_tests">
						        <span class="nav-icon">
									<i width="1em" height="1em" class="fa-solid fa fa-tasks"></i>
						         </span>
		                         <span class="nav-link-text">SAT Practice Test</span>
					        </a>
					    </li> 
						<li class="nav-item">
					        
					        <a class="nav-link" href="/act_practice_tests">
						        <span class="nav-icon">
									<i width="1em" height="1em" class="fa fa-tasks"></i>
						         </span>
		                         <span class="nav-link-text">ACT Practice Test</span>
					        </a>
					    </li>  				    
				    </ul>
			    </nav>
			    <div class="app-sidepanel-footer">
				    <nav class="app-nav app-nav-footer">
					    <ul class="app-menu footer-menu list-unstyled">
						    <li class="nav-item">
						        <a style={{cursor:"pointer"}} class="nav-link" onClick={handleLogout}>
							        <span class="nav-icon">
							            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	  <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
	  <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
	</svg>
							        </span>
			                        <span class="nav-link-text">Logout</span>
						        </a>
						    </li>
					    </ul>
				    </nav>
			    </div>
		       
	        </div>
	    </div>
		)}
		{(rolename=='Admin' ||  rolename=='Subadmin') && (
        <div id="app-sidepanel" class="app-sidepanel"> 
	        <div id="sidepanel-drop" class="sidepanel-drop"></div>
	        <div class="sidepanel-inner d-flex flex-column">
		        <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
		        <div class="app-branding">
		            <a class="app-logo">
					<img class="logo-icon" src="/logo.png" alt="logo"/>
                    </a>
	
		        </div>
		        
			    <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
				    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
					{navItems
						.filter((item) => !item.role || item.role === rolename) // Filter by role if specified
						.map((item) => (
							<li key={item.path} className="nav-item">
							<a
								className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
								href={item.path}
							>
								<span className="nav-icon">
								<i className={`fa ${item.icon}`} width="1em" height="1em"></i>
								</span>
								<span className="nav-link-text">{item.label}</span>
							</a>
							</li>
						))}			    
				    </ul>
			    </nav>
			    <div class="app-sidepanel-footer">
				    <nav class="app-nav app-nav-footer">
					    <ul class="app-menu footer-menu list-unstyled">
						    <li class="nav-item">
						        <a style={{cursor:"pointer"}} class="nav-link" onClick={handleLogout}>
							        <span class="nav-icon">
							            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	  <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
	  <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
	</svg>
							        </span>
			                        <span class="nav-link-text">Logout</span>
						        </a>
						    </li>
					    </ul>
				    </nav>
			    </div>
		       
	        </div>
	    </div>
		)}
      </header>
    </>
  );
}

export default Header;

