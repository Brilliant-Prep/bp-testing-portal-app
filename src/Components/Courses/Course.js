import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Courses = () => {
  return (
    <div>
        <h1>Courses</h1>
        <div className="middle_container">
            <div class="courses_container">
                <div class="block">
                     <div>
                        ACT
                     </div>
                     <div className="row">
                          <div>
                                Summer 2023<br/>
                                Jul - Sep
                          </div>
                          <div>
                                Live Online<br/>
                                Jul - Sep
                          </div>
                          <div>
                                Class NN*<br/>
                                Schedule
                          </div>
                     </div>
                     <div className="row">
                          <div>
                                Summer 2023<br/>
                                Jul - Sep
                          </div>
                          <div>
                                Live Online<br/>
                                Jul - Sep
                          </div>
                     </div>
                     <div className="row">
                          <div>
                               <a href="">Launch Portal</a>
                          </div>
                          <div>
                                Portal access expires on Jul 1, 2024.
                          </div>
                     </div>
                </div>
                <div class="block">
                        <i class="fa fa-check"></i>
                        <h2>Math Questions</h2>
                        <span>44 Questions</span>
                        <div class="card-body">
                            <h1 class="display-4">780</h1>
                            <p class="card-text">Out of 1400</p>
                        </div>
                        <a className="button" href="/sat/testresults/64e25a2e8957e3eeac340996">Result</a>
                </div> 
            </div>
        </div>
    </div>
  );
};

export default Courses;
