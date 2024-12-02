import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Resources/Resource.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
let userid = localStorage.getItem("userid");

function ActPracticeTest() {
const [data, setData] = useState([]);
const [testscount, settestscount] = useState([]);
const [ctestscount, setctestscount] = useState([]);
const [studentname, setstudentname] = useState([]);

const urlParams = new URLSearchParams(window.location.search); 
const student_id = urlParams.get("student_id"); 
if (student_id && student_id !== "")  userid = student_id; 
useEffect(() => {  
    getPracticeTests();
  }, []); 
const getPracticeTests = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getactpracticetest/${userid}`
    );
    if (response.status === 200) {
        setData(response.data.sattestsData);
        settestscount(response.data.overallTestsCount);
        setctestscount(response.data.completedTestsCount);
        setstudentname(response.data.studentName);
    }
    };
  return (
    <div className="practice_tests">
        <div className="blocks">              
            <div class="icon">
            <i class="fa fa-edit"></i>
            </div>
            <div className="content">
                <h3>ACT PRACTICE TESTS By { studentname }</h3>
            </div>
        </div>
        <div className="blocks active">              
            <div class="icon">
            <i class="fa fa-list"></i>
            </div>
            <div className="content">
                <h3>Summary</h3>
                <p>You completed {ctestscount} of  {testscount} tests.</p>                   
            </div> 
        </div>
        <div className="middle_container">
            { data.map((item, index) => { 
            const originalDate = new Date(item.cdate);
            const originalDate2 = new Date(item.codate);
            const cdate = originalDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                }); 
            const codate = originalDate2.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    });
            return (
            <div class="test-container">
                <div class="status">
                    <span style={{ color: item.status === "Completed" ? "green" : "gray", fontWeight: "normal" }}>
                          {item.status}
                    </span><br/>
                    <span>{item.test_title}</span>
                </div>
                <div class="date">                    
                    {item.status === 'Completed' ? (
                        codate
                    ) : (
                        ""
                    )}
                </div>
                {item.status === 'Completed' ? (
                <a href={`/act/testresults/${item._id}?student_id=${userid}`} className="review-button">
                    Completed Test
                </a>
                ) : ( 
                    !student_id ? (  // Check if student_id is NOT available
                        item.tstatus === 'Start Test' ? (
                            <a href={`/acttests/${item._id}`} className="start-button">
                              Start Test
                            </a>
                          ) : (
                            <a href={`/acttests/${item._id}`} className="start-button">
                               Resume Test
                            </a>
                          )
                    ) : null 
                )}
            </div> 
            );} )}
        </div>
    </div>
  );
};

export default ActPracticeTest;