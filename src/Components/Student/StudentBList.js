import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function StudentBList() {

  const location = useLocation();

  const [data, setData] = useState([]);
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);

  
  const batch_id = new URLSearchParams(location.search).get('batch_id'); // Get batch_id from URL query parameter

  const getStudents = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}getallstudents?batch_id=${batch_id}`;
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
  }, [batch_id]); 
  
  const checkStudent = (item, e) => {
    console.log(item);
    let index = students.indexOf(item);
    let studentsTemp = students.slice();
    if (index > -1) {
      studentsTemp.splice(index, 1);
    } else {
      studentsTemp.push(item);
    }
    console.log(studentsTemp);
    setStudents(studentsTemp);
  };

  const handleSubmitAssign = async (e) => {
    e.preventDefault();
    if (students.length === 0) {
      toast.error("Please choose student");
    }
    else {
      let dataSend = {
        batch_id: batch_id,
        students: students,
      };
      console.log(dataSend);
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}delete_batch_student`, dataSend, {
          withCredentials: true,
        });

        if (data) {
          toast.success("Student Deleted Successfully.");
          window.location.reload(true);
        }
      } catch (error) {
        console.log(error);
      }
    }  
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
                    <h4 class="card-title">Assign Students From Batch</h4>
                  </div> 
                  {data.length > 0 ? (
                    <div class="col-6 text-right">
                      <button
                        class="btn btn-outline-success"
                        type="submit"
                        onClick={handleSubmitAssign}
                      >
                        Delete Students
                      </button>
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
                        <th></th>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Email Address</th>
                        <th>School</th>
                        <th>Phone</th> 
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0
                        ? data.map((item, index) => {
                            return (
                              <tr>
                                <td align="center">
                                  <input
                                    onChange={(e) => checkStudent(item._id, e)}
                                    type="checkbox"
                                    name="students[]"
                                  />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {item.first_name} {item.middle_name}{" "}
                                  {item.last_name}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.school}</td>
                                <td>{item.phone}</td> 
                              </tr>
                            );
                          })
                        :  (
                          <tr>
                              <td colspan="6" align="center">
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
export default StudentBList;
