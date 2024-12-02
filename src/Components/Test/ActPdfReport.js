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
    getsweekness();
    getsweekness2();
    getsweekness3();
    getsweekness4();
  }, []);
  const {id} = useParams(); 
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  const [data, setData] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState(""); 
  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  const [results3, setResults3] = useState([]);
  const [results4, setResults4] = useState([]);
  
  let userId = getQueryParam('student_id'); 
  if (!userId) {
    userId = localStorage.getItem("userid"); 
  }  
  const firstLetter = last_name.charAt(0); 
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
  const chartData = [10, 20, 15, 25, 30];

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
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
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

  const generatePDF = () => {

    const loader = document.getElementById('loader');
    loader.style.display = 'block';


    const doc = new jsPDF();
    const pageScale = 0.25;
  
    // Get the content element and set its background color to white
    const content = document.getElementById('pdf-content');
    content.style.backgroundColor = 'white';
  
    // Replace with the actual path to your logo image
    const logoImage = 'https://portal.brilliantprep.com/images/logo.png';
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
              <h1>ACT Diagnostic Report</h1>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="block" style={{marginTop: '40px'}}>
                    <div class="sc_head">English</div>
                    <div class="actprogress-bar1 satprogress" role="progressbar" aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100">
                      <span>{total_esscore}<br/></span>
                      1-36
                    </div>
                  </div>
                  <div class="block" style={{marginTop: '40px'}}>
                    <div class="sc_head">Math</div>
                    <div class="actprogress-bar1 satprogress" role="progressbar" aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100">
                      <span>{total_msscore}<br/></span>
                      1-36
                    </div>
                  </div>
                  <div class="block">
                    <div class="sc_head">Total Score</div>
                    <div class="actprogress-bar2 satprogress" role="progressbar" aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100">
                      <span>{total_scalecore}<br/></span>
                      1-36
                    </div>
                  </div>
                  <div class="block" style={{marginTop: '40px'}}>
                    <div class="sc_head">Reading</div>
                    <div class="actprogress-bar3 satprogress" role="progressbar" aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100">
                      <span>{total_rsscore}<br/></span>
                      1-36
                    </div>
                  </div>
                  <div class="block" style={{marginTop: '40px'}}>
                    <div class="sc_head">Science</div>
                    <div class="actprogress-bar3 satprogress" role="progressbar" aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100">
                      <span>{total_ssscore}<br/></span>
                      1-36
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
              <div class="rounds noborder">
                <h3>Performance</h3>
                <div className="chart">
                <section class="bar-graph bar-graph-vertical bar-graph-two">
                      <div className="bar-one bar-container">
                        <div className="scorereg">{english_correct}</div>
                        <div className="bar" style={{
                          height: `${(((english_correct / 75) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((english_correct / 75) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">English</span>
                      </div>

                      <div className="bar-two bar-container">
                        <div className="scorereg">{math_correct}</div>
                        <div className="bar" style={{
                          height: `${(((math_correct / 60) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((math_correct / 60) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">Math</span>
                      </div>

                      <div className="bar-three bar-container">
                        <div className="scorereg">{reading_correct}</div>
                      <div className="bar" style={{
                          height: `${(((reading_correct / 40) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((reading_correct / 40) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">Reading</span>
                      </div>

                      <div className="bar-four bar-container">
                        <div className="scorereg">{science_correct}</div>
                      <div className="bar" style={{
                          height: `${(((science_correct / 40) * 100) / 100) * 150}px`,
                          cssText: `height: ${(((science_correct / 40) * 100) / 100) * 150}px !important`,
                        }}></div>
                        <span className="year">Science</span>
                      </div>

                    </section>
                </div>
              </div>
              <div class="rounds noborder">
                <h3>Accuracy</h3>
                <div className="chart" style={{paddingTop: "25px"}}>
                  <div className="bar-container">
                    <div className="label">English</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(english_correct / 75) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((english_correct / 75) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">Math</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(math_correct / 60) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((math_correct / 60) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">Reading</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(reading_correct / 40) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((reading_correct / 40) * 100).toFixed(2)}%`}</div>
                  </div>
                  <div className="bar-container">
                    <div className="label">Science</div>
                    <div className="bar-wrapper">
                      <div className="bar" style={{width: `${(science_correct / 40) * 100}%`}}>
                      </div>
                    </div>
                    <div className="percentage">{`${((science_correct / 40) * 100).toFixed(2)}%`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Page 2 */}
      {/* Page 2 */}
      <div className="pdf-page" style={{pageBreakBefore: 'always'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5>English</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
                    Total Score<br/>
                    <div class="total_score">{total_esscore}</div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      <span class="satgreen">Correct</span><br/>
                      <span class="satred">Incorrect</span><br/>
                      <span class="satorange">Ommitted</span><br/>
                    </div>
                    <div class="col-right">
                      <span class="satgreen">{english_correct}</span><br/>
                      <span class="satred">{english_wrong}</span><br/>
                      <span class="satorange">{english_omitted}</span><br/>
                    </div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      Raw Points<br/>
                      % Correct<br/>
                    </div>
                    <div class="col-right">
                      {english_correct}<br/>
                      {`${((100 * english_correct) / 75).toFixed(0)}%`}<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="page2_answers" style={{lineHeight:"20px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'English' &&  item.question_number<=38 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div> 
              <div class="page2_answers" style={{lineHeight:"20px",marginRight:"0%"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'English' &&  item.question_number>38 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div> 
            </div>
          </div>
      </div>
      <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>English</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px 0px 30px 0px"}}>
              <div class="col-md-6">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
                  {results.slice(0, Math.ceil(results.length / 2)).map((topic) => (
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
              <div class="col-md-6">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
                  {results.slice(Math.ceil(results.length / 2)).map((topic) => (
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

      {/* Page 2 */}
      <div className="pdf-page" style={{pageBreakBefore: 'always'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5>Math</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
                    Total Score<br/>
                    <div class="total_score">{total_msscore}</div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      <span class="satgreen">Correct</span><br/>
                      <span class="satred">Incorrect</span><br/>
                      <span class="satorange">Ommitted</span><br/>
                    </div>
                    <div class="col-right">
                      <span class="satgreen">{math_correct}</span><br/>
                      <span class="satred">{math_wrong}</span><br/>
                      <span class="satorange">{math_omitted}</span><br/>
                    </div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      Raw Points<br/>
                      % Correct<br/>
                    </div>
                    <div class="col-right">
                      {math_correct}<br/>
                      {`${((100 * math_correct) / 60).toFixed(0)}%`}<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="page2_answers" style={{lineHeight:"20px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Math' && item.question_number <=30 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div> 
              <div class="page2_answers" style={{lineHeight:"20px",marginRight:"0%"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Math'  && item.question_number >30 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
            </div>
          </div>
      </div>
      <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>Math</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px 0px 30px 0px"}}>
              <div class="col-md-6">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
                  {results2.slice(0, Math.ceil(results2.length / 2)).map((topic) => (
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
              <div class="col-md-6">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
                  {results2.slice(Math.ceil(results2.length / 2)).map((topic) => (
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
      {/* Page 2 */}
      <div className="pdf-page" style={{pageBreakBefore: 'always'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5>Reading</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
                    Total Score<br/>
                    <div class="total_score">{total_rsscore}</div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      <span class="satgreen">Correct</span><br/>
                      <span class="satred">Incorrect</span><br/>
                      <span class="satorange">Ommitted</span><br/>
                    </div>
                    <div class="col-right">
                      <span class="satgreen">{reading_correct}</span><br/>
                      <span class="satred">{reading_wrong}</span><br/>
                      <span class="satorange">{reading_omitted}</span><br/>
                    </div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      Raw Points<br/>
                      % Correct<br/>
                    </div>
                    <div class="col-right">
                      {reading_correct}<br/>
                      {`${((100 * reading_correct) / 40).toFixed(0)}%`}<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="page2_answers" style={{lineHeight:"20px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Reading'   && item.question_number <=20 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div> 
              <div class="page2_answers" style={{lineHeight:"20px",marginRight:"0%"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Reading'   && item.question_number >20 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
            </div>
          </div>
      </div>
      
      <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>Reading</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px 0px 30px 0px"}}>
              <div class="col-md-12">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
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
      {/* Page 2 */}
      <div className="pdf-page" style={{pageBreakBefore: 'always'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Section Summary</h2>
              <h5>Science</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100">
              <div class="col-md-12">
                <div className="sections-score-wrapper" style={{display: 'flex'}}>
                  <div class="page2_block" style={{display: "block", lineHeight: "30px"}}>
                    Total Score<br/>
                    <div class="total_score">{total_ssscore}</div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      <span class="satgreen">Correct</span><br/>
                      <span class="satred">Incorrect</span><br/>
                      <span class="satorange">Ommitted</span><br/>
                    </div>
                    <div class="col-right">
                      <span class="satgreen">{science_correct}</span><br/>
                      <span class="satred">{science_wrong}</span><br/>
                      <span class="satorange">{science_omitted}</span><br/>
                    </div>
                  </div>
                  <div class="page2_block">
                    <div class="col-left">
                      Raw Points<br/>
                      % Correct<br/>
                    </div>
                    <div class="col-right">
                      {science_correct}<br/>
                      {`${((100 * science_correct) / 40).toFixed(0)}%`}<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="page2_answers" style={{lineHeight:"20px"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Science'   && item.question_number <=20 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer == item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div> 
              <div class="page2_answers" style={{lineHeight:"20px",marginRight:"0%"}}>
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tr>
                    <th class="module_title ans_titles">
                        <span>
                            Question #
                        </span>
                    </th>
                    <th class="module_title ans_titles">
                                                    <span>
                                                    Your Answer
                                                    </span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Correct Answer</span>
                    </th> 
                    <th class="module_title ans_titles">
                      <span>Topic</span>
                    </th>
                    <th class="module_title ans_titles">
                      <span>Sub Topic</span>
                    </th>
                  </tr> 
                  {data.map((item, index) => (item.section == 'Science'   && item.question_number >20 ? (
                    <tr>
                      <td>
                      {item.question_number}
                      </td>
                      <td bgcolor="#EAE8E8">
                          <span style={{
                            color: item.selectedAnswer === item.answer ? 'green' : 'red',
                          }}>
                              {item.selectedAnswer}
                          </span>
                      </td>
                      <td>
                        {item.answer}
                      </td> 
                      <td>
                        {item.topic}
                      </td>
                      <td bgcolor="#EAE8E8">
                        {item.subtopic}
                      </td>
                    </tr>) : null))}
                </table>
              </div>
            </div>
          </div>
      </div>
      
      <div className="pdf-page" style={{pageBreakBefore: 'always', marginTop: '50px'}}>
          <div class="card-body pdf_score">
            <div class="headding">
              <h2>Strength & Weaknesses</h2>
              <h5>Science</h5>
            </div>
            <div class="row">
              <div class="col_address">
                <div><span style={{width: "95px"}}>Student</span><span>:</span> {first_name} {firstLetter}</div>
                <div><span style={{width: "95px"}}>Student ID</span><span>:</span> {std_code}</div>
              </div>
              <div class="col_address right">
                <div><span style={{width: "95px"}}>Tested On</span><span>:</span> {test_date}</div>
                <div><span style={{width: "95px"}}>Test Code</span><span>:</span> {test_code}</div>
              </div>
            </div>

            <div class="row d-flex justify-content-center mt-100" style={{padding: "20px 0px 30px 0px"}}>
              
              <div class="col-md-12">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                       class="page3_strength_weekness act">
                  {results4.map((topic) => (
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
