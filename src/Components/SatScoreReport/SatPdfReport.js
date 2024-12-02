import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import './NewsComponent.css'; // Import your CSS file
import VerticalBarGraph from './LineChart';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const NewsComponent = () => {

  useEffect(() => {
    getReport()
    gettests(id)
    getsweekness(id);
    getsweekness2(id);
    getsweekness3(id);
    getsweekness4(id);
  }, []);
  const {id} = useParams();
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  const [data, setData] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState(""); 
  let userId = getQueryParam('student_id'); 
  if (!userId) {
    userId = localStorage.getItem("userid"); 
  } 

  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  const [results3, setResults3] = useState([]);
  const [results4, setResults4] = useState([]); 
  const firstLetter = last_name.charAt(0);
  const [reading_count, setReadingCount] = useState([]);
  const [test_code, setTestCode] = useState([]);
  const [test_date, setTestDate] = useState([]);
  const [std_code, setstdCode] = useState([]);
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
  const chartData = [10, 20, 15, 25, 30];
  const getReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsatreportbyuser/${userId}/${id}`
      );
      if (response.status === 200) {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name); 
        setTestCode(response.data.test_code);
        setTestDate(response.data.test_date);
        setstdCode(response.data.std_code);
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
      `${process.env.REACT_APP_BASE_URL}getsweekness/${id}/${userId}?section_id=${section_id}`
    );
    if (response.status === 200) {
      setResults(response.data);
    }
  };
  const getsweekness2 = async () => {
    const module_id = 2; // replace with the actual module_id
    const section_id = 1;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getsweekness/${id}/${userId}?section_id=${section_id}`
    );
    if (response.status === 200) {
      setResults2(response.data);
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

  const getsweekness4 = async () => { 
    const section_id = 2;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getsweekness/${id}/${userId}?section_id=${section_id}`
    );
    if (response.status === 200) {
      setResults4(response.data);
    }
  };

  const gettests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getsattest/${id}/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${userId}`,
        }, useEffect
      }
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const generatePDF = () => {

    const loader = document.getElementById('loader');
    loader.style.display = 'block';


    const doc = new jsPDF();
    const pageScale = 0.25;
  
    // Get the content element and set its background color to white
    const content = document.getElementById('pdf-content');
    content.style.backgroundColor = 'white';
  
    // Replace with the actual path to your logo image
    const logoImage = 'http://localhost:3001/images/logo.png';
    const headerHeight = 10; // Adjust the height as needed
    const topMargin = 0;
    const bottomMargin = 0;
  
    const titles = content.getElementsByClassName('ans_titles');
    const chartContainer = document.querySelector('.chart');
  
    // Rotate the texts for making some spaces along with making them invisible as jsPDF can't actually render them
    /*titles.forEach((title) => {
      title.firstChild.classList.add('vertical-text');
      title.firstChild.style.visibility = 'hidden';
    });*/
  
    // Add the content to the PDF
    // doc.setFillColor(204, 204,204,0);
    doc.html(content, {
      callback: function (pdf) {
        const pageCount = pdf.internal.getNumberOfPages();
        
        // Loop through each page
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          // pdf.setFillColor(255, 255, 255); // Set the background color to white
          // Traverse through each of the titles and place the canvas elements
          /*titles.forEach((title) => {
            const { top, left } = title.getBoundingClientRect();
            const [realTop, realLeft] = [top * pageScale, left * pageScale];
            const paddingTop = 10;
            const paddingBottom = 10;
            const pageTopOffset = (i - 1) * (20 + paddingTop + paddingBottom);
            const pagePerspectiveTop = (realTop % (pdf.getPageHeight() / i)) + paddingTop;
            const currentPageinHTML = parseInt(realTop / pdf.getPageHeight());
  
            if (i - 1 === currentPageinHTML) {
              pdf.text(title.firstChild.innerHTML, realLeft + 15, pagePerspectiveTop + pageTopOffset, null, 90);
            }
          });*/
  
          // Add top margin
          pdf.setLineWidth(topMargin);
          pdf.line(0, topMargin / 2, pdf.internal.pageSize.width, topMargin / 2);
  
          // Add logo in the header
          const logoWidth = 50;
          const logoHeight = 8; // Adjust as needed
          pdf.addImage(logoImage, 'PNG', 10, 10, logoWidth, logoHeight);
          
  
          // Add footer
          const fontSize = 6;
          const footer = `© 2024 This content is protected by federal copyright laws, which prohibit its reproduction, whether in entirety or in part, without the explicit written consent of Brilliant Education Group, LLC`;
          pdf.setFontSize(fontSize);
          const paddingBottomFooter = 10;
          const paddingBottom = 0;
          pdf.text(footer, 10, pdf.internal.pageSize.height - paddingBottomFooter - paddingBottom);
  
          // Add bottom margin
          pdf.setLineWidth(bottomMargin);
          pdf.line(
            0,
            pdf.internal.pageSize.height - bottomMargin / 2,
            pdf.internal.pageSize.width,
            pdf.internal.pageSize.height - bottomMargin / 2
          );
          
        }
        const lastPageNumber = doc.internal.getNumberOfPages();
        doc.deletePage(lastPageNumber);
        // Restore visibility of titles
        /*titles.forEach((title) => {
          title.firstChild.classList.remove('vertical-text');
          title.firstChild.style.visibility = 'visible';
        });*/
  
        // Save the PDF
        const filename = `${first_name}${firstLetter}_${test_code}_Report.pdf`;
        pdf.save(filename);
        loader.style.display = 'none';
      },
      x: 10,
      y: headerHeight + topMargin, // Adjust the starting position after the header with the logo
      html2canvas: { scale: pageScale, backgroundColor: 'white' }, // Set background color explicitly
      letterRendering: true,
    });
  };
  


  return (
    <div style={{padding:"20px 0px"}}>
      <button onClick={generatePDF} class="btn btn-success">Generate PDF</button>
      <div id="loader" style={{ display: "none" }}>
        Loading...
      </div>
      <div className="pdf-content" id="pdf-content">
        {/* Page 1 */}
        <div className="pdf-page" style={{pageBreakBefore: "always", marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h1>SAT Diagnostic Report</h1>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "80px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "80px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "80px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "80px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="block" style={{marginTop: '20px'}}>
                    <div class="sc_head">Reading<span class="padd">&amp;</span>Writing Score</div>
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
                  <div class="block" style={{marginTop: '20px'}}>
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
            <div class="test_scores_text2">
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
              <div class="rounds noborder">
                <h3>Performance</h3>
                <div className="chart">
                <section class="bar-graph bar-graph-vertical bar-graph-two">
                      <div className="bar-one bar-container">
                        <div className="scorereg">{mc1_count}</div>
                        <div className="bar" style={{
                          height: `${(((mc1_count / 27) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((mc1_count / 27) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">R&W 1</span>
                      </div>

                      <div className="bar-two bar-container">
                        <div className="scorereg">{mc2_count}</div>
                        <div className="bar" style={{
                          height: `${(((mc2_count / 27) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((mc2_count / 27) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">R&W 2</span>
                      </div>

                      <div className="bar-three bar-container">
                        <div className="scorereg">{mac1_count}</div>
                      <div className="bar" style={{
                          height: `${(((mac1_count / 22) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((mac1_count / 22) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">Math 1</span>
                      </div>

                      <div className="bar-four bar-container">
                        <div className="scorereg">{mac2_count}</div>
                      <div className="bar" style={{
                          height: `${(((mac2_count / 22) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((mac2_count / 22) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">Math 2</span>
                      </div>

                    </section>
                </div>
              </div>
              <div class="rounds noborder">
                <h3>Accuracy</h3>
                <div className="chart" style={{paddingTop: "25px"}}>
                  <div className="bar-container">
                    <div className="label">R&W 1</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(mc1_count / 27) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((mc1_count / 27) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">R&W 2</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(mc2_count / 27) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((mc2_count / 27) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">Math 1</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(mac1_count / 22) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((mac1_count / 22) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">Math 2</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(mac2_count / 22) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((mac2_count / 22) * 100).toFixed(2)}%`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5> Reading<span class="padd">&amp;</span>Writing </h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "80px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "80px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "80px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "80px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
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
                      {`${((100 * tc_count) / 54).toFixed(0)}%`}<br/>
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
                                                    <span>
                                                        Question #
                                                    </span>
                    </th>
                    <th class="ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="ans_titles">
                      <span>Correct Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span>Order of Difficulty</span>
                    </th>
                    <th class="ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="6" class="module_title">Module 1</td>
                  </tr>
                  {data.map((item, index) => (item.section_id == 1 && item.module_id == 1 ? (
                    <tr>
                      <td>
                        {index + 1}
                      </td>
                      <td bgcolor="#EAE8E8">
                                            <span style={{
                                              color: item.status == true ? 'green' : 'red',
                                            }}>
                                                {item.selectedAnswer}
                                            </span>
                      </td>
                      <td>
                        {item.correct_answer}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.difficulty}
                      </td>
                      <td>
                        {item.topic_code}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.stopic_code}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
              <div class="page2_answers" style={{marginRight: "0px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="ans_titles">
                      <span>Question #</span>
                    </th>
                    <th class="ans_titles">
                      <span>Your Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span>Correct Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span>Order of Difficulty</span>
                    </th>
                    <th class="ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="6" class="module_title">Module 2</td>
                  </tr>
                  {data.map((item, index) => (item.section_id == 1 && item.module_id == 2 ? (
                    <tr>
                      <td>
                        {index - 26}
                      </td>
                      <td bgcolor="#EAE8E8">
                                            <span style={{
                                              color: item.status == true ? 'green' : 'red',
                                            }}>
                                                {item.selectedAnswer}
                                                </span>
                      </td>
                      <td>
                        {item.correct_answer}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.difficulty}
                      </td>
                      <td>
                        {item.topic_code}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.stopic_code}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 */}
        <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>Reading<span class="padd">&amp;</span>Writing</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "80px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "80px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "80px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "80px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px 0px 30px 0px"}}>
              <div class="col-md-12">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness">
                  {results.map((topic) => (
                    <tbody>
                    <tr>
                      <td class="rpad"  style={{fontWeight:"bold"}}><span
                        class="scat_percent">{((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%</span> {topic.topic_title} ({topic.topic_code})
                      </td>
                      <td class="rpad"  style={{fontWeight:"bold"}}>

                      </td>
                      <td class="rpad"  style={{fontWeight:"bold", color:"#ed197e"}}>{topic.correct_count} of {topic.topic_count}</td>
                    </tr>
                    {topic.subtopics.map((subtopic) => (
                      <tr>
                        <td class="mcat_sat"><span
                          class="scat_percent">{((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%</span> {subtopic.stopic_title} ({subtopic.stopic_code})
                        </td>
                        <td>

                        </td>
                        <td>{subtopic.status_count} of {subtopic.count}</td>
                      </tr>))}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 */}
        <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '10px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5>Math</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "80px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "80px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "80px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "80px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>
            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
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
                      {`${((100 * tma_count) / 44).toFixed(0)}%`}<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="page2_answers" style={{lineHeight: "25px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="ans_titles">
                      <span> Question #</span>
                    </th>
                    <th class="ans_titles">
                      <span> Your Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span> Correct Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span> Order of Difficulty</span>
                    </th>
                    <th class="ans_titles">
                      <span> Topic</span>
                    </th>
                    <th class="ans_titles">
                      <span> Sub Topic</span>
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="6" class="module_title">Module 1</td>
                  </tr>
                  {data.map((item, index) => (item.section_id == 2 && item.module_id == 1 ? (
                    <tr>
                      <td>
                        {index - 53}
                      </td>
                      <td bgcolor="#EAE8E8">
                                        <span style={{
                                          color: item.status == true ? 'green' : 'red',
                                        }}>
                                            {item.selectedAnswer}
                                            </span>
                      </td>
                      <td>
                          {Array.isArray(item.correct_answer) ? (
                            <div key={index}>{item.correct_answer[0]}</div>
                          ) : (
                            <div>{item.correct_answer}</div>
                          )}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.difficulty}
                      </td>
                      <td>
                        {item.topic_code}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.stopic_code}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
              <div class="page2_answers" style={{marginRight: "0px", lineHeight: "25px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="ans_titles">
                      <span> Question #</span>
                    </th>
                    <th class="ans_titles">
                      <span> Your Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span> Correct Answer</span>
                    </th>
                    <th class="ans_titles">
                      <span> Order of Difficulty</span>
                    </th>
                    <th class="ans_titles">
                      <span> Topic</span>
                    </th>
                    <th class="ans_titles">
                      <span> Sub Topic</span>
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="6" class="module_title">Module 2</td>
                  </tr>
                  {data.map((item, index) => (item.section_id == 2 && item.module_id == 2 ? (
                    <tr>
                      <td>
                        {index - 75}
                      </td>
                      <td bgcolor="#EAE8E8">
                                            <span style={{
                                              color: item.status == true ? 'green' : 'red',
                                            }}>
                                            {item.selectedAnswer}
                                            </span>
                      </td>
                      <td> 
                        {Array.isArray(item.correct_answer) ? (
                          <div key={index}>{item.correct_answer[0]}</div>
                        ) : (
                          <div>{item.correct_answer}</div>
                        )}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.difficulty}
                      </td>
                      <td>
                        {item.topic_code}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.stopic_code}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '10px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>Math</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "80px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "80px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "80px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "80px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px"}}>
              <div class="col-md-12">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness">
                  {results3.map((topic) => (
                    <tbody>
                    <tr>
                      <td class="rpad"  style={{fontWeight:"bold"}}><span
                        class="scat_percent">{((topic.correct_count / topic.topic_count) * 100).toFixed(0)}%</span> {topic.topic_title} ({topic.topic_code})
                      </td>
                      <td class="rpad"  style={{fontWeight:"bold"}}>

                      </td>
                      <td class="rpad"  style={{fontWeight:"bold", color:"#ed197e"}}>{topic.correct_count} of {topic.topic_count}</td>
                    </tr>
                    {topic.subtopics.map((subtopic) => (
                      <tr>
                        <td class="mcat_sat"><span
                          class="scat_percent">{((subtopic.status_count / subtopic.count) * 100).toFixed(0)}%</span> {subtopic.stopic_title} ({subtopic.stopic_code})
                        </td>
                        <td>

                        </td>
                        <td>{subtopic.status_count} of {subtopic.count}</td>
                      </tr>))}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default NewsComponent;
