import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file
import LineChart from './LineChart';
import axios from "axios";
import Chart from 'chart.js';
import { Modal, Button } from 'react-bootstrap';
import { MathJax, MathJaxContext } from "better-react-mathjax";

const ActScores = () => { 
    useEffect(() => {
        getReport() 
        gettests(id)
        getsweekness();
        getsweekness2();
        getsweekness3();
        getsweekness4();
      }, []); 
      const [data, setData] = useState([]);
      const [results, setResults] = useState([]);
      const [results2, setResults2] = useState([]);
      const [results3, setResults3] = useState([]);
      const [results4, setResults4] = useState([]);  
  const [activeTab, setActiveTab] = useState(0);
  const [innerActiveTab, setInnerActiveTab] = useState(10); // For inner tabs
  const [ractiveTab, rsetActiveTab] = useState('reading_1'); // Default active tab
  const { id } = useParams(); 

  // Function to parse query parameters from the URL
const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  
  // Get student_id from URL query parameters
  let userId = getQueryParam('student_id');

  let downloadUrl = `/send-actreport/${id}`; 
  if (!userId) {
    userId = localStorage.getItem("userid");
  } 
  else 
  { 
    downloadUrl = `/send-actreport/${id}?student_id=${userId}`; 
  } 

  console.log("userId", userId);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handlerTabClick = (tabId) => {
    rsetActiveTab(tabId);
  };

  const handleInnerTabClick = (index) => {
    setInnerActiveTab(index);
  };
  const [test_code, setTestCode] = useState([]);
  const [test_date, setTestDate] = useState([]);
  const [std_code, setstdCode] = useState([]);
  const [english_correct, setecorrect] = useState([]);
  const [english_wrong, setewrong] = useState([]);
  const [english_omitted, seteomitted] = useState([]);
  const [math_correct, setmcorrect] = useState([]);
  const [math_wrong, setmwrong] = useState([]);
  const [math_omitted, setmomitted] = useState([]);
  const [reading_correct, setrcorrect] = useState([]);
  const [reading_wrong, setrwrong] = useState([]);
  const [reading_omitted, setromitted] = useState([]);
  const [science_correct, setscorrect] = useState([]);
  const [science_wrong, setswrong] = useState([]);
  const [science_omitted, setsomitted] = useState([]); 
  const [total_correct, settcorrect] = useState([]);
  const [total_wrong, settwrong] = useState([]);
  const [total_omitted, settomitted] = useState([]); 
  const [total_esscore, settotal_esscore] = useState([]); 
  const [total_msscore, settotal_msscore] = useState([]); 
  const [total_rsscore, settotal_rsscore] = useState([]); 
  const [total_ssscore, settotal_ssscore] = useState([]); 
  const [total_scalecore, settotal_scalescore] = useState([]);  

  const chartData = {
    labels: ['English', 'Math', 'Reading', 'Science'],
    datasets: [{
        label: 'Scores',
        backgroundColor: [
            '#3a2f7c',
            '#3a2f7c',
            '#ed197e',
            '#ed197e',
        ],
        borderColor: [
            '#3a2f7c',
            '#3a2f7c',
            '#ed197e',
            '#ed197e',
        ],
        borderWidth: 1,
        maxBarThickness: 6,
        
        data: [
            english_correct,
            math_correct,
            reading_correct,
            science_correct,
            36
        ]
    }],
  };
  const getsweekness = async () => { 
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getactweekness/${id}/${userId}?section=1`
    );
    if (response.status === 200) {
      setResults(response.data);
    }
  };
  const getsweekness2 = async () => { 
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getactweekness/${id}/${userId}?section=2`
    );
    if (response.status === 200) {
      setResults2(response.data);
    }
  };
  const getsweekness3 = async () => { 
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getactweekness/${id}/${userId}?section=3`
    );
    if (response.status === 200) {
      setResults3(response.data);
    }
  };
  const getsweekness4 = async () => { 
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getactweekness/${id}/${userId}?section=4`
    );
    if (response.status === 200) {
      setResults4(response.data);
    }
  };

  const getReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getactreportbyuser/${userId}/${id}`
      );
      if (response.status === 200) {
        setTestCode(response.data.test_code);
        setTestDate(response.data.test_date);
        setstdCode(response.data.std_code); 
        setecorrect(response.data.english_correct); 
        setewrong(response.data.english_wrong); 
        seteomitted(response.data.english_omitted); 
        setmcorrect(response.data.math_correct); 
        setmwrong(response.data.math_wrong); 
        setmomitted(response.data.math_omitted); 
        setrcorrect(response.data.reading_correct); 
        setrwrong(response.data.reading_wrong); 
        setromitted(response.data.reading_omitted); 
        setscorrect(response.data.science_correct); 
        setswrong(response.data.science_wrong); 
        setsomitted(response.data.science_omitted); 
        settcorrect(response.data.total_correct); 
        settwrong(response.data.total_wrong); 
        settomitted(response.data.total_omitted); 
        settotal_esscore(response.data.englishscaleScore); 
        settotal_msscore(response.data.mathscaleScore); 
        settotal_rsscore(response.data.readingscaleScore); 
        settotal_ssscore(response.data.sciencecscaleScore); 
        settotal_scalescore(response.data.totalscaleScore); 
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };  

  const gettests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getacttest/${id}/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${userId}`,
        }, useEffect
      }
    );
    if (response.status === 200) {
      setData(response.data.data);
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
        <div style={{float:"right",color:"pink"}}>
            <a class="btn btn-success" href={downloadUrl}>Download Report</a>
        </div>
        <h1 style={{textAlign:"center"}}>SCORE DETAILS</h1>
        <h6 style={{textAlign:"center"}}></h6>
        <div className="middle_container">
             <div className="page-content">
                <div className="tabbed">
                    <input type="radio" id="tab1" name="css-tabs" checked={activeTab === 0} />
                    <input type="radio" id="tab2" name="css-tabs" checked={activeTab === 1} />
                    <input type="radio" id="tab3" name="css-tabs" checked={activeTab === 2} />
                    <input type="radio" id="tab4" name="css-tabs" checked={activeTab === 3} />
                    <input type="radio" id="tab5" name="css-tabs" checked={activeTab === 4} />
                    <input type="radio" id="tab6" name="css-tabs" checked={activeTab === 5} />

                    <ul className="tabs">
                        <li className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
                            <label>Score</label>
                            <i class="fa fa-star"></i>
                        </li>
                        <li className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <label >English</label>
                            <i class="fa fa-edit"></i>
                        </li>
                        <li className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                            <label>Math</label>
                            <i class="fa fa-plus"></i>
                        </li>
                        <li className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
                            <label>Reading</label>
                            <i class="fa fa-plus"></i>
                        </li> 
                        <li className={`tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>
                            <label>Science</label>
                            <i class="fa fa-plus"></i>
                        </li>  
                        <li className={`tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}>
                            <label>Strength & Weakness</label>
                            <i class="fa fa-plus"></i>
                        </li> 
                    </ul>

                    <div className="tab-content">
                    {activeTab === 0 && (
                        <>
                              <div>
                                <div class="card-body" style={{width:"100%", padding:"0px 20px"}}> 
                                    <div class="row d-flex justify-content-center mt-100">
                                        <div class="col-md-12">
                                            <div className="sections-score-wrapper" style={{ display: 'flex' }}>
                                            <div class="block" style={{ marginTop: '40px' }}>
                                                <div class="sc_head">English</div>
                                                <div class="rsatprogress-bar satprogress" role="progressbar" aria-valuenow="100" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_esscore}<br/></span>
                                                    1-36
                                                </div>
                                            </div>
                                            <div class="block" style={{ marginTop: '40px' }}>
                                                <div class="sc_head">Math</div>
                                                <div class="rsatprogress-bar satprogress" role="progressbar" aria-valuenow="100" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_msscore}<br/></span>
                                                    1-36
                                                </div>
                                            </div>
                                            <div class="block">
                                                <div class="sc_head">Total Score</div>
                                                <div class="rsatprogress-bar2 satprogress" role="progressbar" aria-valuenow="75" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_scalecore}<br/></span>
                                                    1-36
                                                </div>
                                            </div>
                                            <div class="block" style={{ marginTop: '40px' }}>
                                                <div class="sc_head">Reading</div>
                                                <div class="rsatprogress-bar3 satprogress" role="progressbar" aria-valuenow="75" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_rsscore}<br/></span>
                                                    1-36
                                                </div>
                                            </div>
                                            <div class="block" style={{ marginTop: '40px' }}>
                                                <div class="sc_head">Science</div>
                                                <div class="rsatprogress-bar3 satprogress" role="progressbar" aria-valuenow="75" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_ssscore}<br/></span>
                                                    36
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                </div> 

                                <div class="actmods">
                                    <div class="rounds">
                                        <div class="rwtitle">All  Scores</div>
                                        <div class="rowround">
                                            <div class="colname">
                                                &nbsp;
                                            </div>
                                            <div class="colname">
                                                English
                                            </div>
                                            <div class="colname">
                                                Math
                                            </div>
                                            <div class="colname">
                                                Reading
                                            </div>
                                            <div class="colname">
                                                Science
                                            </div>
                                            <div class="colname">
                                                Total
                                            </div>
                                        </div>
                                        <div class="rowround">
                                            <div class="colname satgreen">
                                                # Correct
                                            </div>
                                            <div class="colname satgreen">
                                                <span class="actfixwidth">{english_correct}</span>
                                            </div>
                                            <div class="colname satgreen">
                                                <span class="actfixwidth">{math_correct}</span>
                                            </div>
                                            <div class="colname satgreen">
                                                <span class="actfixwidth">{reading_correct}</span>
                                            </div>
                                            <div class="colname satgreen">
                                                <span class="actfixwidth">{science_correct}</span>
                                            </div>
                                            <div class="colname satgreen">
                                                <span class="actfixwidth">{total_correct}</span>
                                            </div>
                                        </div>  
                                        <div class="rowround">
                                            <div class="colname satred">
                                                # Incorrect
                                            </div>
                                            <div class="colname satred">
                                                <span class="actfixwidth">{english_wrong}</span>
                                            </div>
                                            <div class="colname satred">
                                                <span class="actfixwidth">{math_wrong}</span>
                                            </div>
                                            <div class="colname satred">
                                                <span class="actfixwidth">{reading_wrong}</span>
                                            </div>
                                            <div class="colname satred">
                                                <span class="actfixwidth">{science_wrong}</span>
                                            </div>
                                            <div class="colname satred">
                                                <span class="actfixwidth">{total_wrong}</span>
                                            </div>
                                        </div>                
                                        <div class="rowround">
                                            <div class="colname satorange">
                                                # Omitted
                                            </div>
                                            <div class="colname satorange">
                                                <span class="actfixwidth">{english_omitted}</span>
                                            </div>
                                            <div class="colname satorange">
                                                <span class="actfixwidth">{math_omitted}</span>
                                            </div>
                                            <div class="colname satorange">
                                                <span class="actfixwidth">{reading_omitted}</span>
                                            </div>
                                            <div class="colname satorange">
                                                <span class="actfixwidth">{science_omitted}</span>
                                            </div>
                                            <div class="colname satorange">
                                                <span class="actfixwidth">{total_omitted}</span>
                                            </div>
                                        </div>                 
                                        <div class="rowround final_score">
                                            <div class="colname">
                                                Total Scale Score
                                            </div>
                                            <div class="colname">
                                                <span class="actfixwidth">{total_esscore}</span>
                                            </div>
                                            <div class="colname">
                                                <span class="actfixwidth">{total_msscore}</span>
                                            </div>
                                            <div class="colname">
                                                <span class="actfixwidth">{total_rsscore}</span>
                                            </div>
                                            <div class="colname">
                                                <span class="actfixwidth">{total_ssscore}</span>
                                            </div>
                                            <div class="colname">
                                                <span class="actfixwidth">{total_scalecore}</span>
                                            </div>
                                        </div> 
                                    </div> 
                                </div>
                                <div class="satmods">
                                        <div class="rounds noborder"  style={{height:"350px"}}>
                                            <h3>Performance</h3>
                                            <div className="chart">
                                            <LineChart data={chartData}   style={{height:"350px"}}/>
                                            </div>
                                        </div>
                                        <div class="rounds noborder"  style={{height:"350px"}}>
                                            <h3>Accuracy</h3>
                                            <div className="chart" style={{paddingTop:"25px"}}>
                                                <div className="bar-container">
                                                    <div className="label">English</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(english_correct / 75) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((english_correct / 75) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">Math</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(math_correct / 60) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((math_correct / 60) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">Reading</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(reading_correct / 40) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((reading_correct / 40) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">Science</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(science_correct / 40) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((science_correct / 40) * 100).toFixed(2)}%`}</div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </div>
                            </div>                 
                        </>
                    )}
                    
                    {activeTab === 1 && (
                        <>
                            <div>
                                <h3 style={{textAlign:"center"}}>Questions Overview</h3>
                                <div className="questions_overview">
                                    <div className="group-block">
                                        <div className="number">75</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{english_correct}</div>
                                        Correct 
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{english_omitted}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{english_wrong}</div>
                                        Incorrect
                                    </div>
                                </div>
                                <table class="custom-table" width="100%">
                                    <thead>
                                        <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer', textAlign: 'center' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Question</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Topic
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Sub Topic
                                            </th>
                                            <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer'}}>
                                                <div class="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                    <div>Correct Answer</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                Your Answer
                                            </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            {Array.isArray(data) && data.map((item, index) => (
                                                                    item.section === 'English' ? (
                                                                        (() => {
                                                                            let currentIndex;
                                                                            let moduleName;
                                                                            const isFirstRow = currentIndex === 1;
                                                                            return (
                                                                                <React.Fragment key={`fragment-${index}`}>
                                                                                    {isFirstRow && (
                                                                                        <tr key={`special-row-${index}`}>
                                                                                            <td className="sprow" colSpan="7" align="center">
                                                                                                <strong></strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                    <tr key={`row-${index}`} className="custom-table-row">
                                                                                        <td style={{ textAlign: 'center' }}>{item.question_number}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.topic}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.subtopic}</td>
                                                                                        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                                                            {item.answer}
                                                                                        </td>
                                                                                        <td className='innertabs' style={{ textAlign: 'center' }}>
                                                                                            <div style={{
                                                                                                width: '100px',
                                                                                                textAlign: 'left',
                                                                                                margin: '0px auto'
                                                                                            }}>
                                                                                                <span style={{
                                                                                                    padding: '5px 10px',
                                                                                                    borderRadius: '5px',
                                                                                                    marginRight: '5px',
                                                                                                    color: item.selectedAnswer === item.answer ? 'green' : 'red',
                                                                                                }}>
                                                                                                    {item.selectedAnswer}
                                                                                                </span>
                                                                                            </div>
                                                                                        </td> 
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            );
                                                                        })()
                                                                    ) : null
                                                                ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 2 && (
                        <>
                        <div>
                                <h3 style={{textAlign:"center"}}>Questions Overview</h3>
                                <div className="questions_overview">
                                    <div className="group-block">
                                        <div className="number">60</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{math_correct}</div>
                                        Correct
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{math_omitted}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{math_wrong}</div>
                                        Incorrect
                                    </div>
                                </div>
                                <table class="custom-table" width="100%">
                                    <thead>
                                        <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer', textAlign: 'center' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Question</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Topic
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Sub Topic
                                            </th>
                                            <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer'}}>
                                                <div class="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                    <div>Correct Answer</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                Your Answer
                                            </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            {Array.isArray(data) && data.map((item, index) => (
                                                                    item.section === 'Math' ? (
                                                                        (() => {
                                                                            let currentIndex;
                                                                            let moduleName;
                                                                            const isFirstRow = currentIndex === 1;
                                                                            return (
                                                                                <React.Fragment key={`fragment-${index}`}>
                                                                                    {isFirstRow && (
                                                                                        <tr key={`special-row-${index}`}>
                                                                                            <td className="sprow" colSpan="7" align="center">
                                                                                                <strong></strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                    <tr key={`row-${index}`} className="custom-table-row">
                                                                                        <td style={{ textAlign: 'center' }}>{item.question_number}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.topic}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.subtopic}</td>
                                                                                        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                                                            {item.answer}
                                                                                        </td>
                                                                                        <td className='innertabs' style={{ textAlign: 'center' }}>
                                                                                            <div style={{
                                                                                                width: '100px',
                                                                                                textAlign: 'left',
                                                                                                margin: '0px auto'
                                                                                            }}>
                                                                                                <span style={{
                                                                                                    padding: '5px 10px',
                                                                                                    borderRadius: '5px',
                                                                                                    marginRight: '5px',
                                                                                                    color: item.selectedAnswer === item.answer ? 'green' : 'red',
                                                                                                }}>
                                                                                                    {item.selectedAnswer}
                                                                                                </span>
                                                                                            </div>
                                                                                        </td> 
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            );
                                                                        })()
                                                                    ) : null
                                                                ))}

                                    </tbody> 
                                </table>
                            </div>
                    </>
                    )} 

                    {activeTab === 3 && (
                        <>
                        <div>
                                <h3 style={{textAlign:"center"}}>Questions Overview</h3>
                                <div className="questions_overview">
                                    <div className="group-block">
                                        <div className="number">40</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{reading_correct}</div>
                                        Correct
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{reading_omitted}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{reading_wrong}</div>
                                        Incorrect
                                    </div>
                                </div>
                                <table class="custom-table" width="100%">
                                    <thead>
                                        <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer', textAlign: 'center' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Question</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Topic
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Sub Topic
                                            </th>
                                            <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer'}}>
                                                <div class="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                    <div>Correct Answer</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                Your Answer
                                            </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            {Array.isArray(data) && data.map((item, index) => (
                                                                    item.section === 'Reading' ? (
                                                                        (() => {
                                                                            let currentIndex;
                                                                            let moduleName;
                                                                            const isFirstRow = currentIndex === 1;
                                                                            return (
                                                                                <React.Fragment key={`fragment-${index}`}>
                                                                                    {isFirstRow && (
                                                                                        <tr key={`special-row-${index}`}>
                                                                                            <td className="sprow" colSpan="7" align="center">
                                                                                                <strong></strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                    <tr key={`row-${index}`} className="custom-table-row">
                                                                                        <td style={{ textAlign: 'center' }}>{item.question_number}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.topic}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.subtopic}</td>
                                                                                        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                                                            {item.answer}
                                                                                        </td>
                                                                                        <td className='innertabs' style={{ textAlign: 'center' }}>
                                                                                            <div style={{
                                                                                                width: '100px',
                                                                                                textAlign: 'left',
                                                                                                margin: '0px auto'
                                                                                            }}>
                                                                                                <span style={{
                                                                                                    padding: '5px 10px',
                                                                                                    borderRadius: '5px',
                                                                                                    marginRight: '5px',
                                                                                                    color: item.selectedAnswer === item.answer ? 'green' : 'red',
                                                                                                }}>
                                                                                                    {item.selectedAnswer}
                                                                                                </span>
                                                                                            </div>
                                                                                        </td> 
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            );
                                                                        })()
                                                                    ) : null
                                                                ))}

                                    </tbody> 
                                </table>
                            </div>
                    </>
                    )} 

                    {activeTab === 4 && (
                        <>
                        <div>
                                <h3 style={{textAlign:"center"}}>Questions Overview</h3>
                                <div className="questions_overview">
                                    <div className="group-block">
                                        <div className="number">40</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{science_correct}</div>
                                        Correct
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{science_omitted}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{science_wrong}</div>
                                        Incorrect
                                    </div>
                                </div>
                                <table class="custom-table" width="100%">
                                    <thead>
                                        <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer', textAlign: 'center' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Question</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Topic
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '200px', cursor: 'pointer', textAlign: 'left'}}>
                                                Sub Topic
                                            </th>
                                            <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer'}}>
                                                <div class="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                    <div>Correct Answer</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                Your Answer
                                            </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            {Array.isArray(data) && data.map((item, index) => (
                                                                    item.section === 'Science' ? (
                                                                        (() => {
                                                                            let currentIndex;
                                                                            let moduleName;
                                                                            const isFirstRow = currentIndex === 1;
                                                                            return (
                                                                                <React.Fragment key={`fragment-${index}`}>
                                                                                    {isFirstRow && (
                                                                                        <tr key={`special-row-${index}`}>
                                                                                            <td className="sprow" colSpan="7" align="center">
                                                                                                <strong></strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                    <tr key={`row-${index}`} className="custom-table-row">
                                                                                        <td style={{ textAlign: 'center' }}>{item.question_number}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.topic}</td>
                                                                                        <td style={{ textAlign: 'left' }}>{item.subtopic}</td>
                                                                                        <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                                                            {item.answer}
                                                                                        </td>
                                                                                        <td className='innertabs' style={{ textAlign: 'center' }}>
                                                                                            <div style={{
                                                                                                width: '100px',
                                                                                                textAlign: 'left',
                                                                                                margin: '0px auto'
                                                                                            }}>
                                                                                                <span style={{
                                                                                                    padding: '5px 10px',
                                                                                                    borderRadius: '5px',
                                                                                                    marginRight: '5px',
                                                                                                    color: item.selectedAnswer === item.answer ? 'green' : 'red',
                                                                                                }}>
                                                                                                    {item.selectedAnswer}
                                                                                                </span>
                                                                                            </div>
                                                                                        </td> 
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            );
                                                                        })()
                                                                    ) : null
                                                                ))}

                                    </tbody>
                                </table>
                            </div>
                    </>
                    )} 

                    {activeTab === 5 && (
                        <>
                         <div>
                            <div className="quiz-reports-tab-wrapper">
                                <div className="quiz-reports-nav" quiz_nid="434200" quiz_title="DSAT Test 2: Reading & Writing - Mod 2E">
                                    <ul style={{paddingLeft:"0px"}}>
                                        <li id="english_1">
                                            <a  className={ractiveTab === 'english_1' ? 'active' : ''} onClick={() => handlerTabClick('english_1')}
                                            >
                                                English
                                            </a>
                                        </li> 
                                        <li id="math_1" >
                                            <a className={ractiveTab === 'math_1' ? 'active' : ''} onClick={() => handlerTabClick('math_1')}
                                            >
                                                Math
                                            </a>
                                        </li> 
                                        <li id="reading_1" >
                                            <a className={ractiveTab === 'reading_1' ? 'active' : ''} onClick={() => handlerTabClick('reading_1')}
                                            >
                                                Reading
                                            </a>
                                        </li> 
                                        <li id="science_1" >
                                            <a className={ractiveTab === 'science_1' ? 'active' : ''} onClick={() => handlerTabClick('science_1')}
                                            >
                                                Science
                                            </a>
                                        </li> 
                                    </ul>
                                </div>
                                <br clear="all" />
                                <div className="quiz-reports-tab">
                                    {ractiveTab === 'english_1' && (
                                        <div>
                                            {results.map((topic) => (
                                            <div key={topic._id}  class="topics_style_display">
                                                 <div class="topicblock">
                                                    <div class="percentage">
                                                        {((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%
                                                    </div>
                                                    <div class="topic_title">
                                                        {topic.topic_title} ({topic.topic_code})
                                                    </div>
                                                    <div class="status_bar">
                                                            <div
                                                            class="progress"
                                                            style={{
                                                                background: `linear-gradient(to right, #c5f7f7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%, #c8cac7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%)`
                                                            }}
                                                            ></div>
                                                    </div>
                                                    <div class="count" style={{fontWeight:"bold", color:"#ed197e"}}>
                                                        {topic.correct_count} of {topic.topic_count}  
                                                    </div>
                                                 </div>
                                                <ul>
                                                    {topic.subtopics.map((subtopic) => (
                                                        <li key={subtopic._id}>
                                                            <div class="topicblock">
                                                                <div class="percentage2">
                                                                {((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%
                                                                </div>
                                                                <div class="topic_title">
                                                                     {subtopic.stopic_title} ({subtopic.stopic_code})
                                                                </div>
                                                                <div class="status_bar">
                                                                    <div
                                                                        class="progress"
                                                                        style={{
                                                                            background: `linear-gradient(to right, #c5f7f7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%, #c8cac7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%)`
                                                                        }}
                                                                        ></div>
                                                                </div>
                                                                <div class="count">
                                                                     {subtopic.status_count}  of  {subtopic.count} 
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            ))}
                                        </div>
                                        )}
                                    {ractiveTab === 'math_1' && (
                                        <>
                                            <div class="quiz-reports-tab">        
                                            <div>
                                            {results2.map((topic) => (
                                            <div key={topic._id}  class="topics_style_display">
                                                 <div class="topicblock">
                                                    <div class="percentage">
                                                        {((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%
                                                    </div>
                                                    <div class="topic_title">
                                                        {topic.topic_title} ({topic.topic_code})
                                                    </div>
                                                    <div class="status_bar">
                                                            <div
                                                            class="progress"
                                                            style={{
                                                                background: `linear-gradient(to right, #c5f7f7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%, #c8cac7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%)`
                                                            }}
                                                            ></div>
                                                    </div>
                                                    <div class="count" style={{fontWeight:"bold", color:"#ed197e"}}>
                                                        {topic.correct_count} of {topic.topic_count}
                                                    </div>
                                                 </div>
                                                <ul>
                                                    {topic.subtopics.map((subtopic) => (
                                                        <li key={subtopic._id}>
                                                            <div class="topicblock">
                                                                <div class="percentage2">
                                                                {((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%
                                                                </div>
                                                                <div class="topic_title">
                                                                     {subtopic.stopic_title} ({subtopic.stopic_code})
                                                                </div>
                                                                <div class="status_bar">
                                                                    <div
                                                                        class="progress"
                                                                        style={{
                                                                            background: `linear-gradient(to right, #c5f7f7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%, #c8cac7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%)`
                                                                        }}
                                                                        ></div>
                                                                </div>
                                                                <div class="count">
                                                                     {subtopic.status_count} of {subtopic.count}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            ))}        
                                            </div>
                                        </div>
                                        </>
                                    )}
                                    {ractiveTab === 'reading_1' && (
                                        <>
                                            <div class="quiz-reports-tab">        
                                            <div>
                                            {results3.map((topic) => (
                                            <div key={topic._id}  class="topics_style_display">
                                                 <div class="topicblock">
                                                    <div class="percentage">
                                                        {((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%
                                                    </div>
                                                    <div class="topic_title">
                                                        {topic.topic_title} ({topic.topic_code})
                                                    </div>
                                                    <div class="status_bar">
                                                            <div
                                                            class="progress"
                                                            style={{
                                                                background: `linear-gradient(to right, #c5f7f7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%, #c8cac7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%)`
                                                            }}
                                                            ></div>
                                                    </div>
                                                    <div class="count" style={{fontWeight:"bold", color:"#ed197e"}}>
                                                        {topic.correct_count} of {topic.topic_count}
                                                    </div>
                                                 </div>
                                                <ul>
                                                    {topic.subtopics.map((subtopic) => (
                                                        <li key={subtopic._id}>
                                                            <div class="topicblock">
                                                                <div class="percentage2">
                                                                {((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%
                                                                </div>
                                                                <div class="topic_title">
                                                                     {subtopic.stopic_title} ({subtopic.stopic_code})
                                                                </div>
                                                                <div class="status_bar">
                                                                    <div
                                                                        class="progress"
                                                                        style={{
                                                                            background: `linear-gradient(to right, #c5f7f7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%, #c8cac7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%)`
                                                                        }}
                                                                        ></div>
                                                                </div>
                                                                <div class="count">
                                                                     {subtopic.status_count} of {subtopic.count}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            ))}        
                                            </div>
                                        </div>
                                        </>
                                    )}
                                    {ractiveTab === 'science_1' && (
                                        <>
                                            <div class="quiz-reports-tab">        
                                            <div>
                                            {results4.map((topic) => (
                                            <div key={topic._id}  class="topics_style_display">
                                                 <div class="topicblock">
                                                    <div class="percentage">
                                                        {((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%
                                                    </div>
                                                    <div class="topic_title">
                                                        {topic.topic_title} ({topic.topic_code})
                                                    </div>
                                                    <div class="status_bar">
                                                            <div
                                                            class="progress"
                                                            style={{
                                                                background: `linear-gradient(to right, #c5f7f7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%, #c8cac7 ${((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%)`
                                                            }}
                                                            ></div>
                                                    </div>
                                                    <div class="count" style={{fontWeight:"bold", color:"#ed197e"}}>
                                                        {topic.correct_count} of {topic.topic_count}
                                                    </div>
                                                 </div>
                                                <ul>
                                                    {topic.subtopics.map((subtopic) => (
                                                        <li key={subtopic._id}>
                                                            <div class="topicblock">
                                                                <div class="percentage2">
                                                                {((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%
                                                                </div>
                                                                <div class="topic_title">
                                                                     {subtopic.stopic_title} ({subtopic.stopic_code})
                                                                </div>
                                                                <div class="status_bar">
                                                                    <div
                                                                        class="progress"
                                                                        style={{
                                                                            background: `linear-gradient(to right, #c5f7f7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%, #c8cac7 ${((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%)`
                                                                        }}
                                                                        ></div>
                                                                </div>
                                                                <div class="count">
                                                                     {subtopic.status_count} of {subtopic.count}
                                                                </div>
                                                            </div>
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
export default ActScores;
