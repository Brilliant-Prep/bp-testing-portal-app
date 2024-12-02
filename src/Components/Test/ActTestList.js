import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function ActTestList() {
  const [data, setData] = useState([]);
  const [tests, settests] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    gettests();
  }, []);

  useEffect(() => {
    if (id) {
      getSingleStudent(id);
    }
  }, [id]);

  const getSingleStudent = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit/${id}`
    );
  };

  const unassignTest = async (testId) => { 
    if (window.confirm("Are you sure you want to Unassign Test?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}unassignacttest/${testId}/${id}`
      );
      toast.success(response.data); 
    }
  };

  const gettests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getactivetests/${id}`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const checkStudent = (item, e) => {
    console.log(item);
    let index = tests.indexOf(item);
    let testsTemp = tests.slice();
    if (index > -1) {
      testsTemp.splice(index, 1);
    } else {
      testsTemp.push(item);
    }
    console.log(testsTemp);
    settests(testsTemp);
  };

  const handleSubmitAssign = async (e) => {
    e.preventDefault();
    if (tests.length === 0) {
      toast.error("Please Choose ACT Test");
    }
    else {
      let dataSend = {
        batch_id: id,
        tests: tests,
      };
      console.log(dataSend);
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}assignacttests`, dataSend, {
          withCredentials: true,
        });

        if (data) {
          toast.success("ACT Test Assigned Successfully.");
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
                    <h4 class="card-title">ACT Tests List</h4>
                  </div>
                  <div class="col-6 text-right">
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={handleSubmitAssign}
                    >
                      Assign Tests
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
                        <th>Test Code</th>
                        <th>Test Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Un Assigned</th>
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
                                <td align="center">                                  
                                  {item.status === 1 ? (
                                    <div>
                                        <input 
                                          disabled={item.status === 1}
                                          checked={item.status === 1}
                                          onChange={(e) => checkStudent(item._id, e)}
                                          type="checkbox"
                                          name="tests[]"
                                        />
                                    </div>
                                  ) : (
                                    <div>
                                        <input 
                                          onChange={(e) => checkStudent(item._id, e)}
                                          type="checkbox"
                                          name="tests[]"
                                        />
                                    </div>
                                  )}
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {item.test_code} 
                                </td>
                                <td>{item.test_title} </td>
                                <td>{start_date} </td>
                                <td>{end_date} </td>
                                <td style={{ color: item.status === 1 ? "green" : "red" }}>
                                    {item.status === 1 ? "Assigned" : "Not Assigned"}
                                </td>
                                <td>
                                    {item.status === 1 && (
                                          <label
                                            onClick={() => unassignTest(item._id)}
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
export default ActTestList;
