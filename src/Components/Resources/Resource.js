import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './Resource.css'; // Import your CSS file
import "font-awesome/css/font-awesome.min.css";

const Resources = () => {
  return (
    <div>
        <h1>Resources</h1>
        <div className="mresources">
            <a href="/practice_tests">
              <div className="blocks active">              
                  <div class="icon">
                    <i class="fa fa-edit"></i>
                  </div>
                  <div className="content">
                      <h3>PRACTICE TESTS</h3>
                      <p>Exam taken as either proctored or  self-proctored throughout the course with multiple attemptes available.</p>
                      <p>1 of 8 tests completed.</p>
                      <div class="status-bar">
                        <div class="status-segment segment1"></div>
                        <div class="status-segment segment2"></div>
                      </div>
                  </div>
                  <div className="arrow-down">
                      <i class="fa fa-sort-down"></i>
                  </div>
              </div>
            </a>
            <div className="blocks">              
                <div class="icon">
                  <i class="fa fa-book"></i>
                </div>
                <div className="content">
                    <h3>Learning Modules</h3>
                    <p>Self-paced modules strategically designed to reinforce materials covered in class.</p>
                    <p>0 of 0 test completed.</p>
                    <div class="status-bar">
                        <div class="status-segment segment"></div>
                    </div>
                </div>
                <div className="arrow-down">
                    <i class="fa fa-sort-down"></i>
                </div>
            </div>
            <div className="blocks">              
                <div class="icon">
                  <i class="fa fa-book"></i>
                </div>
                <div className="content">
                    <h3>Questoin Bank</h3>
                    <p>Create your own customized tests based on the topics you want to focus on most.</p>
                    <p>0 of 0 test completed.</p>
                    <div class="status-bar">
                        <div class="status-segment segment"></div>
                    </div>
                </div>
                <div className="arrow-down">
                    <i class="fa fa-sort-down"></i>
                </div>
            </div>
            <div className="blocks">              
                <div class="icon">
                  <i class="fa fa-tasks"></i>
                </div>
                <div className="content">
                    <h3>HWS</h3>
                    <p>Create your own customized tests based on the topics you want to focus on most.</p>
                    <p>0 of 0 test completed.</p>
                    <div class="status-bar">
                      <div class="status-segment segment"></div>
                    </div>
                </div>
                <div className="arrow-down">
                    <i class="fa fa-sort-down"></i>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Resources;
