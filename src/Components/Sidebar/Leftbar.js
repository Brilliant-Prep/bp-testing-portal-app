import React from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import AutoLogoutComponent from '../../AutoLogoutComponent';
import { useCookies } from "react-cookie";
const role = localStorage.getItem("role");
function Leftbar() {
  const rolename = localStorage.getItem("role");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/");
  };
  return (
    <AutoLogoutComponent />
  );
  /*if (rolename === "admin") {
    return (
      <>
        <div class="nk-sidebar">
          <div class="nk-nav-scroll">
            <ul class="metismenu" id="menu">
              <li>
                <a href="/dashboard" aria-expanded="false">
                  <i class="fa fa-home menu-icon"></i>
                  <span class="nav-text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/parents" aria-expanded="false">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <span class="nav-text">Parents</span>
                </a>
              </li>
              <li>
                <a href="/students" aria-expanded="false">
                  <i class="fa fa-child" aria-hidden="true"></i>
                  <span class="nav-text">Students</span>
                </a>
              </li>
              <li>
                <a href="/batches" aria-expanded="false">
                  <i class="fa fa-tasks" aria-hidden="true"></i>
                  <span class="nav-text">Batches</span>
                </a>
              </li>
              <li>
                <a href="/tests" aria-expanded="false">
                  <i class="fa fa-check" aria-hidden="true"></i>
                  <span class="nav-text">ACT Tests</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  <span class="nav-text">SAT Tests</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-file" aria-hidden="true"></i>
                  <span class="nav-text">Reports</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-history" aria-hidden="true"></i>
                  <span class="nav-text">User History</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  <span class="nav-text">Settings</span>
                </a>
              </li>
              <li>
                <a href="/" aria-expanded="false">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <span class="nav-text">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  if (rolename === "student") {
    return (
      <>
        <div class="nk-sidebar">
          <div class="nk-nav-scroll">
            <ul class="metismenu" id="menu">
              <li>
                <a href="/dashboard" aria-expanded="false">
                  <i class="fa fa-home menu-icon"></i>
                  <span class="nav-text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-check" aria-hidden="true"></i>
                  <span class="nav-text">My Tests</span>
                </a>
              </li>  
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <span class="nav-text">My Account</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  <span class="nav-text">Settings</span>
                </a>
              </li>
              <li>
                <a href="/" aria-expanded="false">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <span class="nav-text">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  if (rolename === "parent") {
    return (
      <>
        <div class="nk-sidebar">
          <div class="nk-nav-scroll">
            <ul class="metismenu" id="menu">
              <li>
                <a href="/dashboard" aria-expanded="false">
                  <i class="fa fa-home menu-icon"></i>
                  <span class="nav-text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-check" aria-hidden="true"></i>
                  <span class="nav-text">My Children Tests</span>
                </a>
              </li>  
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <span class="nav-text">My Account</span>
                </a>
              </li>
              <li>
                <a href="#" aria-expanded="false">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  <span class="nav-text">Settings</span>
                </a>
              </li>
              <li>
                <a href="/" aria-expanded="false">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <span class="nav-text">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }*/
}

export default Leftbar;
