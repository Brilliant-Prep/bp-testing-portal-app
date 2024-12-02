import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function StudentActList() {

  const location = useLocation();

  const [data, setData] = useState([]);
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);

  
  const student_id = new URLSearchParams(location.search).get('student_id'); // Get batch_id from URL query parameter

  const getStudents = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}getallstdactstests?student_id=${student_id}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    getStudents();
  }, [student_id]);  

  const ResetTest = async (id) => {
    if (window.confirm("Are you sure you want to Reset Test?")) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}reset_acttest/${id}/${student_id}`
      );
      toast.success(response.data);
      getStudents();
      window.location.reload(true);
    }
  }; 
  const Result = async (id) => {
    navigate(`/act/testresults/${id}?student_id=${student_id}`);
  };
  return (
    <div class="content-body container"> 
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title">Assign Students From ACT Tests</h4>
                  </div> 
                  {data.length > 0 ? (
                    <div class="col-6 text-right">
                      <a href="/students"
                        class="btn btn-outline-success" 
                      >
                        Back to Students
                      </a>
                  </div>
                  ) : ""}
                </div>
                <div class="table-responsive">
                  <table
                    class="table table-striped table-bordered zero-configuration"
                    width="100%"
                  >
                    <thead>
                      <tr> 
                        <th>S.No</th>
                        <th>Tests Name</th>
                        <th>Test Code</th>
                        <th>Status</th>
                        <th>English</th>
                        <th>Math</th>
                        <th>Reading</th>
                        <th>Science</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0
                        ? data.map((item, index) => {
                            return (
                              <tr> 
                                <td class="text-center">{index + 1}</td>
                                <td class="text-center"> 
                                  {item.test_title}
                                </td>
                                <td class="text-center">{item.test_code}</td>
                                <td class="text-center">
                                    {item.test_status === true ? 'Completed' :
                                    item.test_status === false ? 'Assigned' : 'Not Started'}
                                </td>
                                {item.test_status ? (
                                <>
                                  <td class="text-center"><strong>{item.english_scaleScore}</strong></td>
                                  <td class="text-center"><strong>{item.math_scaleScore}</strong></td> 
                                  <td class="text-center"><strong>{item.reading_scaleScore}</strong></td>
                                  <td class="text-center"><strong>{item.science_scaleScore}</strong></td> 
                                  <td class="text-center">  
                                      <label title="In Active Topic"
                                          className="btn btn-warning ms-2"
                                          onClick={() => Result(item._id)}
                                      >
                                          Results
                                      </label>
                                      <label title="" className="btn btn-success ms-2" onClick={() => ResetTest(item._id)}>Reset</label>
                                  </td>
                                </>) : (
                                    <>
                                      <td className="text-center">-</td>
                                      <td className="text-center">-</td>
                                      <td className="text-center">-</td>
                                      <td className="text-center">- </td>
                                      <td className="text-center">- </td>
                                    </>
                                  )}
                                
                              </tr>
                            );
                          })
                        :  (
                          <tr>
                              <td colspan="9" align="center">
                                  No Data Available
                              </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentActList;
