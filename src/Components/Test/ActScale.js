import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Papa from 'papaparse';

function ActImport() { 
 
  const [testRecords, setTestRecords] = useState([]);
  const { id } = useParams();  
  
  const initData = (id) => {
    if (id) { 
      getTestRecords(); 
    }
  }


  const getTestRecords = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getActscale?test_id=${id}`, {
      headers: {
        token: typeof windows !== "undefined" ? localStorage.getItem('token') : ""
      }
    }
    );
    if (response.status === 200) {
      setTestRecords(response.data.data); 
    }
  }; 

  useEffect(() => {
    initData(id);
  }, [id]); 
  
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: false, // No headers in this CSV format
      complete: handleParsedData,
    });
  };

  const handleParsedData = (parsedData) => {
    setCsvData(parsedData.data);
  };

  const saveToMongoDB = () => {
    alert(id);
    fetch(`${process.env.REACT_APP_BASE_URL}saveactscale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testId: id,
        csvData: csvData,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Failed to save data');
      }
    })
    .then(message => {
      console.log(message); // Display success message from the server
      // You can also show the success message to the user in your React component
      // For example: set a state variable to display a message in the UI
      alert('Data saved successfully');
    })
    .catch(error => {
      console.error(error);
      // Handle error and display an error message to the user if needed
      alert('An error occurred while saving data');
    });
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
                  <h4 class="card-title"><strong>Upload Scale</strong></h4>
                </div>
                <div class="col-6 text-right">
                  <Link class="btn btn-outline-warning" to={`/tests`}>
                        Back to Act Tests
                  </Link>
                </div>
              </div>
            </div>
            <br />
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                      <div class="text-center">
                        <input type="file" accept=".csv" onChange={handleFileUpload} />{" "}<button class="btn btn-outline-success" onClick={saveToMongoDB}>Import Questions</button>
                      </div>
                  </div>
                </div>
              </div>
              <div class="row" style={{margin:"20px"}}>
                   <table border="1" cellpadding="10" cellspacing="10" width="100%" class="scale_table">
                        <tr height="40px">
                            <td rowSpan="2" class="text-center"><strong>Scale<br/>Scores</strong></td>
                            <td colSpan="4" class="text-center"><strong>Raw Scores</strong></td>
                            <td rowSpan="2" class="text-center"><strong>Scale<br/>Scores</strong></td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <strong>Test 1</strong> <br/>
                                English
                            </td>
                            <td class="text-center">
                                <strong>Test 2</strong> <br/>
                                Mathematics
                            </td>
                            <td class="text-center">
                                <strong>Test 3</strong><br/>
                                Reading
                            </td>
                            <td class="text-center">
                                <strong>Test 4</strong><br/>
                                Science
                            </td>
                        </tr>
                        {testRecords.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">
                                    <strong>{item.scale_score}</strong>
                                </td>
                                <td className="text-center">
                                    {item.eglish_minscore === null && item.eglish_maxscore === null ? 
                                        '-' :
                                        item.eglish_minscore === item.eglish_maxscore ? 
                                            item.eglish_minscore : 
                                            `${item.eglish_minscore}-${item.eglish_maxscore}`}
                                </td>
                                <td className="text-center">
                                    {item.math_minscore === null && item.math_maxscore === null ? 
                                        '-' :
                                        item.math_minscore === item.math_maxscore ? 
                                            item.math_minscore : 
                                            `${item.math_minscore}-${item.math_maxscore}`}
                                </td>
                                <td className="text-center">
                                    {item.reading_minscore === null && item.reading_maxscore === null ? 
                                        '-' :
                                        item.reading_minscore === item.reading_maxscore ? 
                                            item.reading_minscore : 
                                            `${item.reading_minscore}-${item.reading_maxscore}`}
                                </td>
                                <td className="text-center">
                                    {item.science_minscore === null && item.science_maxscore === null ? 
                                        '-' :
                                        item.science_minscore === item.science_maxscore ? 
                                            item.science_minscore : 
                                            `${item.science_minscore}-${item.science_maxscore}`}
                                </td>
                                <td className="text-center">
                                    <strong>{item.scale_score}</strong>
                                </td>
                            </tr>
                        ))}
                   </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );   
}
export default ActImport;
