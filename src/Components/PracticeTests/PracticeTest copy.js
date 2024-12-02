import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Resources/Resource.css";
import "font-awesome/css/font-awesome.min.css";

const PracticeTest = () => {
  return (
    <div>
        <h1>Resources</h1>
        <div className="practice_tests">
            <div className="blocks">              
                <div class="icon">
                <i class="fa fa-edit"></i>
                </div>
                <div className="content">
                    <h3>PRACTICE TESTS</h3>
                    <p>Exam taken as either proctored or  self-proctored throughout the course with multiple attemptes available.</p>                   
                </div>
            </div>

            <div className="blocks active">              
                <div class="icon">
                <i class="fa fa-list"></i>
                </div>
                <div className="content">
                    <h3>Summary</h3>
                    <p>You completed 1 of  8 tests.</p>                   
                </div>
                <div>
                     <a href="" class="anchorclass"><i class="fa fa-star"></i> Score & Analysis</a>
                </div>
            </div>
        </div>
        <div className="middle_container">
            <Accordion defaultActiveKey="0" flush>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button expanded" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <i class="fa fa-file"></i>
                                <span className="sat_icon"> SAT Practice 1 - November 16, 2023</span>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                        <div class="accordion accordion-flush nested" id="nestedAccordion">
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="nested-headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#nested-collapseOne" aria-expanded="false" aria-controls="nested-collapseOne">
                                        <span class="attempts">1st Attempt</span>
                                </button>
                            </h2>
                            <div id="nested-collapseOne" class="accordion-collapse collapse" aria-labelledby="nested-headingOne" data-bs-parent="#nestedAccordion">
                                <div class="accordion-body">
                                    <div class="nav-buttons">
                                        <a href="">Completed 10/11/2023</a>
                                        <div class="downloadbutton">
                                            <a className="button" href="/send-sarreport/64e25a2e8957e3eeac340996">
                                                Download Score Report
                                            </a>
                                        </div>
                                    </div>
                                    <div class="container2">
                                        <div class="block">
                                                <i class="fa fa-check"></i>
                                                <h2>Reading & Writing</h2>
                                                <span>54 Questions</span>
                                                <div class="card-body">
                                                    <h1 class="display-4">980</h1>
                                                    <p class="card-text">Out of 1600</p>
                                                </div>
                                                <a className="button" href="/sat/testresults/64e25a2e8957e3eeac340996">Result</a>
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
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="nested-headingTwo">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#nested-collapseTwo" aria-expanded="false" aria-controls="nested-collapseTwo">                                        
                                        <span class="attempts">2nd Attempt</span>
                                </button>
                            </h2>
                            <div id="nested-collapseTwo" class="accordion-collapse collapse" aria-labelledby="nested-headingTwo" data-bs-parent="#nestedAccordion">
                                <div class="accordion-body">
                                    <div class="nav-buttons">
                                        <a href="/start/satquestion/64e25a2e8957e3eeac340996">Take Test</a>
                                    </div>
                                    <div class="container">
                                        <div class="block">
                                                <i class="fa fa-book"></i>
                                                <h2>Reading & Writing 1</h2>
                                                <span>32 M * 27 Questions</span>
                                                <button>Module A</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-book"></i>
                                                <h2>Reading & Writing 2</h2>
                                                <span>32 M * 27 Questions</span>
                                                <button>Module B</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-plus-circle"></i>
                                                <h2>Math Module 1</h2>
                                                <span>35 M * 22 Questions</span>
                                                <button>Module A</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-plus-circle"></i>
                                                <h2>Math Module 2</h2>
                                                <span>35 M * 22 Questions</span>
                                                <button>Module B</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="nested-headingThree">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#nested-collapseThree" aria-expanded="false" aria-controls="nested-collapseThree">
                                        <span class="attempts">3rd Attempt</span>
                                </button>
                                </h2>
                                <div id="nested-collapseThree" class="accordion-collapse collapse" aria-labelledby="nested-headingThree" data-bs-parent="#nestedAccordion">
                                <div class="accordion-body">
                                    <div class="nav-buttons">
                                        <a href="/start/satquestion/64e25a2e8957e3eeac340996">Take Test</a>
                                    </div>
                                    <div class="container">
                                        <div class="block">
                                                <i class="fa fa-book"></i>
                                                <h2>Reading & Writing 1</h2>
                                                <span>32 M * 27 Questions</span>
                                                <button>Module A</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-book"></i>
                                                <h2>Reading & Writing 2</h2>
                                                <span>32 M * 27 Questions</span>
                                                <button>Module B</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-plus-circle"></i>
                                                <h2>Math Module 1</h2>
                                                <span>35 M * 22 Questions</span>
                                                <button>Module A</button>
                                        </div>
                                        <div class="block">
                                                <i class="fa fa-plus-circle"></i>
                                                <h2>Math Module 2</h2>
                                                <span>35 M * 22 Questions</span>
                                                <button>Module B</button>
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
            </Accordion>
        </div>
    </div>
  );
};

export default PracticeTest;
