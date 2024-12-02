import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LineChart from './LineChart';
import axios from "axios"; 

const HTMLToPDF = () => {

  
  useEffect(() => {
    getReport()  
    gettests(id) 
    getsweekness(id); 
    getsweekness2(id);
    getsweekness3(id);  
}, []);
const { id } = useParams();
const [data, setData] = useState([]);
const [results, setResults] = useState([]);
const [results2, setResults2] = useState([]);
const [results3, setResults3] = useState([]);
const userId = localStorage.getItem("userid");
const first_name = localStorage.getItem("first_name");
const last_name = localStorage.getItem("last_name");
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
        backgroundColor: window.chartColors.green,
        borderColor: window.chartColors.green,
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

const getsweekness = async () => { 
  const module_id = 1; // replace with the actual module_id
  const section_id = 1;
  const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getsweekness2/${id}?section_id=${section_id}&module_id=${module_id}` 
    );
  if (response.status === 200) {
      setResults(response.data);
  }
};  
const getsweekness2 = async () => { 
  const module_id = 2; // replace with the actual module_id
  const section_id = 1;
  const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getsweekness2/${id}?section_id=${section_id}&module_id=${module_id}` 
    );
  if (response.status === 200) {
      setResults2(response.data);
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
  const handleDownload = () => {
    // Apply print-specific styles
    const content = document.getElementById('pdf-content');
    content.style.display = 'block';

    // Open the print dialog
    window.print();

    // Restore the original styles
    content.style.display = 'none';
  };

  return (    
    <div class="sat-pdf-print">
        <div id="pdf-content">
            <div>
              <div class="card-body pdf_score" style={{paddingTop:"20px", pageBreakBefore: "always"}}> 
                  <div class="logo">
                        <img src="/images/logo.png" border="0"/>
                  </div>
                  <div class="headding">
                        <h1>SAT Diagnostic Report</h1>
                  </div>
                  <div class="row"> 
                        <div class="col_address">
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>

                  <div class="row d-flex justify-content-center mt-100">
                      <div class="col-md-12">
                          <div className="sections-score-wrapper" style={{ display: 'flex' }}>
                            <div class="block" style={{ marginTop: '40px' }}>
                                <div class="sc_head">Reading & Writing Score</div>
                                <div class="satprogress-bar1 satprogress" role="progressbar" aria-valuenow="100" 
                                aria-valuemin="0" aria-valuemax="100">
                                    <span>{reading_count}<br/></span>
                                    200-800
                                </div>
                            </div>
                            <div class="block">
                                <div class="sc_head">Total Score</div>
                                <div class="satprogress-bar2 satprogress" role="progressbar" aria-valuenow="75" 
                                aria-valuemin="0" aria-valuemax="100">
                                    <span>{total_count}<br/></span>
                                    400-1600   
                                </div>
                            </div>
                            <div class="block" style={{ marginTop: '40px' }}>
                                <div class="sc_head">Math Score</div>
                                <div class="satprogress-bar3 satprogress" role="progressbar" aria-valuenow="75" 
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
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>

                  <div class="row d-flex justify-content-center mt-100" style={{paddingTop:"20px"}}>
                      <div class="col-md-12">
                         <div className="sections-score-wrapper" style={{ display: 'flex' }}> 
                                <div class="page2_block" style={{display:"block",lineHeight:"30px"}}>
                                    Total Score<br/>
                                    <div class="total_score">{reading_count}</div>
                                </div>
                                <div class="page2_block">
                                    <div class="col-left">
                                        <span class="satgreen">Correct</span><br/>
                                        <span class="satred">Incorrect</span><br/>
                                        <span class="satorange">Ommitted</span><br/>
                                    </div>
                                    <div class="col-right">
                                        <span class="satgreen">{tc_count}</span><br/>
                                        <span class="satred">{tw_count}</span><br/>
                                        <span class="satorange">{to_count}</span><br/>
                                    </div>
                                </div>
                                <div class="page2_block">
                                    <div class="col-left">
                                        Raw Points<br/>
                                        % Correct<br/>
                                    </div>
                                    <div class="col-right">
                                        {tc_count}<br/>
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
                                    {data.map((item, index) => (item.section_id == 1 && item.module_id == 1 ? (
                                    <tr>
                                    <td>
                                        {index+1}
                                    </td>
                                    <td bgcolor="#EAE8E8">
                                        {item.selectedAnswer}
                                    </td>
                                    <td>
                                        {item.correct_answer}
                                    </td>
                                    <td bgcolor="#EAE8E8">
                                        {item.difficulty}
                                    </td>
                                    <td>
                                        {item.stopic_code}
                                    </td>
                                </tr>) : null) )}
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
                                    {data.map((item, index) => (item.section_id == 1 && item.module_id == 2 ? (
                                    <tr>
                                    <td>
                                        {index - 26}
                                    </td>
                                    <td bgcolor="#EAE8E8">
                                        {item.selectedAnswer}
                                    </td>
                                    <td>
                                        {item.correct_answer}
                                    </td>
                                    <td bgcolor="#EAE8E8">
                                        {item.difficulty}
                                    </td>
                                    <td>
                                        {item.stopic_code}
                                    </td>
                                </tr>) : null) )}
                            </table>
                        </div>
                  </div> 
              </div>
            </div>
            <div style={{paddingTop:"20px"}}>
              <div class="card-body pdf_score">  
                  <div class="logo">
                        <img src="/images/logo.png" border="0"/>
                  </div>
                  <div class="headding">
                        <h2>Strength & Weaknesses</h2>
                        <h5>Reading & Writing - Module 1</h5>
                  </div>
                  <div class="row"> 
                        <div class="col_address">
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>

                  <div class="row d-flex justify-content-center mt-100" style={{padding:"20px 0px 30px 0px"}}>
                      <div class="col-md-12">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" 
                          class="page3_strength_weekness">  
                                {results.map((topic) => (
                                  <tbody>
                                        <tr>
                                          <td  class="rpad"><span class="scat_percent">{((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%</span>  {topic.topic_title} ({topic.topic_code})</td>
                                          <td  class="rpad">
                                              
                                          </td>
                                          <td  class="rpad">{topic.topic_count}  of  {topic.correct_count}</td>
                                        </tr>
                                        {topic.subtopics.map((subtopic) => (
                                        <tr>
                                          <td class="mcat_sat"><span class="scat_percent">{((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%</span> {subtopic.stopic_title} ({subtopic.stopic_code})</td>
                                          <td>
                                              
                                          </td>
                                          <td>{subtopic.count}  of  {subtopic.status_count}</td>
                                        </tr> ))}
                                  </tbody>
                                ))}
                          </table>
                      </div>
                  </div>   
              </div>
            </div>
            <div>
              <div class="card-body pdf_score">  
                  <div class="logo">
                        <img src="/images/logo.png" border="0"/>
                  </div>
                  <div class="headding">
                        <h2>Strength & Weaknesses</h2>
                        <h5>Reading & Writing - Module 2</h5>
                  </div>
                  <div class="row"> 
                        <div class="col_address">
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>

                  <div class="row d-flex justify-content-center mt-100" style={{padding:"20px 0px 30px 0px"}}>
                      <div class="col-md-12">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" 
                          class="page3_strength_weekness">  
                                {results2.map((topic) => (
                                  <tbody>
                                        <tr>
                                          <td  class="rpad"><span class="scat_percent">{((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%</span>  {topic.topic_title} ({topic.topic_code})</td>
                                          <td  class="rpad">
                                              
                                          </td>
                                          <td  class="rpad">{topic.topic_count}  of  {topic.correct_count}</td>
                                        </tr>
                                        {topic.subtopics.map((subtopic) => (
                                        <tr>
                                          <td class="mcat_sat"><span class="scat_percent">{((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%</span> {subtopic.stopic_title} ({subtopic.stopic_code})</td>
                                          <td>
                                              
                                          </td>
                                          <td>{subtopic.count}  of  {subtopic.status_count}</td>
                                        </tr> ))}
                                  </tbody>
                                ))}
                          </table>
                      </div>
                  </div>   
              </div>
            </div>
            <div >
              <div class="card-body pdf_score" style={{pageBreakBefore: "always"}}> 
                  <div class="logo">
                        <img src="/images/logo.png" border="0"/>
                  </div>
                  <div class="headding">
                        <h2>Section Summary</h2>
                        <h5>Math</h5>
                  </div>
                  <div class="row"> 
                        <div class="col_address">
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>
                  <div class="row d-flex justify-content-center mt-100" style={{paddingTop:"20px"}}>
                      <div class="col-md-12">
                          <div className="sections-score-wrapper" style={{ display: 'flex' }}> 
                                <div class="page2_block" style={{display:"block",lineHeight:"30px"}}>
                                    Total Score<br/>
                                    <div class="total_score">{math_count}</div>
                                </div>
                                <div class="page2_block">
                                    <div class="col-left">
                                        <span class="satgreen">Correct</span><br/>
                                        <span class="satred">Incorrect</span><br/>
                                        <span class="satorange">Ommitted</span><br/>
                                    </div>
                                    <div class="col-right">
                                        <span class="satgreen">{tma_count}</span><br/>
                                        <span class="satred">{tmw_count}</span><br/>
                                        <span class="satorange">{tmao_count}</span><br/>
                                    </div>
                                </div>
                                <div class="page2_block">
                                    <div class="col-left">
                                        Raw Points<br/>
                                        % Correct<br/>
                                    </div>
                                    <div class="col-right">
                                        {tma_count}<br/>
                                        96%<br/>
                                    </div>
                                </div>
                          </div>
                      </div>
                  </div> 
                  <div class="row">
                        <div class="page2_answers" style={{lineHeight:"25px"}}>
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
                                    {data.map((item, index) => (item.section_id == 2 && item.module_id == 1 ? (
                                    <tr>
                                      <td>
                                          {index- 53}
                                      </td>
                                      <td bgcolor="#EAE8E8">
                                          {item.selectedAnswer}
                                      </td>
                                      <td>
                                          {item.correct_answer}
                                      </td>
                                      <td bgcolor="#EAE8E8">
                                          {item.difficulty}
                                      </td>
                                      <td>
                                          {item.stopic_code}
                                      </td>
                                  </tr>) : null) )}
                            </table>
                        </div>
                        <div class="page2_answers" style={{marginRight:"0px", lineHeight:"25px"}}>
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
                                    {data.map((item, index) => (item.section_id == 2 && item.module_id == 2 ? (
                                    <tr>
                                        <td>
                                            {index-76}
                                        </td>
                                        <td bgcolor="#EAE8E8">
                                            {item.selectedAnswer}
                                        </td>
                                        <td>
                                            {item.correct_answer}
                                        </td>
                                        <td bgcolor="#EAE8E8">
                                            {item.difficulty}
                                        </td>
                                        <td>
                                            {item.stopic_code}
                                        </td>
                                    </tr>) : null) )}
                            </table>
                        </div>
                  </div> 
              </div>
            </div>
            
            <div style={{paddingTop:"20px"}}>
              <div class="card-body pdf_score">  
                  <div class="logo">
                        <img src="/images/logo.png" border="0"/>
                  </div>
                  <div class="headding">
                        <h2>Strength & Weaknesses</h2>
                        <h5>Math</h5>
                  </div>
                  <div class="row"> 
                        <div class="col_address">
                            <div><span style={{width:"75px"}}>Student</span><span>:</span> {first_name}.{last_name}</div>
                            <div><span style={{width:"75px"}}>Student ID</span><span>:</span> STD_001</div>
                        </div>
                        <div class="col_address right">
                            <div><span style={{width:"75px"}}>Tested On</span><span>:</span> December 15, 2023</div>
                            <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT2</div>
                        </div>
                  </div>

                  <div class="row d-flex justify-content-center mt-100" style={{padding:"20px 0px 30px 0px"}}>
                      <div class="col-md-12">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" 
                          class="page3_strength_weekness">  
                                {results3.map((topic) => (
                                  <tbody>
                                        <tr>
                                          <td  class="rpad"><span class="scat_percent">{((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%</span>  {topic.topic_title} ({topic.topic_code})</td>
                                          <td  class="rpad">
                                              
                                          </td>
                                          <td  class="rpad">{topic.topic_count}  of  {topic.correct_count}</td>
                                        </tr>
                                        {topic.subtopics.map((subtopic) => (
                                        <tr>
                                          <td class="mcat_sat"><span class="scat_percent">{((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%</span> {subtopic.stopic_title} ({subtopic.stopic_code})</td>
                                          <td>
                                              
                                          </td>
                                          <td>{subtopic.count}  of  {subtopic.status_count}</td>
                                        </tr> ))}
                                  </tbody>
                                ))}
                          </table>
                      </div>
                  </div>
              </div>
            </div>
        </div>
        <div id="footer" class="satfooter">
            <div class="left">
                    &copy; 2023 This content is protected by federal copyright laws, which prohibit its reproduction, whether in entirety or in part, without the
    explicit written consent of Brilliant Education Group, LLC.
            </div>
            <div class="right">
                    Page <span id="current-page-placeholder"></span>
            </div>
        </div>
    </div>
  );
};

export default HTMLToPDF;
