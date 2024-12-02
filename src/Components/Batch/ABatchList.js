import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function BatchList() {
  const [data, setData] = useState([]);
  const [assignedBatches, setAssignedBatches] = useState([]);
  const [batches, setBatches] = useState([]);
  const [testname, setTestName] = useState([]);
  const [testcode, setTestCode] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getBatches(id);
  }, []);

  const getBatches = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getactivebatches/${id}`
      );
      if (response.status === 200) {
        const batchData = response.data;
        // Assuming batchData is an array, you can access the first element to get name and code
        if (batchData.length > 0) {
            const testdetails= batchData[0];
            setData(batchData);
            setTestCode(testdetails.testcode);
            setTestName(testdetails.testname);
        }
        setData(batchData);
      } 
    } catch (error) {
      console.error(error);
    }
  };


  const checkBatch = (item, e) => {
    console.log(item);
    let index = batches.indexOf(item);
    let batchesTemp = batches.slice();
    if (index > -1) {
      batchesTemp.splice(index, 1);
    } else {
      batchesTemp.push(item);
    }
    console.log(batchesTemp);
    setBatches(batchesTemp);
  };

  const handleSubmitAssign = async (e) => {
    e.preventDefault();
    if (batches.length === 0) {
      toast.error("Please choose batch");
    }
    else {
      let dataSend = {
        test_id: id,
        batches: batches,
      };
      console.log(dataSend);
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}assignbsattests`, dataSend, {
          withCredentials: true,
        });

        if (data) {
          toast.success("Batch Assigned Successfully.");
          window.location.reload(true);
        }
      } catch (error) {
        console.log(error);
      }
    }  
  };

  const unassignBatch = async (batchId) => { 
    if (window.confirm("Are you sure you want to Unassign Batch?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}unassignsattest/${id}/${batchId}`
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
                        <h4 className="card-title">{testname} - {testcode}: Assign Batches</h4>
                  </div>
                  <div class="col-6 text-right">
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={handleSubmitAssign}
                    >
                      Assign Batches
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
                        <th>Batch Name</th>
                        <th>Batch Code</th> 
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
                                          onChange={(e) => checkBatch(item._id, e)}
                                          type="checkbox"
                                          name="batches[]"
                                        />
                                    </div>
                                  ) : (
                                    <div>
                                        <input 
                                          onChange={(e) => checkBatch(item._id, e)}
                                          type="checkbox"
                                          name="batches[]"
                                        />
                                    </div>
                                  )}
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {item.batch_title}
                                </td> 
                                <td>{item.batch_code}</td>
                                <td style={{ color: item.status === 1 ? "green" : "red" }}>
                                    {item.status === 1 ? "Assigned" : "Not Assigned"}
                                </td>
                                <td>
                                    {item.status === 1 && (
                                          <label
                                            onClick={() => unassignBatch(item._id)}
                                            title="Delete Batch"
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
export default BatchList;
