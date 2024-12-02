import React, { useEffect } from "react";

import NavBar from "../Components/Admin/NavBar";
import Table from "../Components/Admin/Table/TableData";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AdminPanel() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!cookies.token) {
  //       navigate("/admin");
  //     } else {
  //       const { data } = await axios.post("http://localhost:4000/admin_verify", {},
  //         { withCredentials: true }
  //       );
  //       if (!data.status) {
  //         removeCookie("token");
  //         navigate("/admin");
  //       } else {
  //         console.log("to /adminpanell in adminpanel.jsx")
  //         navigate("/admin_panel")
  //       }
  //     }
  //   };
  //   verifyUser();
  // },[]);

  return (
    <>
      <div id="preloader">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="3"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      </div>
      <div id="main-wrapper">
        <div className="nav-header">
          <div className="brand-logo">
            <a href="index.html">
              <b className="logo-abbr">
                <img src="images/logo.png" alt="" />{" "}
              </b>
              <span className="logo-compact">
                <img src="./images/logo-compact.png" alt="" />
              </span>
              <span className="brand-title">
                <img src="images/logo-text.png" alt="" width="150" />
              </span>
            </a>
          </div>
        </div>
        <div className="header">
          <div className="header-content clearfix">
            <div className="nav-control">
              <div className="hamburger">
                <span className="toggle-icon">
                  <i className="icon-menu"></i>
                </span>
              </div>
            </div>
            <div className="header-left">
              <div className="input-group icons">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent border-0 pr-2 pr-sm-3"
                    id="basic-addon1"
                  >
                    <i className="mdi mdi-magnify"></i>
                  </span>
                </div>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Dashboard"
                  aria-label="Search Dashboard"
                />
                <div className="drop-down animated flipInX d-md-none">
                  <form action="#">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="header-right">
              <ul className="clearfix">
                <li className="icons dropdown">
                  <a href="javascript:void(0)" data-toggle="dropdown"></a>
                  <div className="drop-down animated fadeIn dropdown-menu">
                    <div className="dropdown-content-body">
                      <ul>
                        <li className="notification-unread">
                          <a href="javascript:void()">
                            <img
                              className="float-left mr-3 avatar-img"
                              src="images/avatar/2.jpg"
                              alt=""
                            />
                            <div className="notification-content">
                              <div className="notification-heading">Adam Smith</div>
                              <div className="notification-timestamp">
                                08 Hours ago
                              </div>
                              <div className="notification-text">
                                Can you do me a favour?
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void()">
                            <img
                              className="float-left mr-3 avatar-img"
                              src="images/avatar/3.jpg"
                              alt=""
                            />
                            <div className="notification-content">
                              <div className="notification-heading">
                                Barak Obama
                              </div>
                              <div className="notification-timestamp">
                                08 Hours ago
                              </div>
                              <div className="notification-text">
                                Hi Teddy, Just wanted to let you ...
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void()">
                            <img
                              className="float-left mr-3 avatar-img"
                              src="images/avatar/4.jpg"
                              alt=""
                            />
                            <div className="notification-content">
                              <div className="notification-heading">
                                Hilari Clinton
                              </div>
                              <div className="notification-timestamp">
                                08 Hours ago
                              </div>
                              <div className="notification-text">Hello</div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="icons dropdown">
                  <div
                    className="user-img c-pointer position-relative"
                    data-toggle="dropdown"
                  >
                    <span className="activity active"></span>
                    <img
                      src="images/user/1.png"
                      height="40"
                      width="40"
                      alt=""
                    />
                  </div>
                  <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                    <div className="dropdown-content-body">
                      <ul>
                        <li>
                          <a href="page-login.html">
                            <i className="icon-key"></i> <span>Logout</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nk-sidebar">
          <div className="nk-nav-scroll">
            <ul className="metismenu" id="menu">
              <li>
                <a href="index.html" aria-expanded="false">
                  <i className="icon-speedometer menu-icon"></i>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="students.html" aria-expanded="false">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="nav-text">Students</span>
                </a>
              </li>
              <li>
                <a href="test.html" aria-expanded="false">
                  <i className="fa fa-list-alt" aria-hidden="true"></i>
                  <span className="nav-text">Tests</span>
                </a>
              </li>
              <li>
                <a aria-expanded="false">
                  <i className="fa fa-file-text" aria-hidden="true"></i>
                  <span className="nav-text">Reports</span>
                </a>
              </li>
              <li>
                <a href="javascript:void()" aria-expanded="false">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <span className="nav-text">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-body">
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="card gradient-1">
                  <div className="card-body">
                    <h3 className="card-title text-white">SAT Tests</h3>
                    <div className="d-inline-block">
                      <h2 className="text-white">156</h2>
                    </div>
                    <span className="float-right display-5 opacity-5"></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card gradient-2">
                  <div className="card-body">
                    <h3 className="card-title text-white">ACT Tests</h3>
                    <div className="d-inline-block">
                      <h2 className="text-white">656</h2>
                    </div>
                    <span className="float-right display-5 opacity-5"></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card gradient-3">
                  <div className="card-body">
                    <h3 className="card-title text-white">Active Students</h3>
                    <div className="d-inline-block">
                      <h2 className="text-white">226</h2>
                    </div>
                    <span className="float-right display-5 opacity-5"></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card gradient-4">
                  <div className="card-body">
                    <h3 className="card-title text-white">Inactive Students</h3>
                    <div className="d-inline-block">
                      <h2 className="text-white">154</h2>
                    </div>
                    <span className="float-right display-5 opacity-5"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4>Recent Students Logins</h4>
                    <div className="active-member">
                      <div className="table-responsive">
                        <table className="table table-xs mb-0">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Test</th>
                              <th>City</th>
                              <th>Status</th>
                              <th>Payment Method</th>
                              <th>Activity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/1.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />
                                Sarah Smith
                              </td>
                              <td>SAT</td>
                              <td>
                                <span>Newyork</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style={{height: '6px'}}>
                                    <div
                                      className="progress-bar bg-success"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-success  mr-2"></i>{" "}
                                Paid
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">10 sec ago</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/2.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />
                                Walter R.
                              </td>
                              <td>ACT</td>
                              <td>
                                <span>New Jersey</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style="height: 6px">
                                    <div
                                      className="progress-bar bg-success"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-success  mr-2"></i>{" "}
                                Paid
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">50 sec ago</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/3.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />
                                Andrew D.
                              </td>
                              <td>ACT</td>
                              <td>
                                <span>Newyork</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style="height: 6px">
                                    <div
                                      className="progress-bar bg-warning"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-warning  mr-2"></i>{" "}
                                Pending
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">10 sec ago</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/6.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />{" "}
                                Megan S.
                              </td>
                              <td>SAT</td>
                              <td>
                                <span>New Jersey</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style="height: 6px">
                                    <div
                                      className="progress-bar bg-success"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-success  mr-2"></i>{" "}
                                Paid
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">10 sec ago</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/4.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />{" "}
                                Doris R.
                              </td>
                              <td>SAT</td>
                              <td>
                                <span>New Jersey</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style="height: 6px">
                                    <div
                                      className="progress-bar bg-success"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-success  mr-2"></i>{" "}
                                Paid
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">10 sec ago</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./images/avatar/5.jpg"
                                  className=" rounded-circle mr-3"
                                  alt=""
                                />
                                Elizabeth W.
                              </td>
                              <td>ACT</td>
                              <td>
                                <span>New Jersey</span>
                              </td>
                              <td>
                                <div>
                                  <div className="progress" style="height: 6px">
                                    <div
                                      className="progress-bar bg-warning"
                                      style="width: 50%"
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="fa fa-circle-o text-warning  mr-2"></i>{" "}
                                Pending
                              </td>
                              <td>
                                <span>Last Login</span>
                                <span className="m-0 pl-3">10 sec ago</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-4">New Registrations</h2>

            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src="./images/users/8.jpg"
                        className="rounded-circle"
                        alt=""
                      />
                      <h5 className="mt-3 mb-1">Anuhya Adavikolanu</h5>
                      <p className="m-0">AnuhyaAdavikolanu@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src="./images/users/5.jpg"
                        className="rounded-circle"
                        alt=""
                      />
                      <h5 className="mt-3 mb-1">Hardik Acharya</h5>
                      <p className="m-0">mraval47@yahoo.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src="./images/users/7.jpg"
                        className="rounded-circle"
                        alt=""
                      />
                      <h5 className="mt-3 mb-1">Aarav Addanki</h5>
                      <p className="m-0">aaravaddanki@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src="./images/users/6.jpg"
                        className="rounded-circle"
                        alt=""
                      />
                      <h5 className="mt-3 mb-1">Aishwarya Adepu</h5>
                      <p className="m-0">aishwarya.adepu@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="social-graph-wrapper widget-facebook">
                    <span className="s-icon">
                      <i className="fa fa-facebook"></i>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-6 border-right">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">89k</h4>
                        <p className="m-0">Friends</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">119k</h4>
                        <p className="m-0">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="social-graph-wrapper widget-linkedin">
                    <span className="s-icon">
                      <i className="fa fa-linkedin"></i>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-6 border-right">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">89k</h4>
                        <p className="m-0">Friends</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">119k</h4>
                        <p className="m-0">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="social-graph-wrapper widget-googleplus">
                    <span className="s-icon">
                      <i className="fa fa-instagram"></i>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-6 border-right">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">89k</h4>
                        <p className="m-0">Friends</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">119k</h4>
                        <p className="m-0">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="social-graph-wrapper widget-twitter">
                    <span className="s-icon">
                      <i className="fa fa-twitter"></i>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-6 border-right">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">89k</h4>
                        <p className="m-0">Friends</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1">119k</h4>
                        <p className="m-0">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="copyright">
            <p>&copy;  - 2024 Brilliant Prep. All rights reserved</p>
          </div>
        </div>
      </div>
      <NavBar />
      <Table />
      {/* <ViewUsers /> */}
    </>
  );
}

export default AdminPanel;
