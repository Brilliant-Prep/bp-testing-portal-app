import React, { useState } from 'react';
import './Tabs.css'; // Import your CSS file

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [innerActiveTab, setInnerActiveTab] = useState(10); // For inner tabs
  const [ractiveTab, rsetActiveTab] = useState('questions_list'); // Default active tab

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handlerTabClick = (tabId) => {
    rsetActiveTab(tabId);
  };

  const handleInnerTabClick = (index) => {
    setInnerActiveTab(index);
  };

  return (
    <div className="page-content">
      <div className="tabbed">
        <input type="radio" id="tab1" name="css-tabs" checked={activeTab === 0} />
        <input type="radio" id="tab2" name="css-tabs" checked={activeTab === 1} />
        <input type="radio" id="tab3" name="css-tabs" checked={activeTab === 2} />
        <input type="radio" id="tab4" name="css-tabs" checked={activeTab === 3} />

        <ul className="tabs">
          <li className={`tab ${activeTab === 0 ? 'active' : ''}`}>
            <label onClick={() => handleTabClick(0)}>Scores</label>
          </li>
          <li className={`tab ${activeTab === 1 ? 'active' : ''}`}>
            <label onClick={() => handleTabClick(1)}>Answer Sheet</label>
          </li>
          <li className={`tab ${activeTab === 2 ? 'active' : ''}`}>
            <label onClick={() => handleTabClick(2)}>Review</label>
          </li>
          <li className={`tab ${activeTab === 3 ? 'active' : ''}`}>
            <label onClick={() => handleTabClick(3)}>Preview PDF</label>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 0 && (
              <table class="custom-table" border="1" cellpadding="1" cellspacing="1" width="100%">
                    <thead>
                            <tr style={{verticalAlign:"top", fontWeight:"bold", borderBottom:"1px solid #666"}}>
                                <td data-tid="problem_no" style={{ flex: '1 1 0%', width:"15%" }}>
                                    Date Assigned
                                </td>
                                <td data-tid="correct_answer" style={{ flex: '1 1 0%', width:"15%"}}>
                                    Date Submitted
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', width:"15%", textAlign: 'center'}}>
                                    Test ID
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', width:"15%", textAlign: 'center'}}>
                                    Composite<br/>Score
                                </td>
                                <td data-tid="answers" style={{ flex: '2 1 0%', width:"15%", textAlign: 'center'}}>
                                    Reading & Writing
                                </td>
                                <td data-tid="answers" style={{ flex: '2 1 0%', width:"15%", textAlign: 'center'}}>
                                    Math
                                </td>
                                <td data-tid="answers" style={{ flex: '2 1 0%', width:"25%", textAlign: 'center'}}>
                                    Answers<br/>
                                    (Correct out of Total)
                                </td>
                            </tr>
                    </thead>
                    <tbody> 
                            <tr class="custom-table-row">
                                <td style={{ textAlign: 'left'}}>10/30/2023</td>
                                <td style={{ textAlign: 'left'}}>11/01/2023</td> 
                                <td style={{ textAlign: 'center'}}>2nd dSAT Practice Test</td>
                                <td style={{ textAlign: 'center'}}>400</td>
                                <td style={{ textAlign: 'center'}}>200</td>
                                <td style={{ textAlign: 'center'}}>200</td>
                                <td style={{ textAlign: 'right'}}>
                                    <div class="progress-container">
                                        <div class="progress-bar" style={{width: '50%'}}></div>
                                    </div>
                                    50 of 98
                                </td>
                            </tr> 
                    </tbody>
          </table>
          )}

          {activeTab === 1 && (
            <>
              {/* Content for Tab 2 */}
              <input type="radio" id="tab10" name="css-tabs" checked={innerActiveTab === 10} />
              <input type="radio" id="tab11" name="css-tabs" checked={innerActiveTab === 11} />
              <input type="radio" id="tab21" name="css-tabs" checked={innerActiveTab === 21} />
              <input type="radio" id="tab31" name="css-tabs" checked={innerActiveTab === 31} />

              <ul className="tabs">
                <li className={`tab ${innerActiveTab === 10 ? 'active' : ''}`}>
                  <label onClick={() => handleInnerTabClick(10)}>Reading & Writing</label>
                </li>
                <li className={`tab ${innerActiveTab === 11 ? 'active' : ''}`}>
                  <label onClick={() => handleInnerTabClick(11)}>Math</label>
                </li>
                <li className={`tab ${innerActiveTab === 21 ? 'active' : ''}`}>
                  <label onClick={() => handleInnerTabClick(21)}>Reading & Writing</label>
                </li>
                <li className={`tab ${innerActiveTab === 31 ? 'active' : ''}`}>
                  <label onClick={() => handleInnerTabClick(31)}>Math</label>
                </li>
              </ul>

              <div className="tab-content">
                {innerActiveTab === 10 && (
                  <>
                    <div style={{ height: '200px', overflow: 'auto' }}>
                        <table class="custom-table">
                            <thead>
                            <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                <td data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '50px', cursor: 'pointer' }}>
                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                    <div>No.</div>
                                </div>
                                </td>
                                <td data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '80px', cursor: 'pointer'}}>
                                    <div class="centered-row row-center-items" style={{ position: "relative" }}>
                                        <div>
                                            <div>Correct</div>
                                            <div>Answer</div>
                                        </div>
                                    </div>
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '230px', cursor: 'pointer', paddingRight: '30px'}}>
                                    Answers
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '680px', cursor: 'pointer', textAlign: 'center'}}>
                                    Category
                                </td>
                                <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                    Action
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.from({ length: 27 }, (_, index) => (
                                <tr key={index} class="custom-table-row">
                                    <td>{index+1}</td>
                                    <td><div class="pill border-pill green"> A</div></td>
                                    <td className='innertabs'>
                                        <div className="problem-answer-cell">
                                            <div className="problem-answers-container">
                                                <div class="answer-bubble correct">
                                                    <div>A</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>B</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>C</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>D</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center'}}>Sentence Completion</td>
                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    </>
                )}

                {innerActiveTab === 11 && (
                   <>
                   <div style={{ height: '200px', overflow: 'auto' }}>
                       <table class="custom-table">
                           <thead>
                           <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                               <td data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '50px', cursor: 'pointer' }}>
                               <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                   <div>No.</div>
                               </div>
                               </td>
                               <td data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '80px', cursor: 'pointer'}}>
                                   <div class="centered-row row-center-items" style={{ position: "relative" }}>
                                       <div>
                                           <div>Correct</div>
                                           <div>Answer</div>
                                       </div>
                                   </div>
                               </td>
                               <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '230px', cursor: 'pointer', paddingRight: '30px'}}>
                                   Answers
                               </td>
                               <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '680px', cursor: 'pointer', textAlign: 'center'}}>
                                   Category
                               </td>
                               <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                   Action
                               </td>
                           </tr>
                           </thead>
                           <tbody>
                             {Array.from({ length: 22 }, (_, index) => (
                                 <tr key={index} class="custom-table-row">
                                     <td>{index+1}</td>
                                     <td><div class="pill border-pill green"> A</div></td>
                                     <td className='innertabs'>
                                         <div className="problem-answer-cell">
                                               <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                   {index === 6 || index === 7 ? (
                                                       <div className="form-input form-date-picker">
                                                       <input type="text" id="custom-form-input" maxLength="4" value="" />
                                                       </div>
                                                   ) : (
                                                       <div className="problem-answers-container">
                                                       <div className="answer-bubble correct">
                                                           <div>A</div>
                                                       </div>
                                                       <div className="answer-bubble">
                                                           <div>B</div>
                                                       </div>
                                                       <div className="answer-bubble">
                                                           <div>C</div>
                                                       </div>
                                                       <div className="answer-bubble">
                                                           <div>D</div>
                                                       </div>
                                                       </div>
                                                   )}
                                               </div>
                                         </div>
                                     </td>
                                     <td style={{ textAlign: 'center'}}>Sentence Completion</td>
                                     <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                 </tr>
                             ))}
                           </tbody>
                       </table>
                   </div>
                   </>
                )}

                {innerActiveTab === 21 && (
                  <>
                  <div style={{ height: '200px', overflow: 'auto' }}>
                      <table class="custom-table">
                          <thead>
                          <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                              <td data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '50px', cursor: 'pointer' }}>
                              <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                  <div>No.</div>
                              </div>
                              </td>
                              <td data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '80px', cursor: 'pointer'}}>
                                  <div class="centered-row row-center-items" style={{ position: "relative" }}>
                                      <div>
                                          <div>Correct</div>
                                          <div>Answer</div>
                                      </div>
                                  </div>
                              </td>
                              <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '230px', cursor: 'pointer', paddingRight: '30px'}}>
                                  Answers
                              </td>
                              <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '680px', cursor: 'pointer', textAlign: 'center'}}>
                                  Category
                              </td>
                              <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                  Action
                              </td>
                          </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 27 }, (_, index) => (
                                <tr key={index} class="custom-table-row">
                                    <td>{index+1}</td>
                                    <td><div class="pill border-pill green"> A</div></td>
                                    <td className='innertabs'>
                                        <div className="problem-answer-cell">
                                            <div className="problem-answers-container">
                                                <div class="answer-bubble correct">
                                                    <div>A</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>B</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>C</div>
                                                </div>
                                                <div class="answer-bubble">
                                                    <div>D</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center'}}>Sentence Completion</td>
                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                </tr>
                            ))}
                          </tbody>
                      </table>
                  </div>
                  </>
                )}

                {innerActiveTab === 31 && (
                    <>
                    <div style={{ height: '200px', overflow: 'auto' }}>
                        <table class="custom-table">
                            <thead>
                            <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                <td data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '50px', cursor: 'pointer' }}>
                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                    <div>No.</div>
                                </div>
                                </td>
                                <td data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '80px', cursor: 'pointer'}}>
                                    <div class="centered-row row-center-items" style={{ position: "relative" }}>
                                        <div>
                                            <div>Correct</div>
                                            <div>Answer</div>
                                        </div>
                                    </div>
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '230px', cursor: 'pointer', paddingRight: '30px'}}>
                                    Answers
                                </td>
                                <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '680px', cursor: 'pointer', textAlign: 'center'}}>
                                    Category
                                </td>
                                <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                    Action
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                              {Array.from({ length: 22 }, (_, index) => (
                                  <tr key={index} class="custom-table-row">
                                      <td>{index+1}</td>
                                      <td><div class="pill border-pill green"> A</div></td>
                                      <td className='innertabs'>
                                          <div className="problem-answer-cell">
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    {index === 8 || index === 9 ? (
                                                        <div className="form-input form-date-picker">
                                                        <input type="text" id="custom-form-input" maxLength="4" value="" />
                                                        </div>
                                                    ) : (
                                                        <div className="problem-answers-container">
                                                        <div className="answer-bubble correct">
                                                            <div>A</div>
                                                        </div>
                                                        <div className="answer-bubble">
                                                            <div>B</div>
                                                        </div>
                                                        <div className="answer-bubble">
                                                            <div>C</div>
                                                        </div>
                                                        <div className="answer-bubble">
                                                            <div>D</div>
                                                        </div>
                                                        </div>
                                                    )}
                                                </div>
                                          </div>
                                      </td>
                                      <td style={{ textAlign: 'center'}}>Sentence Completion</td>
                                      <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
                    </>
                )}
              </div>
            </>
          )}

          {activeTab === 2 && (
             <>
                 <div style={{ height: '400px', overflow: 'auto' }}>
                        <div className="quiz-reports-tab-wrapper">
                            <div className="quiz-reports-nav" quiz_nid="434200" quiz_title="DSAT Test 2: Reading & Writing - Mod 2E">
                                <ul style={{paddingLeft:"0px"}}>
                                    <li id="questions_list">
                                        <a  className={ractiveTab === 'questions_list' ? 'active' : ''} onClick={() => handlerTabClick('questions_list')}
                                        >
                                            Questions List
                                        </a>
                                    </li>
                                    <li id="topic_wise">
                                        <a  className={ractiveTab === 'topic_wise' ? 'active' : ''} onClick={() => handlerTabClick('topic_wise')}
                                        >
                                            Tag Wise Report
                                        </a>
                                    </li>
                                    <li id="attempt_details" >
                                        <a className={ractiveTab === 'attempt_details' ? 'active' : ''} onClick={() => handlerTabClick('attempt_details')}
                                        >
                                            Attempt Details
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <br clear="all" />
                            <div className="quiz-reports-tab">
                                {ractiveTab === 'questions_list' && (
                                    <div className="score_card">
                                    <div className="report-questions">
                                        <table>
                                        <thead>
                                            <tr>
                                            <th width="5%" align="center">
                                                Sl. No
                                            </th>
                                            <th width="11%" align="center">
                                                Question Status
                                            </th>
                                            <th width="11%" align="center">
                                                Your Time Taken
                                            </th>
                                            <th width="11%" align="center">
                                                PAR Time
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Render table rows dynamically */}
                                            {Array.from({ length: 27 }, (_, index) => (
                                            <tr key={index}>
                                                <td align="center">{index + 1}</td>
                                                <td align="center">
                                                <div className="">-</div>
                                                </td>
                                                <td align="center">0</td>
                                                <td align="center">4</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                    </div>
                                )}
                                {ractiveTab === 'topic_wise' && (
                                     <div class="quiz-reports-tab">        
                                          <div class="score_card">
                                                <div class="report-questions">
                                                    <table>
                                                        <tbody>
                                                                <tr>
                                                                    <th width="11%" align="center">Subject Name</th>
                                                                    <th width="17%" align="center">Tag</th>
                                                                    <th width="9%" align="center">Total Questions</th>
                                                                    <th width="15%" align="center">Correct Questions</th>
                                                                    <th width="16%" align="center">Incorrect Questions</th>
                                                                    <th width="16%" align="center">Skipped Questions</th>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center">SAT Reading and Writing</td>
                                                                    <td align="center">VIC</td>
                                                                    <td align="center">7</td>
                                                                    <td align="center">0</td>
                                                                    <td align="center">0</td>
                                                                    <td align="center">7</td>
                                                                </tr>
                                                            <tr>
                                                                <td align="center"></td>
                                                                <td align="center">C&amp;S</td>
                                                                <td align="center">8</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                <td align="center">8</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"></td>
                                                                <td align="center">I&amp;I</td>
                                                                <td align="center">7</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                <td align="center">7</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"></td>
                                                                <td align="center">SEC</td>
                                                                <td align="center">8</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">8</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">EoI</td>
                                                                <td align="center">4</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">4</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">C/C</td>
                                                                <td align="center">1</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">1</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Det</td>
                                                                <td align="center">1</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">1</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Arg</td>
                                                                <td align="center">6</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">6</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Punc</td>
                                                                <td align="center">1</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">1</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Vs</td>
                                                                <td align="center">7</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">7</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Trs</td>
                                                                <td align="center">4</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">4</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">SC</td>
                                                                <td align="center">4</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">4</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">Conc</td>
                                                                <td align="center">2</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">2</td>
                                                            </tr>
                                                                    <tr>
                                                                <td align="center"></td>
                                                                <td align="center">C/G/T</td>
                                                                <td align="center">1</td>
                                                                <td align="center">0</td>
                                                                <td align="center">0</td>
                                                                                <td align="center">1</td>
                                                            </tr>
                                                        
                                                        </tbody>
                                                        </table>
                                                </div>
                                          </div>
                                     </div>
                                )}
                                {ractiveTab === 'attempt_details' && (
                                    <>
                                        <div class="quiz-reports-tab">        
                                            <div>    
                                                <h2 class="feedback_title_h">Answer Review</h2> 
                                                <div id="color_legend_details">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td class="legend_format"><p id="user_attempt_color"></p><p>Your response</p></td>
                                                                <td class="legend_format"><p id="wrong_attempt_color"></p><p>Your response - Wrong</p></td>
                                                                <td class="legend_format"><p id="correct_attempt_color"></p><p>Your response - Correct</p></td>
                                                                <td class="legend_format"><p id="correct_answer_color"></p><p>Correct answer</p></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="quiz-report">
                                                    <div class="quiz-report-question  434232" nid="434232" type="multichoice">
                                                        <div class="quiz_result_section_wrapper  quiz-report-question-head" >
                                                        <div class="quiz_result_section_desc">
                                                            <p>December 2, 1989 saw a conflict-free conclusion to the over 21-year Communist insurgency in Malaysia. The more than two decades-long conflict between the Malayan Communist Party (MCP) and the Malaysian federal security forces lasted from 1968 until 1989, finally ____ with a peace agreement called the Peace Agreement of Hat Yai and the disbandment of the MCP.</p>
                                                        </div>
                                                        </div>
                                                        <div class="quiz-report-question-title">Q<span id="qn_no">1</span>.</div>
                                                        <div class="quiz-report-question-head">
                                                            <p>Which choice completes the text with the most logical and precise word or phrase?</p>
                                                        </div>
                                                    </div> 
                                                    <div class="quiz-report-option"><strong>Options: </strong></div>
                                                    <div class="response_report_form 434232" user_answers="">
                                                            <div id="multichoice-report-form-434232">
                                                                <table>
                                                                    <tbody>
                                                                        <tr class="odd"><td width="50" rowspan="1" class="selector-td"></td><td><p>failing</p>
                                                                        </td> </tr>
                                                                        <tr class="even"><td  rowspan="1" class="selector-td"></td><td><p>developing</p>
                                                                        </td> </tr>
                                                                        <tr class="odd"><td rowspan="1" class="selector-td"></td><td><p>ceasing</p>
                                                                        </td> </tr>
                                                                        <tr class="even"><td  rowspan="1" class="selector-td"></td><td><p>healing</p>
                                                                        </td> 
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div><br/>
                                                            <div class="check_answer_attempted" nid="434232">
                                                                <input type="button" id="check_answer_value_434232" nid="434232" stas="q-wrong" visible="false" question_type="multichoice" is_correct="0" is_skipped="1" class="button" value="Check the answer"/>
                                                            </div>
                                                    </div> 
                                                </div>   
                                            </div> 
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                   </div>
            </>
          )}

          {activeTab === 3 && (
            <>
            <h4>Preview PDF</h4>
            <p>
              Our conversations with other pilgrims have led to an awakening of pseudo-astral consciousness. Who are we?
              Where on the great myth will we be re-energized? We are at a crossroads of complexity and stagnation.
            </p>
            <p>
              Eons from now, we dreamers will exist like never before as we are aligned by the cosmos. We are being called
              to explore the stratosphere itself as an interface between nature and complexity. We must learn how to lead
              infinite lives in the face of bondage.
            </p>
            <p>
              Generated by the <a href="http://sebpearce.com/bullshit/">New Age Bullshit Generator</a>
            </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const cellStyle = {
border: '1px solid #000',
padding: '8px',
textAlign: 'center',
};

const labelStyle = {
display: 'block',
margin: '4px 0',
};
export default Tabs;
