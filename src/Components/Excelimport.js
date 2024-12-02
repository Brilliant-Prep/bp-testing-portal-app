import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Papa from 'papaparse';

function ExcelImport() { 

  const { id } = useParams();
  
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
    fetch(`${process.env.REACT_APP_BASE_URL}savecsv`, {
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
                  <h4 class="card-title"><strong>Question Upload</strong></h4>
                </div>
                <div class="col-6 text-right">
                  <Link class="btn btn-outline-warning" to={`/sattests`}>
                        Back to SAT Exams
                  </Link>
                </div>
              </div>
            </div>
            <br />
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                      <div>
                        <input type="file" accept=".csv" onChange={handleFileUpload} />{" "}<button class="btn btn-outline-success" onClick={saveToMongoDB}>Import Questions</button>
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
export default ExcelImport;
