import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

function UserHome() {
  return (
    <div>
    <div id="main-wrapper">
      <div class="content-body container">
        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-lg-3 col-sm-6">
              <div class="card gradient-1">
                <div class="card-body">
                  <h3 class="card-title text-white">Total ACT Tests</h3>
                  <div class="d-inline-block">
                    <h2 class="text-white">3</h2>
                  </div>
                  <span class="float-right display-5 opacity-5"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="card gradient-2">
                <div class="card-body">
                  <h3 class="card-title text-white">Total SAT Tests</h3>
                  <div class="d-inline-block">
                    <h2 class="text-white">1</h2>
                  </div>
                  <span class="float-right display-5 opacity-5"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="card gradient-3">
                <div class="card-body">
                  <h3 class="card-title text-white">Completed ACT</h3>
                  <div class="d-inline-block">
                    <h2 class="text-white">0</h2>
                  </div>
                  <span class="float-right display-5 opacity-5"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="card gradient-4">
                <div class="card-body">
                  <h3 class="card-title text-white">Completed SAT</h3>
                  <div class="d-inline-block">
                    <h2 class="text-white">0</h2>
                  </div>
                  <span class="float-right display-5 opacity-5"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
          <div class="copyright container">
                <p>&copy;  - 2024 Brilliant Prep. All rights reserved</p>
          </div>
      </div>
    </div>
  </div>
  );
}
export default UserHome;