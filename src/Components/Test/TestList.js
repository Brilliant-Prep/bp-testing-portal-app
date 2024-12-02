import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2PDF from "html2pdf.js";
import apiService from "../../Components/services/apiService";
import '../../Components/pdfstyle.css'; // Import your external CSS file
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
function TestList() {
  const [data, setData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); 
  let table = null;
  useEffect(() => {
    const fetchData = async () => {
      try { 
        await getTests();
        setIsLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if(data.length > 0){
      if(table) {
        table.destroy();
      }
      table = new DataTable('#testTables',{
        'lengthMenu':[[10,25,50,100,-1],[10,25,50,100,"All"]],
        'pageLength': 100,
      });
    }
  }, [data]); 

  const deleteTest = async (id) => {
    if (window.confirm("Are you sure you want to delete test?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}delete_test/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  const blockTest = async (id) => {
    if (window.confirm("Are you sure you wnat to Deactivate Test?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}block_test/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  // document.addEventListener("DOMContentLoaded", function () {
  //   const divToHide = document.getElementById("pdf-content");
  //   divToHide.style.display = "none";
  // });

  useEffect(() => {
    if (pdfData.length > 0) {
      handleDownload();
    }
  }, [pdfData]);

  const handleDownload = async () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    const divToHide = document.getElementById("pdf-content");
    divToHide.style.display = "block";

    // Select the HTML element containing the content you want to include in the PDF
    const contentElement = document.getElementById("pdf-content");
    let opts = {
      margin: 0.3,
      filename: "example.pdf",
      image: { type: "jpeg", quality: 0.98 },
      pagebreak: { before: "#page-break" },
      html2canvas: {
        scale: 1,
        y: 0,
        scrollY: 0,
        useCors: true,
        dpi: 192,
        bottom: 0,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };
    try {
      html2PDF()
        .set(opts)
        .from(contentElement)
        .toPdf()
        .save("example.pdf")
        .then((res) => {
          divToHide.style.display = "none";
          setPdfData([])
        });
    } catch (error) {
      divToHide.style.display = "none";
      setPdfData([])
    } 
  };

  const unblockTest = async (id) => {
    if (window.confirm("Are you sure you want to Activate Test?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}unblock_test/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  const getTests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getalltests`
    );
    if (response.status === 200) {
      setData(response.data);
      navigate("/tests");
    }
  };

  const getSActtest = async (item) => {
    try {
      const response = await apiService().get(`sedit_test/${item._id}`);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data, "response.data");
        setPdfData(response.data.data.questions_and_answers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="content-body container">
      {isLoading ? ( // Show loading spinner while data is being fetched
        <div className="loading-screen">
           <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title">ACT Tests List</h4>
                  </div>
                  <div class="col-6 text-right">
                    <Link to={`/add_test`} class="btn btn-outline-primary">
                      <i className="fa fa-plus"></i> Add New ACT Test
                    </Link>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-bordered zero-configuration" id="testTables">
                    <thead>
                      <tr>
                        <th class="text-center">S.No</th>
                        <th class="text-center">Test Code</th>
                        <th class="text-center">Test Name</th>
                        <th class="text-center">Dates</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0
                        ? data.map((item, index) => {
                            let start_date = new Date(
                              item.start_date
                            ).toLocaleDateString("en-US");
                            let end_date = new Date(
                              item.end_date
                            ).toLocaleDateString("en-US");
                            return (
                              <tr>
                                <td class="text-center">{index + 1}</td>
                                <td class="text-center">{item.test_code}</td>
                                <td class="text-center">{item.test_title}</td>
                                <td class="text-center">{start_date}-{end_date}</td>
                                <td class="text-center">
                                  {item.status ? (
                                    <label
                                      title="In Active Topic"
                                      className="btn btn-success ms-2"
                                      onClick={() => blockTest(item._id)}
                                    >
                                      <i className="fa fa-check"></i>
                                    </label>
                                  ) : (
                                    <label
                                      title="Active Topic"
                                      className="btn btn-danger ms-2"
                                      onClick={() => unblockTest(item._id)}
                                    >
                                      <i className="fa fa-times"></i>
                                    </label>
                                  )}
                                </td>
                                <td align="center">
                                    <Link to={`/acttestimport/${item._id}`}>
                                      <label
                                        title="ACT Key Import"
                                        className="btn btn-outline-success ms-2"
                                      >
                                        <i className="fa fa-upload"></i>
                                      </label>
                                    </Link>
                                    <Link to={`/nacttestpage/${item._id}`}>
                                      <label
                                        title="Start ACT Test"
                                        className="btn btn-outline-warning ms-2"
                                      >
                                        <i className="fa fa-graduation-cap"></i>
                                      </label>
                                    </Link>
                                    <Link to={`/acttestscale/${item._id}`}>
                                      <label
                                        title="ACT Scale  Import"
                                        className="btn btn-outline-success ms-2"
                                      >
                                        <i className="fa fa-upload"></i>
                                      </label>
                                    </Link>
                                  <Link to={`/edit_test/${item._id}`}>
                                    <label
                                      title="Edit ACT Test"
                                      className="btn btn-outline-primary ms-2"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </label>
                                  </Link>
                                  <Link to={`/delete_test/${item._id}`}>
                                    <label
                                      title="Delete ACT Test"
                                      className="btn btn-outline-danger ms-2"
                                      onClick={() => deleteTest(item._id)}
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </label>
                                  </Link>
                                  <Link to={`/actstestimport/${item._id}`}>
                                      <label
                                        title="ACT Test Import"
                                        className="btn btn-outline-success ms-2"
                                      >
                                        <i className="fa fa-upload"></i>
                                      </label>
                                    </Link>
                                  <label
                                    title="PDF Download"
                                    className="btn btn-outline-primary ms-2"
                                    onClick={() => getSActtest(item)}
                                  >
                                    <i
                                      className="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                  </label>
                                </td>
                              </tr>
                            );
                          })
                        : "<tr><td colspan='9'>No Data Available</td></tr>"}
                    </tbody>
                  </table>
                </div>
                {/* style={{ display: "none" }} */}
                <div id="pdf-content" class="pdf_styles" style={{ display: "none" }}>
                <table className="page1" style={{ border: 0, cellspacing: 0, cellpadding: 0, width: '750px', margin: '0 auto' }}>
                    <tbody>
                      <tr>
                        <td colSpan={2} style={{ textAlign: 'center', paddingBottom: '20px' }}>
                          <img src="logo-text.png" alt="Logo" style={{ width: '300px' }} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ textAlign: 'center', paddingTop: '20px' }}>
                          <div className="skill_tracker">
                            Test Evaluator & Skill Tracker
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', lineHeight: '20px' }}>
                          <strong>Name:</strong> Kalavagunta, Sameeka<br />
                          <strong>Student ID#:</strong> 78768
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <strong>Test Code:</strong> 
                          <span style={{ border: '2px dashed #000', padding: '10px' }}>O-AT1</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} height="20px"></td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ border: '1px solid #000', padding: '2px' }}>
                          <table style={{ border: '1px solid #000', padding: '2px 20px', width: '100%' }}>
                            <tbody>
                              <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '10px 0px' }}>
                                  <strong style={{ fontSize: '16px' }}>TEST REVIEW INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%">
                                  Day<br />
                                  <span className="border">N/A</span>
                                </td>
                                <td width="25%">
                                  Date<br />
                                  <span className="border">N/A</span>
                                </td>
                                <td width="25%">
                                  Start Time<br />
                                  <span className="border">N/A</span>
                                </td>
                                <td width="25%">
                                  End Time<br />
                                  <span className="border">N/A</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ paddingTop: '30px' }}>
                          <ul style={{ margin: '0', padding: '0 0 0 15px' }}>
                            <li>
                              The next few pages will give you vital information about how you performed on the test. 
                              You will use this information to help you evaluate your mistakes and strategy usage for this test.
                            </li>
                            <li>
                              On page 2, you will find general information about your score, including your scaled score for each section and your composite score. This score is based on students testing under ideal conditions and, as such, is subject to slight fluctuations due to fatigue, distraction, and other intangible factors that may not be present when you take your next full-length test.
                            </li>
                            <li>
                              On page 3, you will find a chart that depicts the questions that you missed, skipped, or answered correctly section by section. The chart also displays each question's type and level of difficulty.
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="page-break"></div>
                   <div>
                    <table border="0" cellspacing="0" cellpadding="0" width="750px"
                     align="center" class="page2"> 
                            <tr>
                                <td colspan="2" style={{ textAlign: 'center', padding: '0px' }}>
                                  <div className="skill_tracker">
                                    Test Evaluator & Skill Tracker
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td style={{ textAlign: 'left', lineHeight: '30px', fontSize: '14px' }} valign="top">
                                        <strong>Analysis of Test Form <span style={{ border: '2px dashed #000', padding: '5px 10px' }}>O-AT1</span></strong><br />
                                        <strong>Student:</strong> Kalavagunta, Sameeka
                                      </td>
                                      <td style={{ textAlign: 'right', fontSize: '14px' }} valign="top">
                                        <strong>Date Taken: <span style={{ border: '2px dashed #000', padding: '5px 10px' }}>January 8, 2023</span></strong>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                  <td colspan="2" style={{ padding: '0px 0px 10px 0px' }}>
                                    <div style={{
                                      background: '#e36b76',
                                      padding: '10px',
                                      width: '150px',
                                      margin: '0 auto',
                                      borderRadius: '10px',
                                      fontSize: '14px',
                                      color: '#FFF',
                                      fontWeight: 'bold'
                                    }}>
                                      Overall Results
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>
                                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ border: '1px solid #000', padding: '2px 0px' }}>
                                      <tr>
                                        <td width="33%" valign="top" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '22px', paddingLeft: '10px' }}>
                                          English Raw Score<br />
                                          <strong>Scaled English Score</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '22px' }}>
                                          57<br />
                                          <strong>26</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ backgroundColor: '#dbe5f1', border: '1px dotted #000' }}>
                                          <table border="0" cellPadding="0" cellSpacing="5" width="100%">
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Correct</td>
                                              <td><strong>57</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Incorrect</td>
                                              <td><strong>18</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Skipped</td>
                                              <td><strong>0</strong></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '10px' }}></td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>
                                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ border: '1px solid #000', padding: '2px 0px' }}>
                                      <tr>
                                        <td width="33%" valign="top" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '22px', paddingLeft: '10px' }}>
                                          English Raw Score<br />
                                          <strong>Scaled English Score</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '22px' }}>
                                          57<br />
                                          <strong>26</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ backgroundColor: '#dbe5f1', border: '1px dotted #000' }}>
                                          <table border="0" cellPadding="0" cellSpacing="5" width="100%">
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Correct</td>
                                              <td><strong>57</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Incorrect</td>
                                              <td><strong>18</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Skipped</td>
                                              <td><strong>0</strong></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '10px' }}></td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>
                                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ border: '1px solid #000', padding: '2px 0px' }}>
                                      <tr>
                                        <td width="33%" valign="top" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '22px', paddingLeft: '10px' }}>
                                          English Raw Score<br />
                                          <strong>Scaled English Score</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '22px' }}>
                                          57<br />
                                          <strong>26</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ backgroundColor: '#dbe5f1', border: '1px dotted #000' }}>
                                          <table border="0" cellPadding="0" cellSpacing="5" width="100%">
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Correct</td>
                                              <td><strong>57</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Incorrect</td>
                                              <td><strong>18</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Skipped</td>
                                              <td><strong>0</strong></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '10px' }}></td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>
                                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ border: '1px solid #000', padding: '2px 0px' }}>
                                      <tr>
                                        <td width="33%" valign="top" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '22px', paddingLeft: '10px' }}>
                                          English Raw Score<br />
                                          <strong>Scaled English Score</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '22px' }}>
                                          57<br />
                                          <strong>26</strong>
                                        </td>
                                        <td width="33%" valign="top" style={{ backgroundColor: '#dbe5f1', border: '1px dotted #000' }}>
                                          <table border="0" cellPadding="0" cellSpacing="5" width="100%">
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Correct</td>
                                              <td><strong>57</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Incorrect</td>
                                              <td><strong>18</strong></td>
                                            </tr>
                                            <tr>
                                              <td style={{ textAlign: 'left' }}>Total English Skipped</td>
                                              <td><strong>0</strong></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '10px' }}></td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ fontSize: '18px', textAlign: 'left', paddingBottom: '0px' }}>
                                    <strong>TOTAL SCALED SCORE:</strong>
                                    <span style={{ margin: '0px 50px', border: '2px dashed #000', padding: '5px 10px' }}>24</span>
                                    <span style={{ margin: '0px 50px 0px 0px' }}>(Out of 36)</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ fontSize: '13px', textAlign: 'left', paddingBottom: '5px' }}>
                                    <strong>Results by Section:</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" style={{ fontSize: '13px', textAlign: 'left' }}>
                                    <strong>English Analysis:</strong>
                                  </td>
                                  <td valign="top">
                                    <table border="0" cellSpacing="0" cellPadding="0" width="450px" style={{ border: '2px solid #4f81bd' }}>
                                      <tr bgcolor="#4f81bd" height="25px">
                                        <td>
                                          &nbsp;
                                        </td>
                                        <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                          Rhetorical Skills
                                        </td>
                                        <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                          Usage/Mechanics
                                        </td>
                                      </tr>
                                      <tr height="25px">
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          Number Correct
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          25
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          32
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          Number Incorrect
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          8
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          10
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', height: '20px' }}>
                                          Number Skipped
                                        </td>
                                        <td style={{ height: '25px' }}>
                                          0
                                        </td>
                                        <td style={{ height: '25px' }}>
                                          0
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '5px' }}></td>
                                </tr>
                                <tr>
                                <td valign="top" style={{ fontSize: '13px', textAlign: 'left' }} width="150px">
                                  <strong>Math Analysis:</strong>
                                </td>
                                <td valign="top">
                                  <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ border: '2px solid #4f81bd' }}>
                                    <tbody>
                                      <tr bgcolor="#4f81bd" height="35px">
                                        <td width="120px">
                                          &nbsp;
                                        </td>
                                        <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                          Plane Geometry/Trigonometry
                                        </td>
                                        <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                          Intermediate Algebra/Coordinate Geometry
                                        </td>
                                        <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                          Pre-Algebra/Elementary Algebra
                                        </td>
                                      </tr>
                                      <tr height="25px">
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          Number Correct
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          25
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          32
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          13
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          Number Incorrect
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          8
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          10
                                        </td>
                                        <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                          10
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: 'left', paddingLeft: '20px', height: '25px' }}>
                                          Number Skipped
                                        </td>
                                        <td style={{ height: '25px' }}>
                                          0
                                        </td>
                                        <td style={{ height: '25px' }}>
                                          0
                                        </td>
                                        <td style={{ height: '25px' }}>
                                          0
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2" style={{ height: '15px' }}></td>
                              </tr>
                              <tr>
                                  <td valign="top" style={{ fontSize: '13px', textAlign: 'left' }} width="150px">
                                    <strong>Reading Analysis:</strong>
                                  </td>
                                  <td valign="top">
                                    <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ border: '2px solid #4f81bd' }}>
                                      <tbody>
                                        <tr bgcolor="#4f81bd" height="35px">
                                          <td width="120px">
                                            &nbsp;
                                          </td>
                                          <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                            Humanities
                                          </td>
                                          <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                            Natural Science
                                          </td>
                                          <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                            Prose Fiction
                                          </td>
                                          <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                            Social Science
                                          </td>
                                        </tr>
                                        <tr height="25px">
                                          <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            Number Correct
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            8
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            4
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            7
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            9
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            Number Incorrect
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            2
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            6
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            3
                                          </td>
                                          <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                            1
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: 'left', paddingLeft: '20px', height: '25px' }}>
                                            Number Skipped
                                          </td>
                                          <td style={{ height: '25px' }}>
                                            0
                                          </td>
                                          <td style={{ height: '25px' }}>
                                            0
                                          </td>
                                          <td style={{ height: '25px' }}>
                                            0
                                          </td>
                                          <td style={{ height: '25px' }}>
                                            0
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" style={{ height: '15px' }}></td>
                                </tr>
                                <tr>
                              <td valign="top" style={{ fontSize: '13px', textAlign: 'left' }} width="150px">
                                <strong>Science Analysis:</strong>
                              </td>
                              <td valign="top">
                                <table border="0" cellSpacing="0" cellPadding="0" width="100%" style={{ border: '2px solid #4f81bd' }}>
                                  <tbody>
                                    <tr bgcolor="#4f81bd" height="35px">
                                      <td width="120px">
                                        &nbsp;
                                      </td>
                                      <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                        Conflicting Viewpoints
                                      </td>
                                      <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                        Research Summary
                                      </td>
                                      <td style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                                        Data Representation
                                      </td>
                                    </tr>
                                    <tr height="25px">
                                      <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        Number Correct
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        1
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        6
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        6
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: 'left', paddingLeft: '20px', borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        Number Incorrect
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        6
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        12
                                      </td>
                                      <td style={{ borderBottom: '2px solid #4f81bd', height: '20px' }}>
                                        9
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: 'left', paddingLeft: '20px', height: '25px' }}>
                                        Number Skipped
                                      </td>
                                      <td style={{ height: '25px' }}>
                                        0
                                      </td>
                                      <td style={{ height: '25px' }}>
                                        0
                                      </td>
                                      <td style={{ height: '25px' }}>
                                        0
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" style={{ height: '15px' }}></td>
                            </tr>
                        </table>
                   </div>
                  <div id="page-break"></div>
                  <table
                    border="1"
                    cellPadding="2"
                    cellSpacing="2"
                    width="80%"
                    align="center"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      margin: "0 auto",
                      marginTop: "20px",
                    }}
                  >
                    {/* <tr>
                      <th
                        rowSpan="2"
                        verticalAlign="bottom"
                        style={{
                          lineHeight: "35px",
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Scale
                        <br />
                        Score
                      </th>
                      <th
                        colspan="4"
                        align="center"
                        style={{
                          lineHeight: "50px",
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Raw Scores
                      </th>
                      <th
                        rowSpan="2"
                        verticalAlign="bottom"
                        style={{
                          lineHeight: "35px",
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Scale
                        <br />
                        Score
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Test 1<br />
                        English
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Test 2<br />
                        Mathematics
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Test 3<br />
                        Reading
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Test 4<br />
                        Science
                      </th>
                    </tr>
                    <tr>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        36
                        <br />
                        35
                        <br />
                        34
                        <br />
                        33
                        <br />
                        32
                        <br />
                        31
                        <br />
                        30
                        <br />
                        29
                        <br />
                        28
                        <br />
                        27
                        <br />
                        26
                        <br />
                        25
                        <br />
                        24
                        <br />
                        23
                        <br />
                        22
                        <br />
                        21
                        <br />
                        20
                        <br />
                        19
                        <br />
                        18
                        <br />
                        17
                        <br />
                        16
                        <br />
                        15
                        <br />
                        14
                        <br />
                        13
                        <br />
                        12
                        <br />
                        11
                        <br />
                        10
                        <br />
                        9<br />
                        8<br />
                        7<br />
                        6<br />
                        5<br />
                        4<br />
                        3<br />
                        2<br />
                        1<br />
                      </td>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        75
                        <br />
                        74
                        <br />
                        72-73
                        <br />
                        71
                        <br />
                        70
                        <br />
                        69
                        <br />
                        68
                        <br />
                        66-67
                        <br />
                        64-65
                        <br />
                        62-63
                        <br />
                        60-61
                        <br />
                        58-59
                        <br />
                        56-57
                        <br />
                        54-55
                        <br />
                        51-53
                        <br />
                        49-50
                        <br />
                        46-48
                        <br />
                        43-45
                        <br />
                        41-42
                        <br />
                        38-40
                        <br />
                        36-37
                        <br />
                        32-35
                        <br />
                        29-31
                        <br />
                        27-28
                        <br />
                        25-26
                        <br />
                        23-24
                        <br />
                        21-22
                        <br />
                        19-20
                        <br />
                        16-18
                        <br />
                        13-15
                        <br />
                        10-12
                        <br />
                        08-09
                        <br />
                        06-07
                        <br />
                        04-05
                        <br />
                        03
                        <br />
                        00-02
                        <br />
                      </td>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        60
                        <br />
                        59
                        <br />
                        57-58
                        <br />
                        56
                        <br />
                        55
                        <br />
                        54
                        <br />
                        53
                        <br />
                        51-52
                        <br />
                        49-50
                        <br />
                        46-48
                        <br />
                        44-45
                        <br />
                        42-43
                        <br />
                        40-41
                        <br />
                        37-39
                        <br />
                        36
                        <br />
                        34-35
                        <br />
                        31-33
                        <br />
                        29-30
                        <br />
                        26-28
                        <br />
                        23-25
                        <br />
                        19-22
                        <br />
                        15-18
                        <br />
                        12-14
                        <br />
                        09-11
                        <br />
                        07-08
                        <br />
                        06
                        <br />
                        05
                        <br />
                        04
                        <br />
                        03
                        <br />
                        -<br />
                        02
                        <br />
                        -<br />
                        01
                        <br />
                        -<br />
                        -<br />
                        00
                        <br />
                      </td>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        60
                        <br />
                        59
                        <br />
                        57-58
                        <br />
                        56
                        <br />
                        55
                        <br />
                        54
                        <br />
                        53
                        <br />
                        51-52
                        <br />
                        49-50
                        <br />
                        46-48
                        <br />
                        44-45
                        <br />
                        42-43
                        <br />
                        40-41
                        <br />
                        37-39
                        <br />
                        36
                        <br />
                        34-35
                        <br />
                        31-33
                        <br />
                        29-30
                        <br />
                        26-28
                        <br />
                        23-25
                        <br />
                        19-22
                        <br />
                        15-18
                        <br />
                        12-14
                        <br />
                        09-11
                        <br />
                        07-08
                        <br />
                        06
                        <br />
                        05
                        <br />
                        04
                        <br />
                        03
                        <br />
                        -<br />
                        02
                        <br />
                        -<br />
                        01
                        <br />
                        -<br />
                        -<br />
                        00
                        <br />
                      </td>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        60
                        <br />
                        59
                        <br />
                        57-58
                        <br />
                        56
                        <br />
                        55
                        <br />
                        54
                        <br />
                        53
                        <br />
                        51-52
                        <br />
                        49-50
                        <br />
                        46-48
                        <br />
                        44-45
                        <br />
                        42-43
                        <br />
                        40-41
                        <br />
                        37-39
                        <br />
                        36
                        <br />
                        34-35
                        <br />
                        31-33
                        <br />
                        29-30
                        <br />
                        26-28
                        <br />
                        23-25
                        <br />
                        19-22
                        <br />
                        15-18
                        <br />
                        12-14
                        <br />
                        09-11
                        <br />
                        07-08
                        <br />
                        06
                        <br />
                        05
                        <br />
                        04
                        <br />
                        03
                        <br />
                        -<br />
                        02
                        <br />
                        -<br />
                        01
                        <br />
                        -<br />
                        -<br />
                        00
                        <br />
                      </td>
                      <td
                        align="center"
                        style={{ lineHeight: "22px", border: "1px solid #000" }}
                      >
                        36
                        <br />
                        35
                        <br />
                        34
                        <br />
                        33
                        <br />
                        32
                        <br />
                        31
                        <br />
                        30
                        <br />
                        29
                        <br />
                        28
                        <br />
                        27
                        <br />
                        26
                        <br />
                        25
                        <br />
                        24
                        <br />
                        23
                        <br />
                        22
                        <br />
                        21
                        <br />
                        20
                        <br />
                        19
                        <br />
                        18
                        <br />
                        17
                        <br />
                        16
                        <br />
                        15
                        <br />
                        14
                        <br />
                        13
                        <br />
                        12
                        <br />
                        11
                        <br />
                        10
                        <br />
                        9<br />
                        8<br />
                        7<br />
                        6<br />
                        5<br />
                        4<br />
                        3<br />
                        2<br />
                        1<br />
                      </td>
                    </tr> */}
                    <tr>
                      <td
                        colspan="2"
                        align="center"
                        style={{
                          fontSize: "18px",
                          fontFamily: "Arial",
                          lineHeight: "34px",
                        }}
                      >
                        <strong>Question No</strong>
                      </td>
                      <td
                        colspan="2"
                        align="center"
                        style={{
                          fontSize: "18px",
                          fontFamily: "Arial",
                          lineHeight: "34px",
                        }}
                      >
                        <strong>Question</strong>
                      </td>
                      <td
                        colspan="2"
                        align="center"
                        style={{
                          fontSize: "18px",
                          fontFamily: "Arial",
                          lineHeight: "34px",
                        }}
                      >
                        <strong>Answer</strong>
                      </td>
                    </tr>
                    {pdfData.length > 0 &&
                      pdfData?.map((item, index) => {
                        return (
                          <tr>
                            <td
                              colspan="2"
                              align="center"
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                lineHeight: "18px",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              colspan="2"
                              align="center"
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                lineHeight: "18px",
                              }}
                            >
                              {item.question}
                            </td>
                            {item.status == true ? 
                            <td
                            colspan="2"
                            align="center"
                            style={{
                              fontSize: "14px",
                              fontFamily: "Arial",
                              lineHeight: "20px",
                            }}
                          >
                            &#x2713;
                          </td> : <td
                              colspan="2"
                              align="center"
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                lineHeight: "20px",
                              }}
                            >
                              ✗
                            </td>}
                            
                          </tr>
                        );
                      })}
                    <tr></tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
export default TestList;
