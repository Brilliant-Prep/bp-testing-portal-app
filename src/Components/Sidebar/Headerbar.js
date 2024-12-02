import React from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Headerbar() {
  const rolename = capitalizeFirstLetter(localStorage.getItem("role"));
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

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

  return (
    <>
      <div class="horizontal-menu" style={{marginBottom:"20px"}}>
          <nav class="navbar top-navbar col-lg-12 col-12 p-0">
            <div class="container">
              <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="index.html"><img src="/images/logo-text.png" alt="logo"/></a>
                <a class="navbar-brand brand-logo-mini" href="index.html"><img src="/images/logo-text.png" alt="logo"/></a>
              </div>
              <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <ul class="navbar-nav navbar-nav-right">  
                <li class="nav-item dropdown">
                    <a class="nav-link" id="languageDropdown" href="/tests" data-toggle="dropdown">
                       ACT <i class="mdi mdi-chevron-down mdi-24px"></i> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="languageDropdown">
                      <a href="/add_test" class="dropdown-item preview-item">
                          New Exam
                      </a>
                      <a href="/tests" class="dropdown-item preview-item">
                          All Exams
                      </a>
                    </div>
                </li>  
                <li class="nav-item dropdown">
                    <a class="nav-link font-weight-medium" id="languageDropdown" href="/sattests" data-toggle="dropdown">
                      SAT <i class="mdi mdi-chevron-down mdi-24px"></i> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="languageDropdown">
                      <a href="/topics" class="dropdown-item preview-item">
                        Topic
                      </a>
                      <a href="/subtopics" class="dropdown-item preview-item">
                        Sub Topic
                      </a>
                      <a  href="/add_sattest" class="dropdown-item preview-item">
                          New Exam
                      </a>
                      <a  href="/sattests" class="dropdown-item preview-item">
                          All Exams
                      </a>
                    </div>
                </li>
                <li class="nav-item dropdown"> 
                    <a  style={{cursor:"pointer"}} class="nav-link font-weight-medium" id="languageDropdown" 
                    onClick={handleLogout} >
                      LOGOUT <i class="mdi mdi-chevron-down mdi-24px"></i> 
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" data-toggle="dropdown" id="profileDropdown-navbar">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/faces/face28.png" alt="profile"/>
                      <i class="mdi mdi-chevron-down mdi-24px"></i> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" 
                    aria-labelledby="languageDropdown">                         
                     <a href="/subtopics" class="dropdown-item preview-item">
                        <span class="profile-name font-weight-bold">
                          Logged in as {first_name} {last_name}<br/>(Role as a {rolename})
                        </span>
                     </a>
                      <a href="/subtopics" class="dropdown-item preview-item">
                         My Profile
                      </a>
                      <a  onClick={handleLogout} class="dropdown-item preview-item">
                          Logout 
                      </a>
                    </div>
                  </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                  <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/menu.svg" alt="" class=""/>
                </button>
              </div>
            </div>
          </nav>
          <nav class="bottom-navbar">
            <div class="container">
              <ul class="nav page-navigation">
                <li class="nav-item">
                  <a class="nav-link" href="/dashboard">
                    <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/home.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Dashboard</span>
                  </a>
                </li>
                {rolename === "Admin" && (
                  <li className="nav-item mega-menu">
                    <a href="/admins" className="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/ui.svg" alt="" className="nav-icon-title" />
                      <span className="menu-title">Sub Admins</span>
                    </a>
                  </li>
                )}  
                <li class="nav-item">
                  <a class="nav-link" href="/parents">
                    <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/widget.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Parents</span>
                  </a>
                </li>
                <li class="nav-item mega-menu">
                  <a href="/students" class="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/ui.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Students</span>
                    
                  </a> 
                </li> 
                <li class="nav-item">
                  <a href="/batches" class="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/form.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Batches</span>
                    </a> 
                </li>
                <li class="nav-item mega-menu">
                  <a href="#" class="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/data.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Transactions</span>
                    </a> 
                </li>
                <li class="nav-item mega-menu">
                  <a href="#" class="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/pages.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Reports</span>
                    </a> 
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                      <img src="https://demo.bootstrapdash.com/dashflat/template/images/sidebar/web.svg" alt="" class="nav-icon-title"/>
                    <span class="menu-title">Audit</span>
                    </a> 
                </li> 
              </ul>
            </div>
          </nav>
      </div>
    </>
  );
}

export default Headerbar;
