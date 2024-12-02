import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function StudentList() {
  const [data, setData] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getStudents(id);
  }, []);

  useEffect(() => {
    if (id) {
      getSingleStudent(id);
    }
  }, [id]);

  const getSingleStudent = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}edit/${id}`
      );
      const studentData = response.data;

      // Check if the student is already assigned
      const isAssigned = assignedStudents.some(
        (student) => student._id === studentData._id
      );

      // Update the student object to include assignment status
      studentData.isAssigned = isAssigned;

      // Update the data state with the modified student data
      setData((prevData) =>
        prevData.map((student) =>
          student._id === studentData._id ? studentData : student
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getStudents = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getactivestudents/${id}`
      );
      if (response.status === 200) {
        setData(response.data);
      } 
    } catch (error) {
      console.error(error);
    }
  };


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
        batch_id: id,
        students: students,
      };
      console.log(dataSend);
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}assignbatches`, dataSend, {
          withCredentials: true,
        });

        if (data) {
          toast.success("Student Assigned Successfully.");
          window.location.reload(true);
        }
      } catch (error) {
        console.log(error);
      }
    }  
  };

  const unassignStudent = async (studentId) => { 
    if (window.confirm("Are you sure you want to Unassign Student?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}unassignstudent/${studentId}/${id}`
      );
      toast.success(response.data); 
      window.location.reload(true);
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
                    <h4 class="card-title">Students List</h4>
                  </div>
                  <div class="col-6 text-right">
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={handleSubmitAssign}
                    >
                      Assign Students
                    </button>{" "}
                  </div>
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
                        <th>Status</th>
                        <th>Un Assigned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0
                        ? data.map((item, index) => {
                            return (
                              <tr>
                                <td align="center">
                                  {item.status === 1 ? (
                                    <div>
                                        <input 
                                          disabled={item.status === 1}
                                          checked={item.status === 1}
                                          onChange={(e) => checkStudent(item._id, e)}
                                          type="checkbox"
                                          name="students[]"
                                        />
                                    </div>
                                  ) : (
                                    <div>
                                        <input 
                                          onChange={(e) => checkStudent(item._id, e)}
                                          type="checkbox"
                                          name="students[]"
                                        />
                                    </div>
                                  )}
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {item.first_name} {item.middle_name}{" "}
                                  {item.last_name}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.school}</td>
                                <td>{item.phone} {item.status}</td>
                                <td style={{ color: item.status === 1 ? "green" : "red" }}>
                                    {item.status === 1 ? "Assigned" : "Not Assigned"}
                                </td>
                                <td>
                                    {item.status === 1 && (
                                          <label
                                            onClick={() => unassignStudent(item._id)}
                                            title="Delete ACT Test"
                                            className="btn btn-outline-danger ms-2"
                                          >
                                            <i className="fa fa-close" aria-hidden="true"></i>
                                          </label>
                                      )}
                                </td>
                              </tr>
                            );
                          })
                        : ""}
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
export default StudentList;
