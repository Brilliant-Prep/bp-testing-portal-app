import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";



function NActTest() { 
  const [activeTab, setActiveTab] = useState(0);
  const [testRecords, setTestRecords] = useState([]);
  const { id } = useParams();  
  
  const initData = (id) => {
    if (id) { 
      getTestRecords(); 
    }
  }

  useEffect(() => {
    initData(id);
  }, [id]); 

  const getTestRecords = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getActtest?test_id=${id}`, {
      headers: {
        token: typeof windows !== "undefined" ? localStorage.getItem('token') : ""
      }
    }
    );
    if (response.status === 200) {
      setTestRecords(response.data.data); 
    }
  }; 
     
  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="card">
            <div class="card-body">
              <div class="col-12">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title">Act Test Key</h4>
                  </div>
                  <div class="col-6 text-right">
                    <Link to={`/tests`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to Act Tests</Link>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                  <div className="col-12">
                      <div className="App">
                          <div>
                              <ul className="nav nav-tabs">
                              {testRecords
                                    .filter(item => item.question_number === "1")
                                    .map((item, index) => (
                                        <li className="nav-item" key={`tab-${index}`}>
                                            <button
                                                className={`nav-link ${activeTab === index ? 'active' : ''}`}
                                                onClick={() => setActiveTab(index)}
                                            >
                                                {item.section}
                                            </button>
                                        </li>
                                    ))}
                              </ul>
                              <div className="tab-content" style={{marginBottom:"20px"}}>
                                    {testRecords
                                          .filter(item => item.question_number === "1")
                                          .map((item, index) => (
                                      <div
                                          key={`tab-content-${index}`}
                                          className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                                      >
                                          <table className="custom-table" width="100%">
                                              <thead>
                                                  <tr style={{ verticalAlign: "top", fontWeight: "bold" }}>
                                                      <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer', textAlign: 'center' }}>
                                                          <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                              <div>Question</div>
                                                          </div>
                                                      </th>
                                                      <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left' }}>
                                                          Topic
                                                      </th>
                                                      <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left' }}>
                                                          Sub Topic
                                                      </th>
                                                      <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer' }}>
                                                          <div className="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                              <div>Correct Answer</div>
                                                          </div>
                                                      </th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {testRecords.map((record, recordIndex) => (
                                                      <React.Fragment key={`table-row-${recordIndex}`}>
                                                          {record.section === item.section && (
                                                              <tr className="custom-table-row">
                                                                  <td style={{ textAlign: 'center' }}>{record.question_number}</td>
                                                                  <td style={{ textAlign: 'left' }}>{record.topic}</td>
                                                                  <td style={{ textAlign: 'left' }}>{record.subtopic}</td>
                                                                  <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                                      {record.answer}
                                                                  </td>
                                                              </tr>
                                                          )}
                                                      </React.Fragment>
                                                  ))}
                                              </tbody>
                                          </table>
                                      </div>
                                  ))}
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
  ); 
} 

export default NActTest;
