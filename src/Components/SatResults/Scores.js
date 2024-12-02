import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file
import LineChart from './LineChart';
import axios from "axios";
import Chart from 'chart.js';
import { Modal, Button } from 'react-bootstrap';
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Scores = () => { 
    const [showModal, setShowModal] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [questioninfo, setQuestionInfo] = useState('');
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [previousAnswers, setPreviousAnswers] = useState([]);
    const handleModalOpen = async (questionid) => {
        try { 
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}getquestion/${questionid}` 
          );
      
          if (response.status === 200) {
            console.log(response.data.trecords);
            setQuestionInfo(response.data.trecords);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      
        setShowModal(true);
      };
  
    const handleModalClose = () => {
      setShowModal(false);
    };
    const handleSave = () => {
      const changedAnswers = currentAnswers.filter((current, index) => 
        current.selectedAnswer !== previousAnswers[index].selectedAnswer
      );
    
      if (changedAnswers.length > 0) {
        // Call an API or save logic here, for example:
        //ssaveChangedAnswers(changedAnswers);
      } else {
        alert("No changes to save.");
      }
    
      // Update previous answers after saving
      setPreviousAnswers(currentAnswers);
    };
 
    

    const handleVideoOpen = async (questionid) => 
    {    
      try { 
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}getquestion/${questionid}` 
        );
    
        if (response.status === 200) {
          console.log(response.data.trecords);
          setQuestionInfo(response.data.trecords);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      setShowVideo(true);
    };

  const handleVideoClose = () => {
    setShowVideo(false);
  };
    
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
  
  // If student_id is not present in the URL, get it from localStorage
  
  let downloadUrl = `/send-sarreport/${id}`; 
  if (!userId) {
    userId = localStorage.getItem("userid");
  } 
  else 
  { 
    downloadUrl = `/send-sarreport/${id}?student_id=${userId}`; 
  }

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handlerTabClick = (tabId) => {
    rsetActiveTab(tabId);
  };

  const handleInnerTabClick = (index) => {
    setInnerActiveTab(index);
  };

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
      chtml: {
        minScale: 1.22,
      },
      options: {
        processHtml: true, // Enable processing of HTML tags
      },
    },
  };

  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [results3, setResults3] = useState([]);
  const [test_name, setTestName] = useState([]);
  const [ftest_name, setfTestName] = useState([]);
  const [vstatus, setVstatus] = useState([]);
  const [test_code, setTestCode] = useState([]);
  const [reading_count, setReadingCount] = useState([]);
  const [math_count, setMathCount] = useState([]);
  const [total_count, setTotalCount] = useState([]);
  const [mc1_count, setMc1Count] = useState([]);
  const [mc2_count, setMc2Count] = useState([]);
  const [tc_count, setTCCount] = useState([]);
  const [mw1_count, setMw1Count] = useState([]);
  const [mw2_count, setMw2Count] = useState([]);
  const [tw_count, setTWCount] = useState([]);
  const [mo1_count, setMo1Count] = useState([]);
  const [mo2_count, setMo2Count] = useState([]);
  const [to_count, setTOCount] = useState([]);
  const [mac1_count, setMac1Count] = useState([]);
  const [mac2_count, setMac2Count] = useState([]);
  const [tma_count, setTmaCount] = useState([]);
  const [mao1_count, setMao1Count] = useState([]);
  const [mao2_count, setMao2Count] = useState([]);
  const [tmao_count, setTMAOCount] = useState([]);
  const [maw1_count, setMaw1Count] = useState([]);
  const [maw2_count, setMaw2Count] = useState([]);
  const [tmw_count, setTMWCount] = useState([]);
  let indexModule1Section1 = 1;
  let indexModule2Section1 = 1;

  
  // Populate initial answers when the component loads (for example, using useEffect)
  useEffect(() => {
    const initialAnswers = data.map(item => ({
      id: item.id,
      selectedAnswer: item.selectedAnswer
    }));
    setPreviousAnswers(initialAnswers);
    setCurrentAnswers(initialAnswers);
  }, [data]);
  const handleInputChange = (e, id) => {
    const newAnswer = e.target.value;
    setCurrentAnswers(prev => prev.map(item => item.id === id 
      ? { ...item, selectedAnswer: newAnswer } 
      : item
    ));
  };
  
  const handleSelectChange = (e, id) => {
    const newAnswer = e.target.value;
    setCurrentAnswers(prev => prev.map(item => item.id === id 
      ? { ...item, selectedAnswer: newAnswer } 
      : item
    ));
  };
  const chartData = {
    labels: ['R&W 1', 'R&W 2', 'Math 1', 'Math 2'],
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
            mc1_count,
            mc2_count,
            mac1_count,
            mac2_count,
            27
        ]
    }],
  };
  
  useEffect(() => {
    getReport()
    gettests(id );
    getsweekness(id); 
    getsweekness3(id); 
  }, []);

  
  const [columnWidths, setColumnWidths] = useState({
    column1: "50%",
    column2: "50%",
  });
  
  const getReport = async () => {
    try { 
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsatreportbyuser/${userId}/${id}` 
      );
      if (response.status === 200) {  
        setTestCode(response.data.test_code); 
        setTestName(response.data.test_name); 
        setfTestName(response.data.ftest_name); 
        setVstatus(response.data.vstatus); 
        setReadingCount(response.data.readingCount); 
        setMathCount(response.data.mathCount); 
        setTotalCount(response.data.totalCount); 
        setMc1Count(response.data.mc1Count); 
        setMc2Count(response.data.mc2Count); 
        setTCCount(response.data.totalrCount); 
        setMw1Count(response.data.mw1Count); 
        setMw2Count(response.data.mw2Count); 
        setTWCount(response.data.totalwCount); 
        setMo1Count(response.data.mo1Count); 
        setMo2Count(response.data.mo2Count); 
        setTOCount(response.data.totaloCount);
        setMac1Count(response.data.mac1Count); 
        setMac2Count(response.data.mac2Count); 
        setTmaCount(response.data.totalmrCount);
        setMao1Count(response.data.mao1Count); 
        setMao2Count(response.data.mao2Count); 
        setTMAOCount(response.data.totalmaoCount);  
        setMaw1Count(response.data.maw1Count); 
        setMaw2Count(response.data.maw2Count); 
        setTMWCount(response.data.totalmwCount); 
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }; 

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
    const section_id = 1;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}/${userId}?section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults(response.data);
    }
  };  

  const getsweekness3 = async () => {  
    const section_id = 2;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}/${userId}?section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults3(response.data);
    }
  };  
  const [showDropdown, setShowDropdown] = useState(null);
  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);

  const handleDropdownToggle = (index) => {
    if (showDropdown === index) {
      setShowDropdown(null); // Close the dropdown if it's already open
    } else {
      setShowDropdown(index); // Open the dropdown for the clicked row
    }
  };
  const renderDropdownMenu = (index) => {
    if (showDropdown === index) {
      // Customize this function to render your dropdown menu items
      return (
        <div className="dropdown-tmenu">
          <button onClick={() => handleDropdownItemClick(index, 'Review')}>
                  Review
          </button>
          {isReviewPopupOpen && (
                <div className="review-popup">
                  <div>
                  <video width="640" height="300" controls>
                    <source src="/video.mov" type="video/quicktime" />
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
                <button onClick={closeReviewPopup}>Close</button>
                </div>
            )}
          <button onClick={() => handleDropdownItemClick(index, 'Questions')}>
                  Questions
          </button>
          {/* Add more actions as needed */}
        </div>
      );
    }
    return null;
  };
  const handleDropdownItemClick = (index, action) => {
    setReviewPopupOpen(true);
    setShowDropdown(null); // Close the dropdown after an action is clicked
  };
  // Function to close the popup
  const closeReviewPopup = () => {
    setReviewPopupOpen(false);
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
        <h1 style={{textAlign:"center"}}>{test_name} - SCORE DETAILS</h1> 
        <div className="middle_container">
             <div className="page-content">
                <div className="tabbed">
                    <input type="radio" id="tab1" name="css-tabs" checked={activeTab === 0} />
                    <input type="radio" id="tab2" name="css-tabs" checked={activeTab === 1} />
                    <input type="radio" id="tab3" name="css-tabs" checked={activeTab === 2} />
                    <input type="radio" id="tab4" name="css-tabs" checked={activeTab === 3} />

                    <ul className="tabs">
                        <li className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
                            <label>Score</label>
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
                        <li className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
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
                                                <div class="sc_head">Reading & Writing Score</div>
                                                <div class="rsatprogress-bar satprogress" role="progressbar" aria-valuenow="100" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{reading_count}<br/></span>
                                                    200-800
                                                </div>
                                            </div>
                                            <div class="block">
                                                <div class="sc_head">Total Score</div>
                                                <div class="rsatprogress-bar2 satprogress" role="progressbar" aria-valuenow="75" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{total_count}<br/></span>
                                                    400-1600   
                                                </div>
                                            </div>
                                            <div class="block" style={{ marginTop: '40px' }}>
                                                <div class="sc_head">Math Score</div>
                                                <div class="rsatprogress-bar3 satprogress" role="progressbar" aria-valuenow="75" 
                                                aria-valuemin="0" aria-valuemax="100">
                                                    <span>{math_count}<br/></span>
                                                    200-800
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                </div> 
                                <div class="test_scores_text">
                                     These test scores should be understood as <strong>estimates</strong> and <strong>not predictions</strong> of real SAT performance. Your scores may change as we collect more student data and revise our materials and scoring scale.
                                </div>
                                <div class="satmods">
                                        <div class="rounds">
                                            <div class="rwtitle">Reading & Writing</div>
                                            <div class="rowround">
                                                <div class="colname">
                                                    &nbsp;
                                                </div>
                                                <div class="colname">
                                                    M1
                                                </div>
                                                <div class="colname">
                                                    M2
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
                                                    <span class="fixwidth">{mc1_count}</span>
                                                </div>
                                                <div class="colname satgreen">
                                                    <span class="fixwidth">{mc2_count}</span>
                                                </div>
                                                <div class="colname satgreen">
                                                    <span class="fixwidth">{tc_count}</span>
                                                </div>
                                            </div>  
                                            <div class="rowround">
                                                <div class="colname satred">
                                                    # Incorrect
                                                </div>
                                                <div class="colname satred">
                                                    <span class="fixwidth">{mw1_count}</span>
                                                </div>
                                                <div class="colname satred">
                                                    <span class="fixwidth">{mw2_count}</span>
                                                </div>
                                                <div class="colname satred">
                                                    <span class="fixwidth">{tw_count}</span>
                                                </div>
                                            </div>                
                                            <div class="rowround">
                                                <div class="colname satorange">
                                                    # Omitted
                                                </div>
                                                <div class="colname satorange">
                                                     <span class="fixwidth">{mo1_count}</span>
                                                </div>
                                                <div class="colname satorange">
                                                     <span class="fixwidth">{mo2_count}</span>
                                                </div>
                                                <div class="colname satorange">
                                                     <span class="fixwidth">{to_count}</span>
                                                </div>
                                            </div> 
                                            <div class="final_score">
                                                Score {reading_count}
                                            </div>
                                        </div>
                                        <div class="rounds">
                                            <div class="rwtitle">Math</div>
                                            <div class="rowround">
                                                <div class="colname">
                                                    &nbsp;
                                                </div>
                                                <div class="colname">
                                                    M1
                                                </div>
                                                <div class="colname">
                                                    M2
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
                                                    <span class="fixwidth">{mac1_count}</span>
                                                </div>
                                                <div class="colname satgreen">
                                                    <span class="fixwidth">{mac2_count}</span>
                                                </div>
                                                <div class="colname satgreen">
                                                    <span class="fixwidth">{tma_count}</span>
                                                </div>
                                            </div>  
                                            <div class="rowround">
                                                <div class="colname satred">
                                                    # Incorrect
                                                </div>                                                
                                                <div class="colname satred">
                                                    <span class="fixwidth">{maw1_count}</span>
                                                </div>
                                                <div class="colname satred">
                                                    <span class="fixwidth">{maw2_count}</span>
                                                </div>
                                                <div class="colname satred">
                                                    <span class="fixwidth">{tmw_count}</span>
                                                </div>
                                            </div>                
                                            <div class="rowround">
                                                <div class="colname satorange">
                                                    # Omitted
                                                </div>
                                                <div class="colname satorange">
                                                    <span class="fixwidth">{mao1_count}</span>
                                                </div>
                                                <div class="colname satorange">
                                                    <span class="fixwidth">{mao2_count}</span>
                                                </div>
                                                <div class="colname satorange">
                                                    <span class="fixwidth">{tmao_count}</span>
                                                </div>
                                            </div> 
                                            <div class="final_score">
                                                 Score {math_count}
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
                                                    <div className="label">R&W 1</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(mc1_count / 27) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((mc1_count / 27) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">R&W 2</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(mc2_count / 27) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((mc2_count / 27) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">Math 1</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(mac1_count / 22) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((mac1_count / 22) * 100).toFixed(2)}%`}</div>
                                                </div>
                                                <div className="bar-container">
                                                    <div className="label">Math 2</div>
                                                    <div className="bar-wrapper">
                                                    <div className="bar" style={{ width: `${(mac2_count / 22) * 100}%` }}>
                                                    </div>
                                                    </div>
                                                    <div className="percentage">{`${((mac2_count / 22) * 100).toFixed(2)}%`}</div>
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
                                        <div className="number">54</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tc_count}</div>
                                        Correct 
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{to_count}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tw_count}</div>
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
                                            {vstatus === true && (
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Video Review</div>
                                                </div>
                                            </th>
                                            )}
                                            <th data-tid="answers" style={{ flex: '2 1 0%', minWidth: '150px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default', textAlign: 'center'}}>
                                                View Question
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            {data
                                            .filter((item) => item.section_id == 1)
                                            .map((item, index) => {
                                            let currentIndex;
                                            let moduleName;
                                            if (item.module_id == 1) {
                                                currentIndex = indexModule1Section1++;
                                                moduleName = 'Module 1';
                                            } else if (item.module_id == 2) {
                                                currentIndex = indexModule2Section1++;
                                                moduleName = 'Module 2';
                                            }
                                            const isFirstRow = currentIndex === 1;
                                            return (
                                            <>{isFirstRow && (
                                                <tr key={`special-row-${index}`}>
                                                  <td class="sprow" colSpan="7" align="center">
                                                    <strong>{moduleName}</strong>
                                                  </td>
                                                </tr>
                                              )}
                                                <tr key={index} class="custom-table-row">
                                                        <td style={{ textAlign: 'center' }}>{currentIndex}</td>
                                                        <td style={{ textAlign: 'left' }}>{item.topic_title}</td>
                                                        <td style={{ textAlign: 'left' }}>{item.stopic_title}</td>
                                                        <td style={{ textAlign: 'center'}}>
                                                            {item.correct_answer}
                                                        </td> 
                                                        <td className='innertabs' style={{ textAlign: 'center' }}>
                                                            <div style={{
                                                                width: '100px',
                                                                textAlign: 'center',
                                                                margin: '0px auto'
                                                            }}>
                                                                {item.gridline ? (
                                                                    // Display a textbox if gridline is true
                                                                    <input
                                                                        type="text"
                                                                        value={item.selectedAnswer}
                                                                        style={{
                                                                            padding: '5px',
                                                                            borderRadius: '5px',
                                                                            marginRight: '5px',
                                                                            color: item.status === true ? 'green' : 'red',
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    // Display A, B, C, D options if gridline is false
                                                                    <select
                                                                        value={item.selectedAnswer}
                                                                        style={{
                                                                            padding: '5px 10px',
                                                                            borderRadius: '5px',
                                                                            marginRight: '5px',
                                                                            color: item.status === true ? 'green' : 'red',
                                                                        }}
                                                                    >
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                        <option value="D">D</option>
                                                                    </select>
                                                                )}
                                                            </div>
                                                        </td>
                                                        {vstatus === true && (
                                                        <td style={{cursor:"pointer",textAlign: "center"}} onClick={() => handleVideoOpen(item._id)}>
                                                            <img src="https://c0.klipartz.com/pngpicture/905/603/gratis-png-logotipo-del-icono-de-la-camara-icono-de-video-ico-fondo-del-icono-de-video.png" width="25px" />
                                                        </td>
                                                        )}
                                                        <td style={{ textAlign: 'center' }}>
                                                            <a href="#" onClick={() => handleModalOpen(item._id)}>View</a>
                                                        </td>
                                                    </tr></>
                                            );
                                            })}
                                    </tbody>
                                    <tfoot>
                                        <tr style={{verticalAlign:"top", fontWeight:"bold"}}>
                                            <th>
                                                &nbsp;
                                            </th>
                                            <th>
                                                &nbsp;
                                            </th>
                                            <th>
                                                &nbsp;
                                            </th>
                                            <th>
                                                &nbsp;
                                            </th>
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                  <input 
                                                      type="submit" 
                                                      value="Save" 
                                                      class="btn btn-success" 
                                                      onClick={handleSave} // Add onClick handler
                                                    />
                                            </th>
                                            {vstatus === true && (
                                            <th>
                                                &nbsp;
                                            </th>
                                            )}
                                            <th>
                                                &nbsp;
                                            </th>
                                        </tr>
                                    </tfoot>
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
                                        <div className="number">44</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tma_count}</div>
                                        Correct
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tmao_count}</div>
                                        Omitted
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tmw_count}</div>
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
                                            {vstatus === true && (
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Video Review</div>
                                                </div>
                                            </th>
                                            )}
                                            <th data-tid="answers" style={{ flex: '2 1 0%', minWidth: '150px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default', textAlign: 'center'}}>
                                                View Question
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {data
                                            .filter((item) => item.section_id == 2)
                                            .map((item, index) => {
                                                let currentIndex;
                                                let moduleName;
                                                if (item.module_id == 1) {
                                                    currentIndex = indexModule1Section1++;
                                                    moduleName = 'Module 1';
                                                } else if (item.module_id == 2) {
                                                    currentIndex = indexModule2Section1++;
                                                    moduleName = 'Module 2';
                                                }
                                                const isFirstRow = currentIndex === 1;
                                                return (
                                                <>{isFirstRow && (
                                                    <tr key={`special-row-${index}`}>
                                                      <td class="sprow" colSpan="7" align="center">
                                                        <strong>{moduleName}</strong>
                                                      </td>
                                                    </tr>
                                                  )}
                                                <tr key={index} class="custom-table-row">
                                                    <td style={{ textAlign: 'center'}}>{currentIndex}</td>
                                                    <td style={{ textAlign: 'left'}}>{item.topic_title}</td>
                                                    <td style={{ textAlign: 'left'}}>{item.stopic_title}</td>
                                                    <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                        {Array.isArray(item.correct_answer) ? (
                                                          <div key={index}>{item.correct_answer[0]}</div>
                                                        ) : (
                                                          <div>{item.correct_answer}</div>
                                                        )}
                                                    </td>
                                                    <td className='innertabs' style={{ textAlign: 'center'}}>
                                                        <div style={{
                                                                width: '100px',
                                                                textAlign:'left',
                                                                margin:'0px auto'
                                                            }}>
                                                            <span style={{
                                                                padding: '5px 10px',
                                                                borderRadius: '5px',
                                                                marginRight:'5px',
                                                                color: item.status == true ? 'green' : 'red',
                                                            }}>
                                                                {item.selectedAnswer}
                                                            </span>
                                                        </div>
                                                    </td> 
                                                    {vstatus === true && (                                        
                                                    <td style={{cursor:"pointer",textAlign: "center"}} onClick={() => handleVideoOpen(item._id)}>
                                                        <img src="https://c0.klipartz.com/pngpicture/905/603/gratis-png-logotipo-del-icono-de-la-camara-icono-de-video-ico-fondo-del-icono-de-video.png" width="25px"/>
                                                    </td>)}
                                                    <td style={{ textAlign: 'center'}}>
                                                        <div style={{ display: 'none'}} className="dropdown-container">
                                                            <i
                                                                className="fa fa-ellipsis-v"
                                                                onClick={() => handleDropdownToggle(index)}
                                                            ></i>
                                                            {renderDropdownMenu(index)}
                                                        </div>
                                                        <a href="#" onClick={() => handleModalOpen(item._id)}>View</a>
                                                    </td>
                                                </tr></>
                                            );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                    </>
                    )} 

                    {activeTab === 3 && (
                        <>
                         <div>
                            <div className="quiz-reports-tab-wrapper">
                                <div className="quiz-reports-nav" quiz_nid="434200" quiz_title="DSAT Test 2: Reading & Writing - Mod 2E">
                                    <ul style={{paddingLeft:"0px"}}>
                                        <li id="reading_1">
                                            <a  className={ractiveTab === 'reading_1' ? 'active' : ''} onClick={() => handlerTabClick('reading_1')}
                                            >
                                                Reading & Writing
                                            </a>
                                        </li> 
                                        <li id="math_1" >
                                            <a className={ractiveTab === 'math_1' ? 'active' : ''} onClick={() => handlerTabClick('math_1')}
                                            >
                                                Math
                                            </a>
                                        </li> 
                                    </ul>
                                </div>
                                <br clear="all" />
                                <div className="quiz-reports-tab">
                                    {ractiveTab === 'reading_1' && (
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
                                </div>
                            </div>
                        </div>
                    </>
                    )} 
                    {/* Bootstrap Modal */}

                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                               Question No: {questioninfo[0]?.question_number} 
                        </Modal.Header>
                        <Modal.Body>
                        <div className="col-12" style={{ padding: '0px 20px' }}>
                            {questioninfo.length > 0 &&
                            (questioninfo[0]?.section_type === "2" &&
                            questioninfo[0]?.figurestatus === "false" ? null : (
                                <div className="col-6 column" 
                                style={{
                                    borderRight: '2px solid rgb(102, 102, 102)',
                                    height: '500px',
                                    overflow: 'auto',
                                    paddingRight: '20px',
                                    width: '50%',
                                    display: 'block'
                                }}>
                                 
                                <div style={{ marginRight: '20px' }}> 
                                    <div className="passage_test"style={{ paddingBottom: '20px', paddingRight: '20px' }}
                                            dangerouslySetInnerHTML={{
                                                __html: questioninfo[0]?.passage || '',
                                            }}
                                        />
                                </div>
                                {questioninfo[0]?.figure !== "" && (
                                        <div
                                        style={{
                                            marginBottom: "10px",
                                            textAlign: "center",
                                        }}
                                        >
                                        <img
                                            src={questioninfo[0]?.figure}
                                            alt="Question Figure"
                                        />
                                        </div>
                                    )}
                            </div>))}
                            <div className="col-6 column"
                                  style={{
                                    paddingLeft: "20px",
                                    width: columnWidths.column2,
                                    margin:
                                      questioninfo[0]?.section_type === "2" &&
                                      questioninfo[0]?.figurestatus === "false"
                                        ? "0px auto"
                                        : "",
                                    float:
                                      questioninfo[0]?.section_type === "2" &&
                                      questioninfo[0]?.figurestatus === "false"
                                        ? "none"
                                        : "left",
                                  }}>
                                 
                                <div style={{ paddingBottom: '5px', paddingTop: '10px' }}> 
                                    
                                {questioninfo[0]?.equation && (
                                      <>
                                        <div>
                                          <MathJaxContext
                                            version={3}
                                            config={config}
                                          >
                                            <MathJax
                                              inline
                                              dynamic
                                              hideUntilTypeset={"first"}
                                            >
                                              <div
                                                style={{ textAlign: "center" }}
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                  questioninfo[0]?.equation,
                                                }}
                                              />
                                            </MathJax>
                                          </MathJaxContext>
                                        </div>
                                        <br />
                                      </>
                                    )}
                                    {questioninfo[0]?.question_type ===
                                    "Math" ? (
                                      <MathJaxContext
                                        version={3}
                                        config={config}
                                      >
                                        <MathJax
                                          inline
                                          dynamic
                                          hideUntilTypeset={"first"}
                                        >
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                              questioninfo[0]?.question_text,
                                            }}
                                          />
                                        </MathJax>
                                      </MathJaxContext>
                                    ) : (
                                      // Render something else if sectionModule is not 2
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                          questioninfo[0]?.question_text,
                                        }}
                                      />
                                    )}
                                </div>
                                {questioninfo[0]?.section_type === "2" &&
                                  questioninfo[0]?.question_type === "Math" &&
                                  questioninfo[0].isgridIn.toLowerCase() ===
                                    "true" ? (
                                    <div style={{ fontSize: "20px",textAlign:"center" }}>
                                        
                                      <span style={{textAlign:"center"}} className="answer_preview">
                                           <strong>Correct Answer:</strong> {questioninfo[0].correct_answer}
                                      </span>
                                    </div>
                                  ) : (
                                <ul className="question_ans scrollable-container">
                                    <div className="flex items-center justify-center" style={{ paddingBottom: '15px' }}>
                                        <div style={{
                                            background: questioninfo[0]?.correct_answer === 'A' ? 'green' : 'inherit',
                                            color: questioninfo[0]?.correct_answer === 'A' ? '#FFF' : 'inherit',
                                        }}
                                        id="A" className="flex border w-full rounded-lg px-2 
                                        border-gray-500 false">
                                        <div className="rounded-full h-[30px] w-[30px] flex items-center justify-center mr-5">
                                            <label className="radio-label">
                                            <input type="radio" name="answer" />
                                            <label className="letter">A</label>
                                            </label>
                                        </div>
                                        <div>
                                        <span>
                                                  {questioninfo[0]?.question_type ===
                                                  "Math" ? (
                                                    <MathJaxContext
                                                      version={3}
                                                      config={config}
                                                    >
                                                      <MathJax
                                                        inline
                                                        dynamic
                                                        hideUntilTypeset={
                                                          "first"
                                                        }
                                                      >
                                                        {
                                                          questioninfo[0]?.choice_a
                                                        }
                                                      </MathJax>
                                                    </MathJaxContext>
                                                  ) : (
                                                    // Render something else if sectionModule is not 2
                                                    <span>
                                                      <div
                                                         dangerouslySetInnerHTML={{
                                                            __html: questioninfo[0]?.choice_a || '',
                                                        }}/>{" "}
                                                    </span>
                                                  )}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center" style={{ paddingBottom: '15px' }}>
                                        <div style={{
                                            background: questioninfo[0]?.correct_answer === 'B' ? 'green' : 'inherit',
                                            color: questioninfo[0]?.correct_answer === 'B' ? '#FFF' : 'inherit',
                                        }} id="B" className="flex border w-full rounded-lg px-2 border-gray-500 false">
                                        <div className="rounded-full h-[30px] w-[30px] flex items-center justify-center mr-5">
                                            <label className="radio-label">
                                            <input type="radio" name="answer" />
                                            <label className="letter">B</label>
                                            </label>
                                        </div>
                                        <div> 
                                        <span>
                                                  {questioninfo[0]?.question_type ===
                                                  "Math" ? (
                                                    <MathJaxContext
                                                      version={3}
                                                      config={config}
                                                    >
                                                      <MathJax
                                                        inline
                                                        dynamic
                                                        hideUntilTypeset={
                                                          "first"
                                                        }
                                                      >
                                                        {
                                                          questioninfo[0]?.choice_b
                                                        }
                                                      </MathJax>
                                                    </MathJaxContext>
                                                  ) : (
                                                    // Render something else if sectionModule is not 2
                                                    <span>
                                                      <div
                                                         dangerouslySetInnerHTML={{
                                                            __html: questioninfo[0]?.choice_b || '',
                                                        }}/>{" "}
                                                    </span>
                                                  )}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center" style={{ paddingBottom: '15px' }}>
                                        <div style={{
                                            background: questioninfo[0]?.correct_answer === 'C' ? 'green' : 'inherit',
                                            color: questioninfo[0]?.correct_answer === 'C' ? '#FFF' : 'inherit',
                                        }} id="C" className="flex border w-full rounded-lg px-2 border-gray-500 false">
                                        <div className="rounded-full h-[30px] w-[30px] flex items-center justify-center mr-5">
                                            <label className="radio-label">
                                            <input type="radio" name="answer" />
                                            <label className="letter">C</label>
                                            </label>
                                        </div>
                                        <div> 
                                            <span>
                                                  {questioninfo[0]?.question_type ===
                                                  "Math" ? (
                                                    <MathJaxContext
                                                      version={3}
                                                      config={config}
                                                    >
                                                      <MathJax
                                                        inline
                                                        dynamic
                                                        hideUntilTypeset={
                                                          "first"
                                                        }
                                                      >
                                                        {
                                                          questioninfo[0]?.choice_c
                                                        }
                                                      </MathJax>
                                                    </MathJaxContext>
                                                  ) : (
                                                    // Render something else if sectionModule is not 2
                                                    <span>
                                                      <div
                                                         dangerouslySetInnerHTML={{
                                                            __html: questioninfo[0]?.choice_c || '',
                                                        }}/>{" "}
                                                    </span>
                                                  )}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center" style={{ paddingBottom: '15px' }}>
                                        <div style={{
                                            background: questioninfo[0]?.correct_answer === 'D' ? 'green' : 'inherit',
                                            color: questioninfo[0]?.correct_answer === 'D' ? '#FFF' : 'inherit',
                                        }} id="D" className="flex border w-full rounded-lg px-2 border-gray-500 false">
                                        <div className="rounded-full h-[30px] w-[30px] flex items-center justify-center mr-5">
                                            <label className="radio-label">
                                            <input type="radio" name="answer" />
                                            <label className="letter">D</label>
                                            </label>
                                        </div>
                                        <div>
                                            <span>
                                                  {questioninfo[0]?.question_type ===
                                                  "Math" ? (
                                                    <MathJaxContext
                                                      version={3}
                                                      config={config}
                                                    >
                                                      <MathJax
                                                        inline
                                                        dynamic
                                                        hideUntilTypeset={
                                                          "first"
                                                        }
                                                      >
                                                        {
                                                          questioninfo[0]?.choice_d
                                                        }
                                                      </MathJax>
                                                    </MathJaxContext>
                                                  ) : (
                                                    // Render something else if sectionModule is not 2
                                                    <span>
                                                      <div
                                                         dangerouslySetInnerHTML={{
                                                            __html: questioninfo[0]?.choice_d || '',
                                                        }}/>{" "}
                                                    </span>
                                                  )}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                </ul>
                               )}
                            </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showVideo} onHide={handleVideoClose}>
                        <Modal.Header closeButton>
                               Question No: {questioninfo[0]?questioninfo[0].question_number:""} 
                        </Modal.Header>
                        <Modal.Body>
                        <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                            <video width="640" height="300" controls> 
                                <source
  src={`/satvideos/${test_code}/${questioninfo[0] && questioninfo[0].section_type == 1 ? 'V' : 'M'}${questioninfo[0] ? questioninfo[0].module_type : ""}/MOV/${ftest_name}_M${questioninfo[0] ? questioninfo[0].module_type : ""}_${questioninfo[0] && questioninfo[0].section_type == 1 ? 'RW' : 'Math'}_${questioninfo[0] ? questioninfo[0].question_number : ""}.mp4`}
  type="video/quicktime"
/>

<source
  src={`/satvideos/${test_code}/${questioninfo[0] && questioninfo[0].section_type == 1 ? 'V' : 'M'}${questioninfo[0] ? questioninfo[0].module_type : ""}/MP4/${ftest_name}_M${questioninfo[0] ? questioninfo[0].module_type : ""}_${questioninfo[0] && questioninfo[0].section_type == 1 ? 'RW' : 'Math'}_${questioninfo[0] ? questioninfo[0].question_number : ""}.mp4`}
  type="video/mp4"
/>

                                Your browser does not support the video tag.
                            </video>                          
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
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
