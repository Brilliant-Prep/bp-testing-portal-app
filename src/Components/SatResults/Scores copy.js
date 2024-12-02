import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file
import axios from "axios";

const Scores = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [innerActiveTab, setInnerActiveTab] = useState(10); // For inner tabs
  const [ractiveTab, rsetActiveTab] = useState('reading_1'); // Default active tab
  const { id } = useParams();
  const userId = localStorage.getItem("userid");

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handlerTabClick = (tabId) => {
    rsetActiveTab(tabId);
  };

  const handleInnerTabClick = (index) => {
    setInnerActiveTab(index);
  };

  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  const [results3, setResults3] = useState([]);
  const [results4, setResults4] = useState([]);

  useEffect(() => {
    gettests(id );
    getsweekness(id);
    getsweekness2(id);
    getsweekness3(id);
    getsweekness4(id);
  }, []);

  const gettests = async () => { 
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsattest/${id}/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${userId}`,
          },
        }
      );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const getsweekness = async () => { 
    const module_id = 1; // replace with the actual module_id
    const section_id = 1;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?module_id=${module_id}&section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults(response.data);
    }
  }; 

  const getsweekness2 = async () => { 
    const module_id = 2; // replace with the actual module_id
    const section_id = 1;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?module_id=${module_id}&section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults2(response.data);
    }
  }; 

  const getsweekness3 = async () => { 
    const module_id = 1; // replace with the actual module_id
    const section_id = 2;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?module_id=${module_id}&section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults3(response.data);
    }
  }; 

  const getsweekness4 = async () => { 
    const module_id = 2; // replace with the actual module_id
    const section_id = 2;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?module_id=${module_id}&section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults4(response.data);
    }
  }; 

  const Loader = ({ subject, score, range, delta, color }) => {
    return (
      <div className="summary-loader">
        <div className="loader">
          <div className="loader-rings-container">
            {/* SVG Loader */}
            <svg className="loader-rings" style={{ width: '200px', height: '200px', stroke: color }}>
              <circle className="loader-ring" r="96" cx="100" cy="100" strokeDashoffset="603.1857894892403" style={{ strokeDasharray: '603.186, 603.186', strokeDashoffset: '15.0796' }}></circle>
              <circle className="loader-ring" stroke="#dadada" strokeOpacity="0.3" r="96" cx="100" cy="100"></circle>
            </svg>
            {/* Loader Text */}
            <div className="loader-text-container big">
              <div className="loader-text">{subject}</div>
              <div className="loader-score">{score}</div>
              <div className="loader-text">{range}</div>
              <div className="delta">{delta}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
        <h1>SCORE DETAILS</h1>
        <h6>SAT Practice 1 - November 16, 2023</h6>
        <div className="middle_container">
             <div className="page-content">
                <div className="tabbed">
                    <input type="radio" id="tab1" name="css-tabs" checked={activeTab === 0} />
                    <input type="radio" id="tab2" name="css-tabs" checked={activeTab === 1} />
                    <input type="radio" id="tab3" name="css-tabs" checked={activeTab === 2} />

                    <ul className="tabs">
                        <li className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
                            <label>All Questions</label>
                            <i class="fa fa-star"></i>
                        </li>
                        <li className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <label >Reading & Writing</label>
                            <i class="fa fa-edit"></i>
                        </li>
                        <li className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                            <label>Math</label>
                            <i class="fa fa-plus"></i>
                        </li> 
                    </ul>

                    <div className="tab-content">
                    {activeTab === 0 && (
                        <>
                        <div className="card-block">
                                    <div className="summary-content test-content">
                                        <div className="summary-scores">
                                            <div className="summary-header-container">
                                                <h2>6th SAT Practice Test</h2>
                                                <p className="summary-annotation">Version Oct 2021 SAT</p>
                                            </div>
                                            <div className="summary-loaders">
                                                <div className="loader">
                                                    <div className="loader-rings-container">
                                                        <svg className="loader-rings" style={{ width: '200px', height: '200px', stroke: 'rgb(64, 90, 156)' }}>
                                                            <circle className="loader-ring" r="96" cx="100" cy="100" strokeDashoffset="603.1857894892403" style={{ strokeDasharray: '603.186, 603.186', strokeDashoffset: '15.0796' }}></circle>
                                                            <circle className="loader-ring" stroke="#dadada" strokeOpacity="0.3" r="96" cx="100" cy="100"></circle>
                                                        </svg>
                                                        <div className="loader-text-container big">
                                                            <div className="loader-text">Total Score</div>
                                                            <div className="loader-score">1560</div>
                                                            <div className="loader-text">400 to 1600</div>
                                                            <div className="delta">+710</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="summary-scores">
                                            <div className="summary-header-container">
                                                <h2>Sections Score</h2>
                                                <p className="summary-annotation">From all tests</p>
                                            </div>
                                            <div className="summary-loaders">
                                                    {/* Reading Loader */}
                                                    <Loader subject="Reading" score={390} range="100 to 400" delta="+60" color="rgb(53, 166, 175)" />
                                                    {/* Writing Loader */} 
                                                    <Loader subject="Math" score={390} range="200 to 800" delta="+360" color="rgb(71, 133, 244)" /> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table class="custom-table" border="1" cellpadding="1" cellspacing="1" width="100%">
                                        <thead>
                                            <tr style={{ verticalAlign: "top", fontWeight: "bold", borderBottom: "1px solid #666" }}>
                                                <td data-tid="problem_no" style={{ flex: '1 1 0%', width: "15%" }}>
                                                    Date Assigned
                                                </td>
                                                <td data-tid="correct_answer" style={{ flex: '1 1 0%', width: "15%" }}>
                                                    Date Submitted
                                                </td>
                                                <td data-tid="answers" style={{ flex: '1 1 0%', width: "15%", textAlign: 'center' }}>
                                                    Test ID
                                                </td>
                                                <td data-tid="answers" style={{ flex: '1 1 0%', width: "15%", textAlign: 'center' }}>
                                                    Composite<br />Score
                                                </td>
                                                <td data-tid="answers" style={{ flex: '2 1 0%', width: "15%", textAlign: 'center' }}>
                                                    Reading & Writing
                                                </td>
                                                <td data-tid="answers" style={{ flex: '2 1 0%', width: "15%", textAlign: 'center' }}>
                                                    Math
                                                </td>
                                                <td data-tid="answers" style={{ flex: '2 1 0%', width: "25%", textAlign: 'center' }}>
                                                    Answers<br />
                                                    (Correct out of Total)
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="custom-table-row">
                                                <td style={{ textAlign: 'left' }}>10/30/2023</td>
                                                <td style={{ textAlign: 'left' }}>11/01/2023</td>
                                                <td style={{ textAlign: 'center' }}>2nd dSAT Practice Test</td>
                                                <td style={{ textAlign: 'center' }}>400</td>
                                                <td style={{ textAlign: 'center' }}>200</td>
                                                <td style={{ textAlign: 'center' }}>200</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div class="progress-container">
                                                        <div class="progress-bar" style={{ width: '50%' }}></div>
                                                    </div>
                                                    50 of 98
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table></>
                    )}

                    {activeTab === 1 && (
                        <>
                        {/* Content for Tab 2 */}
                        <input type="radio" id="tab10" name="css-tabs" checked={innerActiveTab === 10} />
                        <input type="radio" id="tab21" name="css-tabs" checked={innerActiveTab === 21} />
                        <input type="radio" id="tab11" name="css-tabs" checked={innerActiveTab === 11} />
                        <input type="radio" id="tab31" name="css-tabs" checked={innerActiveTab === 31} />

                        <ul className="tabs">
                            <li className={`tab ${innerActiveTab === 10 ? 'active' : ''}`}>
                            <label onClick={() => handleInnerTabClick(10)}>Reading & Writing - Module 1</label>
                            </li>
                            <li className={`tab ${innerActiveTab === 21 ? 'active' : ''}`}>
                            <label onClick={() => handleInnerTabClick(21)}>Reading & Writing - Module 2</label>
                            </li>
                            <li className={`tab ${innerActiveTab === 11 ? 'active' : ''}`}>
                            <label onClick={() => handleInnerTabClick(11)}>Maths Questions - Module 1</label>
                            </li>
                            <li className={`tab ${innerActiveTab === 31 ? 'active' : ''}`}>
                            <label onClick={() => handleInnerTabClick(31)}>Maths Questions - Module 2</label>
                            </li>
                        </ul>

                        <div className="tab-content">
                            {innerActiveTab === 10 && (
                            <>
                                <div style={{ height: '400px', overflow: 'auto' }}>
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
                                            <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Topic
                                            </td>
                                            <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Sub Topic
                                            </td>
                                            <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                                Action
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                item.module_id == 1 && item.section_id == 1 ? (
                                                <tr key={index} class="custom-table-row">
                                                    <td>{index+1}</td>
                                                    <td><div class="pill border-pill green">{item.correct_answer}</div></td>
                                                    <td className='innertabs'>
                                                        <div className="problem-answer-cell">
                                                            <div className="problem-answers-container">
                                                                {['A', 'B', 'C', 'D'].map((choice, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`answer-bubble 
                                                                            ${item.selectedAnswer === choice && item.selectedAnswer === item.correct_answer ? 'correct' : ''}
                                                                            ${item.selectedAnswer === choice && item.selectedAnswer !== item.correct_answer ? 'wrong' : ''}
                                                                            ${item.correct_answer === choice ? 'correct' : ''}
                                                                        `}
                                                                    >
                                                                        <div>{choice}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center'}}>{item.topic_title}</td>
                                                    <td style={{ textAlign: 'center'}}>{item.stopic_title}</td>
                                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                                </tr>
                                                ) : null
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                </>
                            )}

                            {innerActiveTab === 21 && (
                            <>
                            <div style={{ height: '400px', overflow: 'auto' }}>
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
                                        <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Topic
                                        </td>
                                        <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Sub Topic
                                        </td>
                                        <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                            Action
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                            {data.map((item, index) => (
                                                item.module_id == 2 && item.section_id == 1 ? (
                                                <tr key={index} class="custom-table-row">
                                                    <td>{index+1}</td>
                                                    <td><div class="pill border-pill green">{item.correct_answer}</div></td>
                                                    <td className='innertabs'>
                                                        <div className="problem-answer-cell">
                                                            <div className="problem-answers-container">
                                                                {['A', 'B', 'C', 'D'].map((choice, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`answer-bubble 
                                                                            ${item.selectedAnswer === choice && item.selectedAnswer === item.correct_answer ? 'correct' : ''}
                                                                            ${item.selectedAnswer === choice && item.selectedAnswer !== item.correct_answer ? 'wrong' : ''}
                                                                            ${item.correct_answer === choice ? 'correct' : ''}
                                                                        `}
                                                                    >
                                                                        <div>{choice}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center'}}>{item.topic_title}</td>
                                                    <td style={{ textAlign: 'center'}}>{item.stopic_title}</td>
                                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                                </tr>
                                                ) : null
                                            ))}
                                    </tbody>
                            </table>
                            </div>
                            </>
                            )}

                            {innerActiveTab === 11 && (
                            <>
                            <div style={{ height: '400px', overflow: 'auto' }}>
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
                                        <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Topic
                                        </td>
                                        <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Sub Topic
                                        </td>
                                        <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                            Action
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                            {data.map((item, index) => (
                                                item.module_id == 1 && item.section_id == 2 ? (
                                                <tr key={index} class="custom-table-row">
                                                    <td>{index+1}</td>
                                                    <td><div class="pill border-pill green">{item.correct_answer}</div></td>
                                                    <td className='innertabs'>
                                                        <div className="problem-answer-cell">
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            {item.isgridIn == 'true'  ? (
                                                                <div className="form-input form-date-picker">
                                                                        <input type="text" id="custom-form-input" 
                                                                        value={item.selectedAnswer !== "" ? item.selectedAnswer : ""} 
                                                                        className={item.selectedAnswer === item.correct_answer ? 'correct-border' : 'incorrect-border'}/>
                                                                </div>
                                                            ) : (
                                                                    <div className="problem-answers-container">
                                                                        {['A', 'B', 'C', 'D'].map((choice, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`answer-bubble 
                                                                                    ${item.selectedAnswer === choice && item.selectedAnswer === item.correct_answer ? 'correct' : ''}
                                                                                    ${item.selectedAnswer === choice && item.selectedAnswer !== item.correct_answer ? 'wrong' : ''}
                                                                                    ${item.correct_answer === choice ? 'correct' : ''}
                                                                                `}
                                                                            >
                                                                                <div>{choice}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                            )}
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center'}}>{item.topic_title}</td>
                                                    <td style={{ textAlign: 'center'}}>{item.stopic_title}</td>
                                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                                </tr>
                                                ) : null
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            </>
                            )}

                            {innerActiveTab === 31 && (
                                <>
                                <div style={{ height: '400px', overflow: 'auto' }}>
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
                                            <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Topic
                                            </td>
                                            <td data-tid="answers" style={{ flex: '1 1 0%', minWidth: '300px', cursor: 'pointer', textAlign: 'center'}}>
                                                Sub Topic
                                            </td>
                                            <td data-tid="answers" style={{ flex: '2 1 0%', minWidth: '50px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default'}}>
                                                Action
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                item.module_id == 2 && item.section_id == 2 ? (
                                                <tr key={index} class="custom-table-row">
                                                    <td>{index+1}</td>
                                                    <td><div class="pill border-pill green"> {item.correct_answer}</div></td>
                                                    <td className='innertabs'>
                                                        <div className="problem-answer-cell">
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            {item.isgridIn == 'true'  ? (
                                                                <div className="form-input form-date-picker">
                                                                        <input type="text" id="custom-form-input" 
                                                                        value={item.selectedAnswer !== "" ? item.selectedAnswer : ""} 
                                                                        className={item.selectedAnswer === item.correct_answer ? 'correct-border' : 'incorrect-border'}/>
                                                                </div>
                                                            ) : (
                                                                    <div className="problem-answers-container">
                                                                        {['A', 'B', 'C', 'D'].map((choice, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`answer-bubble 
                                                                                    ${item.selectedAnswer === choice && item.selectedAnswer === item.correct_answer ? 'correct' : ''}
                                                                                    ${item.selectedAnswer === choice && item.selectedAnswer !== item.correct_answer ? 'wrong' : ''}
                                                                                    ${item.correct_answer === choice ? 'correct' : ''}
                                                                                `}
                                                                            >
                                                                                <div>{choice}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                            )}
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center'}}>{item.topic_title}</td>
                                                    <td style={{ textAlign: 'center'}}>{item.stopic_title}</td>
                                                    <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                                </tr>
                                                ) : null
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
                                                <li id="reading_1">
                                                    <a  className={ractiveTab === 'reading_1' ? 'active' : ''} onClick={() => handlerTabClick('reading_1')}
                                                    >
                                                        Reading & Writing - Module 1
                                                    </a>
                                                </li>
                                                <li id="reading_2">
                                                    <a  className={ractiveTab === 'reading_2' ? 'active' : ''} onClick={() => handlerTabClick('reading_2')}
                                                    >
                                                        Reading & Writing - Module 2
                                                    </a>
                                                </li>
                                                <li id="math_1" >
                                                    <a className={ractiveTab === 'math_1' ? 'active' : ''} onClick={() => handlerTabClick('math_1')}
                                                    >
                                                    Maths Questions - Module 1
                                                    </a>
                                                </li>
                                                <li id="math_2" >
                                                    <a className={ractiveTab === 'math_2' ? 'active' : ''} onClick={() => handlerTabClick('math_2')}
                                                    >
                                                    Maths Questions - Module 2
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <br clear="all" />
                                        <div className="quiz-reports-tab">
                                            {ractiveTab === 'reading_1' && (
                                                <div>
                                                    {results.map((topic) => (
                                                    <div key={topic._id}>
                                                        <h5>{topic.topic_title} ({topic.topic_count})</h5> 
                                                        <ul style={{ listStyleType:"disc" }}>
                                                            {topic.subtopics.map((subtopic) => (
                                                                <li key={subtopic._id}>
                                                                    <p>{subtopic.stopic_title} ({subtopic.status_count}  of  {subtopic.count})</p> 
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    ))}
                                                </div>
                                                )}
                                            {ractiveTab === 'reading_2' && (
                                                <div class="quiz-reports-tab">        
                                                    <div>
                                                            {results2.map((topic) => (
                                                            <div key={topic._id}>
                                                                <h5>{topic.topic_title} ({topic.topic_count})</h5> 
                                                                <ul style={{ listStyleType:"disc" }}>
                                                                    {topic.subtopics.map((subtopic) => (
                                                                        <li key={subtopic._id}>
                                                                            <p>{subtopic.stopic_title} ({subtopic.status_count}  of  {subtopic.count})</p> 
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            ))}
                                                        </div>
                                                </div>
                                            )}
                                            {ractiveTab === 'math_1' && (
                                                <>
                                                    <div class="quiz-reports-tab">        
                                                    <div>
                                                            {results3.map((topic) => (
                                                            <div key={topic._id}>
                                                                <h5>{topic.topic_title} ({topic.topic_count})</h5> 
                                                                <ul style={{ listStyleType:"disc" }}>
                                                                    {topic.subtopics.map((subtopic) => (
                                                                        <li key={subtopic._id}>
                                                                            <p>{subtopic.stopic_title} ({subtopic.status_count}  of  {subtopic.count})</p> 
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            ))}
                                                        </div>
                                                </div>
                                                </>
                                            )}
                                            {ractiveTab === 'math_2' && (
                                                <>
                                                    <div class="quiz-reports-tab">        
                                                    <div>
                                                            {results4.map((topic) => (
                                                            <div key={topic._id}>
                                                                <h5>{topic.topic_title} ({topic.topic_count})</h5> 
                                                                <ul style={{ listStyleType:"disc" }}>
                                                                    {topic.subtopics.map((subtopic) => (
                                                                        <li key={subtopic._id}>
                                                                            <p>{subtopic.stopic_title} ({subtopic.status_count}  of  {subtopic.count})</p> 
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            ))}
                                                        </div>
                                                </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                            </div>
                        </>
                    )} 
                    </div>
                </div>
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
export default Scores;
