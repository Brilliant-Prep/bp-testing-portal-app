import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Resources/Resource.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
const userid = localStorage.getItem("userid");

function PracticeTest() {
const [data, setData] = useState([]);
const [english_count, setenglishcount] = useState([]);
const [math_count, setmathcount] = useState([]);
const [reading_count, setreadingcount] = useState([]);
const [science_count, setsciencecount] = useState([]);
const { id } = useParams();

useEffect(() => {  
    getPracticeTests();
  }, []); 
  const getPracticeTests = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}actsectionstatus/${userid}/${id}`
    );
      if (response.status === 200) {
          setenglishcount(response.data.english_count);         
          setmathcount(response.data.math_count);        
          setreadingcount(response.data.reading_count);        
          setsciencecount(response.data.science_count);
      }
    };
  return (
    <div className="practice_tests"> 
                      <div className="blocks active">              
                          <div class="icon">
                              <i class="fa fa-list"></i>
                          </div>
                          <div className="content">
                              <h3>Summary</h3>
                              <p>You completed 0 of  1 tests.</p>                   
                          </div>
                          <div>
                              
                          </div>
                      </div> 
                      <div class="container-xl col-lg-10"> 
                          <div class="row g-4 mb-4">
                              <div class="col-12 col-lg-6">
                                <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
                                  <div class="app-card-header p-3 border-bottom-0">
                                    <div class="row align-items-center gx-3">
                                      <div class="col-auto">
                                        <div class="app-icon-holder">
                                             <i className="fa fa-book-open"></i>
                                        </div>

                                      </div>
                                      <div class="col-auto">
                                        <h4 class="app-card-title">English</h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="app-card-body px-4">

                                    <div class="intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet eros vel diam semper mollis.</div>
                                  </div>
                                  
                                  <div class="app-card-footer p-4 mt-auto">
                                    
                                    {english_count === 1 ? (
                                        <a href="#" className="actreview-button">
                                            Completed Test Section
                                        </a>
                                        
                                        ) : (
                                            <a href={`/acttests/${id}/section/1`} className="actstart-button">
                                                Begin Test Section
                                            </a>
                                        )}
                                  </div>
                                </div>
                              </div>
                              <div className={`col-12 col-lg-6 ${english_count === 1 ? '' : 'divdisabled'}`}>
                                <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
                                  <div class="app-card-header p-3 border-bottom-0">
                                    <div class="row align-items-center gx-3">
                                      <div class="col-auto">
                                        <div class="app-icon-holder">
                                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-code-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path fill-rule="evenodd" d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                                          </svg>
                                        </div>

                                      </div>
                                      <div class="col-auto">
                                        <h4 class="app-card-title">Math</h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="app-card-body px-4">

                                    <div class="intro">Pellentesque varius, elit vel volutpat sollicitudin, lacus quam efficitur augue</div>
                                  </div>
                                  <div class="app-card-footer p-4 mt-auto">
                                      {math_count === 1 ? (
                                        <a href="#"  className="actreview-button">
                                            Completed Test Section
                                        </a>
                                        
                                        ) : (
                                            <a href={`/acttests/${id}/section/2`} className="actstart-button">
                                                Begin Test Section
                                            </a>
                                        )}
                                  </div>
                                </div>
                              </div> 
                          </div>
                          <div class="row g-4 mb-4">
                              <div className={`col-12 col-lg-6 ${math_count === 1 ? '' : 'divdisabled'}`}>
                                <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
                                  <div class="app-card-header p-3 border-bottom-0">
                                    <div class="row align-items-center gx-3">
                                      <div class="col-auto">
                                        <div class="app-icon-holder">
                                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                            <path fill-rule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                                          </svg>
                                        </div>

                                      </div>
                                      <div class="col-auto">
                                        <h4 class="app-card-title">Reading</h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="app-card-body px-4">

                                    <div class="intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet eros vel diam semper mollis.</div>
                                  </div>
                                  <div class="app-card-footer p-4 mt-auto">
                                        {reading_count === 1 ? (
                                            <a href="#"  className="actreview-button">
                                                Completed Test Section
                                            </a>
                                        
                                        ) : (
                                            <a href={`/acttests/${id}/section/3`} className="actstart-button">
                                                Begin Test Section
                                            </a>
                                        )}
                                  </div>
                                </div>
                              </div>
                              <div className={`col-12 col-lg-6 ${reading_count === 1 ? '' : 'divdisabled'}`}>
                                <div class="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
                                  <div class="app-card-header p-3 border-bottom-0">
                                    <div class="row align-items-center gx-3">
                                      <div class="col-auto">
                                        <div class="app-icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="book-icon" fill="#000000" >
                                          <path d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16c0-6.4-3.2-12.8-9.6-19.2-3.2-16-3.2-60.8 0-73.6 6.4-3.2 9.6-9.6 9.6-19.2zM380.8 448H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8v64z"></path>
                                          </svg>
                                        </div>

                                      </div>
                                      <div class="col-auto">
                                        <h4 class="app-card-title">Science</h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="app-card-body px-4">

                                    <div class="intro">Pellentesque varius, elit vel volutpat sollicitudin, lacus quam efficitur augue</div>
                                  </div>
                                  <div class="app-card-footer p-4 mt-auto">
                                        {science_count === 1 ? (
                                            <a href="#" className="actreview-button">
                                                Completed Test Section
                                            </a>
                                        
                                        ) : (
                                            <a href={`/acttests/${id}/section/4`} className="actstart-button">
                                                Begin Test Section
                                            </a>
                                        )}
                                  </div>
                                </div>
                              </div> 
                          </div>
                      </div>
              </div> 
  );
};

export default PracticeTest;
