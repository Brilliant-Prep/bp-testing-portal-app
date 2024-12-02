import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file
import LineChart from './LineChart';
import axios from "axios";
import Chart from 'chart.js';

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
  const [results3, setResults3] = useState([]);
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
            mac2_count
        ]
    }],
  };
  
  useEffect(() => {
    getReport()
    gettests(id );
    getsweekness(id); 
    getsweekness3(id); 
  }, []);
  
  const getReport = async () => {
    try { 
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsatreportbyuser/${userId}/${id}` 
      );
      if (response.status === 200) {  
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
    const module_id = 1; // replace with the actual module_id
    const section_id = 1;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?section_id=${section_id}` 
      );
    if (response.status === 200) {
        setResults(response.data);
    }
  };  

  const getsweekness3 = async () => { 
    const module_id = 1; // replace with the actual module_id
    const section_id = 2;
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsweekness/${id}?section_id=${section_id}` 
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
        <div style={{float:"right",color:"pink"}}><a href="/send-sarreport/65797643daa8c5ddc505f662">Download Report</a></div>
        <h1 style={{textAlign:"center"}}>SCORE DETAILS</h1>
        <h6 style={{textAlign:"center"}}>SAT Practice 2</h6>
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
                                <div class="card-body pdf_score"> 
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
                                                    {mc1_count}
                                                </div>
                                                <div class="colname satgreen">
                                                    {mc2_count}
                                                </div>
                                                <div class="colname satgreen">
                                                    {tc_count}
                                                </div>
                                            </div>  
                                            <div class="rowround">
                                                <div class="colname satred">
                                                    # Incorrect
                                                </div>
                                                <div class="colname satred">
                                                    {mw1_count}
                                                </div>
                                                <div class="colname satred">
                                                    {mw2_count}
                                                </div>
                                                <div class="colname satred">
                                                    {tw_count}
                                                </div>
                                            </div>                
                                            <div class="rowround">
                                                <div class="colname satorange">
                                                    # Omitted
                                                </div>
                                                <div class="colname satorange">
                                                    {mo1_count}
                                                </div>
                                                <div class="colname satorange">
                                                    {mo2_count}
                                                </div>
                                                <div class="colname satorange">
                                                    {to_count}
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
                                                    {mac1_count}
                                                </div>
                                                <div class="colname satgreen">
                                                    {mac2_count}
                                                </div>
                                                <div class="colname satgreen">
                                                    {tma_count}
                                                </div>
                                            </div>  
                                            <div class="rowround">
                                                <div class="colname satred">
                                                    # Incorrect
                                                </div>                                                
                                                <div class="colname satred">
                                                    {maw1_count}
                                                </div>
                                                <div class="colname satred">
                                                    {maw2_count}
                                                </div>
                                                <div class="colname satred">
                                                    {tmw_count}
                                                </div>
                                            </div>                
                                            <div class="rowround">
                                                <div class="colname satorange">
                                                    # Omitted
                                                </div>
                                                <div class="colname satorange">
                                                    {mao1_count}
                                                </div>
                                                <div class="colname satorange">
                                                    {mao2_count}
                                                </div>
                                                <div class="colname satorange">
                                                    {tmao_count}
                                                </div>
                                            </div> 
                                            <div class="final_score">
                                                 Score {math_count}
                                            </div>
                                        </div>
                                </div>

                                <div class="satmods">
                                        <div class="rounds noborder">
                                            <h3>Performance</h3>
                                            <div className="chart">
                                            <LineChart data={chartData} />
                                            </div>
                                        </div>
                                        <div class="rounds noborder">
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
                                        Correct  Answers
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tw_count+to_count}</div>
                                        Incorrect Answers
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
                                            <th data-tid="answers" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer', paddingRight: '30px', textAlign: 'center'}}>
                                                Your Answer
                                            </th>
                                            <th data-tid="correct_answer" style={{ flex: '1 1 0%', minWidth: '130px', cursor: 'pointer'}}>
                                                <div class="centered-row row-center-items" style={{ position: "relative", textAlign: 'center' }}>
                                                    <div>Correct Answer</div>
                                                </div>
                                            </th>
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Video Review</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '2 1 0%', minWidth: '150px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default', textAlign: 'center'}}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (item.section_id == 1 ? (
                                            <tr key={index} class="custom-table-row">
                                                <td style={{ textAlign: 'center'}}>{index+1}</td>
                                                <td style={{ textAlign: 'left'}}>{item.topic_title}</td>
                                                <td style={{ textAlign: 'left'}}>{item.stopic_title}</td>
                                                <td className='innertabs' style={{ textAlign: 'center'}}>
                                                    <div style={{
                                                            width: '100px',
                                                            textAlign:'center',
                                                            margin:'0px auto'
                                                        }}>
                                                        <span style={{
                                                            padding: '5px 10px',
                                                            borderRadius: '5px',
                                                            marginRight:'5px',
                                                            color: item.selectedAnswer === item.correct_answer ? 'green' : 'red',
                                                        }}>
                                                            {item.selectedAnswer}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'center'}}>
                                                    {item.correct_answer}
                                                </td>                                                
                                                <td style={{ textAlign: 'left'}}>
                                                    <img src="https://c0.klipartz.com/pngpicture/905/603/gratis-png-logotipo-del-icono-de-la-camara-icono-de-video-ico-fondo-del-icono-de-video.png" width="25px"/>
                                                </td>
                                                <td style={{ textAlign: 'center'}}><i class="fa fa-ellipsis-v"></i></td>
                                            </tr>
                                            ) : null) )}
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
                                        <div className="number">44</div>
                                        Total Questions
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tma_count}</div>
                                        Correct  Answers
                                    </div>
                                    <div className="group-block">
                                        <div className="number">{tmao_count+tmw_count}</div>
                                        Incorrect Answers
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
                                            <th data-tid="problem_no" style={{ flex: '1 1 0%', minWidth: '100px', cursor: 'pointer' }}>
                                                <div className="centered-row row-center-items" style={{ position: 'relative' }}>
                                                    <div>Video Review</div>
                                                </div>
                                            </th>
                                            <th data-tid="answers" style={{ flex: '2 1 0%', minWidth: '150px', cursor: 'flex: 2 1 0%', minWidth: '50px', cursor: 'default', textAlign: 'center'}}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {data.map((item, index) => (item.section_id == 2 ? (
                                            <tr key={index} class="custom-table-row">
                                                <td style={{ textAlign: 'center'}}>{index- 53}</td>
                                                <td style={{ textAlign: 'left'}}>{item.topic_title}</td>
                                                <td style={{ textAlign: 'left'}}>{item.stopic_title}</td>
                                                <td style={{ textAlign: 'center'}}>{item.correct_answer}</td>
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
                                                            color: item.selectedAnswer === item.correct_answer ? 'green' : 'red',
                                                        }}>
                                                            {item.selectedAnswer}
                                                        </span>
                                                    </div>
                                                </td>                                               
                                                <td style={{ textAlign: 'left'}}>
                                                    <img src="https://c0.klipartz.com/pngpicture/905/603/gratis-png-logotipo-del-icono-de-la-camara-icono-de-video-ico-fondo-del-icono-de-video.png" width="25px"/>
                                                </td>
                                                <td style={{ textAlign: 'center'}}>
                                                    <div className="dropdown-container">
                                                        <i
                                                            className="fa fa-ellipsis-v"
                                                            onClick={() => handleDropdownToggle(index)}
                                                        ></i>
                                                        {renderDropdownMenu(index)}
                                                    </div>
                                                </td>
                                            </tr>
                                            ) : null) )}
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
                                                    <div class="count">
                                                        {topic.topic_count}  of  {topic.correct_count}
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
                                                                     {subtopic.count}  of  {subtopic.status_count}
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
                                                    <div class="count">
                                                        {topic.topic_count}  of  {topic.correct_count}
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
                                                                     {subtopic.count}  of  {subtopic.status_count}
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
export default Scores;
