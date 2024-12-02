import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function SatBList() {

  const location = useLocation();

  const [data, setData] = useState([]);
  const navigate = useNavigate(); 
  const [tests, setTests] = useState([]);

  
  const batch_id = new URLSearchParams(location.search).get('batch_id'); // Get batch_id from URL query parameter

  const getActTests = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}getallsatstests?batch_id=${batch_id}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  useEffect(() => {
    getActTests();
  }, [batch_id]); 
  
  const checkTest = (item, e) => {
    console.log(item);
    let index = tests.indexOf(item);
    let testsTemp = tests.slice();
    if (index > -1) {
        testsTemp.splice(index, 1);
    } else {
        testsTemp.push(item);
    }
    console.log(testsTemp);
    setTests(testsTemp);
  };

  const handleSubmitAssign = async (e) => {
    e.preventDefault();
    if (tests.length === 0) {
      toast.error("Please choose test");
    }
    else {
      let dataSend = {
        batch_id: batch_id,
        tests: tests,
      };
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}delete_batch_sattest`, dataSend, {
          withCredentials: true,
        });

        if (data) {
          toast.success(data);
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
                    <h4 class="card-title">Assign Sat Tests From Batch</h4>
                  </div> 
                  {data.length > 0 ? (
                    <div class="col-6 text-right">
                      <button
                        class="btn btn-outline-success"
                        type="submit"
                        onClick={handleSubmitAssign}
                      >
                        Un Assign Act Tests
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
                        <th>Test Code</th>
                        <th>Test Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
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
                                  <input
                                    onChange={(e) => checkTest(item._id, e)}
                                    type="checkbox"
                                    name="tests[]"
                                  />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {item.test_code} 
                                </td>
                                <td>{item.test_title} </td>
                                <td>{start_date} </td>
                                <td>{end_date} </td>
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
export default SatBList;
