import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Page2 = () => {
    useEffect(() => {
        gettests()  
    }, []);
    const { id } = useParams();
    const userId = localStorage.getItem("userid");
    const [data, setData] = useState([]);
  const numbers = Array.from({ length: 27 }, (_, index) => index + 1);
  return (
    
    <div style={{paddingTop:"20px"}}>
      <div class="card-body pdf_score"> 
          <div class="logo">
              <img src="/images/logo.png" border="0"/>
          </div>
          <div class="headding">
                <h2>Section Summary</h2>
                <h5>Reading & Writing</h5>
          </div>
          <div class="row"> 
                <div class="col_address">
                    <div><span style={{width:"75px"}}>Student</span><span>:</span> Sunitha.Y</div>
                    <div><span style={{width:"75px"}}>Student ID</span><span>:</span> 123456</div>
                </div>
                <div class="col_address right">
                    <div><span style={{width:"75px"}}>Tested On</span><span>:</span> November 22, 2022</div>
                    <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT1</div>
                </div>
          </div>

          <div class="row d-flex justify-content-center mt-100" style={{paddingTop:"20px"}}>
              <div class="col-md-12">
                  <div className="sections-score-wrapper" style={{ display: 'flex' }}> 
                        <div class="page2_block" style={{display:"block",lineHeight:"30px"}}>
                            Total Score<br/>
                            <div class="total_score">390</div>
                        </div>
                        <div class="page2_block">
                            <div class="col-left">
                                <span class="satgreen">Correct</span><br/>
                                <span class="satred">Incorrect</span><br/>
                                <span class="satorange">Ommitted</span><br/>
                            </div>
                            <div class="col-right">
                                <span class="satgreen">50</span><br/>
                                <span class="satred">2</span><br/>
                                <span class="satorange">0</span><br/>
                            </div>
                        </div>
                        <div class="page2_block">
                            <div class="col-left">
                                Raw Points<br/>
                                % Correct<br/>
                            </div>
                            <div class="col-right">
                                52<br/>
                                96%<br/>
                            </div>
                        </div>
                  </div>
              </div>
          </div> 
          <div class="row">
                <div class="page2_answers">
                    <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                            <tr>
                                <th class="ans_titles">
                                    Question #
                                </th>
                                <th class="ans_titles">
                                    Your Answer
                                </th>
                                <th class="ans_titles">
                                    Correct Answer
                                </th>
                                <th class="ans_titles">
                                    Order of Difficulty
                                </th>
                                <th class="ans_titles">
                                    Types of Questions
                                </th>
                            </tr>
                            <tr>
                                <td colSpan="5" class="module_title">Module 1</td>
                            </tr>
                            {numbers.map((number) => (
                            <tr>
                                <td>
                                {number}
                                </td>
                                <td bgcolor="#EAE8E8">
                                    A
                                </td>
                                <td>
                                    A
                                </td>
                                <td bgcolor="#EAE8E8">
                                    m
                                </td>
                                <td>
                                    SUP
                                </td>
                            </tr>))} 
                    </table>
                </div>
                <div class="page2_answers" style={{marginRight:"0px"}}>
                    <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                            <tr>
                                <th class="ans_titles">
                                    Question #
                                </th>
                                <th class="ans_titles">
                                    Your Answer
                                </th>
                                <th class="ans_titles">
                                    Correct Answer
                                </th>
                                <th class="ans_titles">
                                    Order of Difficulty
                                </th>
                                <th class="ans_titles">
                                    Types of Questions
                                </th>
                            </tr>
                            <tr>
                                <td colSpan="5" class="module_title">Module 2</td>
                            </tr>
                            {numbers.map((number) => (
                            <tr>
                                <td>
                                {number}
                                </td>
                                <td bgcolor="#EAE8E8">
                                    A
                                </td>
                                <td>
                                    A
                                </td>
                                <td bgcolor="#EAE8E8">
                                    m
                                </td>
                                <td>
                                    SUP
                                </td>
                            </tr>))}
                    </table>
                </div>
          </div>
          <div class="satfooter">
              <div class="left">
                    &copy; 2023 This content is protected by federal copyright laws, which prohibit its reproduction, whether in entirety or in part, without the
  explicit written consent of Brilliant Education Group, LLC.
              </div>
              <div class="right">
                    Page 2
              </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
