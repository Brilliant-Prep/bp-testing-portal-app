import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function StudentSatList() {

  const location = useLocation();

  const [data, setData] = useState([]);
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);

  
  const student_id = new URLSearchParams(location.search).get('student_id'); // Get batch_id from URL query parameter

  const getStudents = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}getallstdsatstests?student_id=${student_id}`;
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
        `${process.env.REACT_APP_BASE_URL}reset_sattest/${id}/${student_id}`
      );
      toast.success(response.data);
      getStudents();
      window.location.reload(true);
    }
  }; 
  const ResetAllTest = async () => {
    if (window.confirm("Are you sure you want to Reset All Tests?")) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}reset_allsattest/${student_id}`
      );
      toast.success(response.data);
      getStudents();
      window.location.reload(true);
    }
  }; 
  
  const Result = async (id) => {
    navigate(`/sat/testresults/${id}?student_id=${student_id}`);
  };
  const startTest = async (id) => {
    navigate(`/start/satquestion/${id}?student_id=${student_id}`);
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
                    <h4 class="card-title">Assign Students From SAT Tests</h4>
                  </div> 
                  {data.length > 0 ? (
                    <div class="col-6 text-right">
                      <a href="/students"
                        class="btn btn-outline-success" 
                      >
                        Back to Students
                      </a>
                      {" "}
                      <a href="#" title="" className="btn btn-outline-success" onClick={() => ResetAllTest()}>Reset All Tests</a>
                      
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
                        <th>Reading & Writing Score</th>
                        <th>Math Score</th>
                        <th>Total Score</th> 
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
                                    item.tstatus === 'Resume Test' ? 'In Progress' : 'Not Started'}
                                </td>
                                {item.test_status ? (
                                  <>
                                    <td className="text-center"><strong>{item.readingCount}</strong></td>
                                    <td className="text-center"><strong>{item.mathCount}</strong></td>
                                    <td className="text-center"><strong>{item.totalCount}</strong></td>
                                    <td className="text-center"> 
                                        <label title="" className="btn btn-warning ms-2" onClick={() => Result(item._id)}>Results</label>
                                        <label title="" className="btn btn-success ms-2" onClick={() => ResetTest(item._id)}>Reset</label>
                                    </td>
                                  </>
                                  ) : (
                                    <>
                                      <td className="text-center">-</td>
                                      <td className="text-center">-</td>
                                      <td className="text-center">-</td>
                                      <td className="text-center">- </td>
                                    </>
                                  )}
                              </tr>
                            );
                          })
                        :  (
                          <tr>
                              <td colspan="8" align="center">
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
export default StudentSatList;
