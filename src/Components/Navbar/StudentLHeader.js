import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SHeaderbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return (
    <>
      <header>
            <div class="logo">
                <img src="/logo.png" border="0"/>
            </div>
            <nav>
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

