import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SHeaderbar() {
  const rolename = capitalizeFirstLetter(localStorage.getItem("role"));
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check conditions to determine if the user is logged in
    if (rolename && first_name && last_name) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
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

  return (
    <>
      <header>
            <div class="logo">
                <img src="/logo.png" border="0"/>
            </div>
            <nav>
                {isLoggedIn && <span class="welcome_text">Welcome {first_name} {last_name}</span>}
                {isLoggedIn && <a href="#" onClick={handleLogout}>Sign Out</a>}
                <a href="/resources">Course</a>
                <a href="#">Help</a>
                <div  class="favicon">
                    <img src="/favicon.png" border="0"/>
                </div>
            </nav>
        </header>
    </>
  );
}

export default SHeaderbar;

