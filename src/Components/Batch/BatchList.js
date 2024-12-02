import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
let table = null;

function TestList() {
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); 
  let table = null;
  useEffect(() => {
    const fetchData = async () => {
      try { 
        await getAllbatches();
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
      table = new DataTable('#batchTables',{
        'lengthMenu':[[10,25,50,-1],[10,25,50,100,"All"]],
        'pageLength': 100,
      });
    }
  }, [data]);  

  const getAllbatches = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}getallbatches`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setSections(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteBatch = async (id) => {
    if (window.confirm("Are you sure you want to delete Batch?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}delete_batch/${id}`
      );
      toast.success(response.data);
      getAllBatches();
    }
  };

  const blockBatch = async (id) => {
    if (window.confirm("Are you sure you wnat to deactivate Batch?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}block_batch/${id}`
      );
      toast.success(response.data);
      getAllBatches();
    }
  };

  const unblockBatch = async (id) => {
    if (window.confirm("Are you sure you want to activate Batch?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}unblock_batch/${id}`
      );
      toast.success(response.data);
      getAllBatches();
    }
  };

  const getAllBatches = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getallbatches`
    );
    if (response.status === 200) {
      setData(response.data);
      navigate("/batches");
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
          <div class="col-6">
            <h4 class="card-title">Batch List </h4>
          </div>
          <div class="col-6 text-right">
            <Link to={`/add_batch`} class="btn btn-outline-primary"><i className="fa fa-plus"></i> Add Batch</Link>
          </div>
        </div><br clear="all"/>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                <table id="batchTables" class="table table-striped table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Batch Code</th>
                        <th>Batch Schedule</th>
                        <th>Batch Name</th>
                        <th>Assign / Max Students</th>
                        <th>No of Days</th>
                        <th>ACT</th>
                        <th>SAT</th>
                        <th>Status</th>
                        <th width="280px" style={{textAlign:"center"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections.length > 0
                        ? sections.map((item, index) => {
                            let start_date = new Date(
                              item.start_date
                            ).toLocaleDateString("en-US");
                            let end_date = new Date(
                              item.end_date
                            ).toLocaleDateString("en-US");
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td valign="top">{item.batch_code}</td>
                                <td valign="top">ST: {start_date}<br/>ET: {end_date}</td>
                                <td valign="top">{item.batch_title}</td>
                                <td valign="top" style={{textAlign: "center"}}>
                                  
                                  <Link to={`/students_batches?batch_id=${item._id}`}>
                                    <Button className="btn-sm btn-info ms-6">
                                      <strong>{item.student_count} / {item.no_of_students}</strong>
                                    </Button>
                                  </Link>
                                </td>
                                <td valign="top" align="center">{item.no_of_days}</td>
                                <td valign="top">
                                    <Link to={`/acttests_batches?batch_id=${item._id}`}>
                                      <Button className="btn-sm btn-info ms-6">
                                        <strong>{item.act_count}</strong>
                                      </Button>
                                    </Link>
                                </td>
                                <td valign="top"> 
                                    <Link to={`/sattests_batches?batch_id=${item._id}`}>
                                      <Button className="btn-sm btn-info ms-6">
                                        <strong>{item.sat_count}</strong>
                                      </Button>
                                    </Link>
                                </td>
                                <td valign="top">
                                  {item.status ? (
                                    <label
                                      className="btn btn-success ms-2"
                                      onClick={() => unblockBatch(item._id)}
                                    >
                                      <i className="fa fa-check"></i>
                                    </label>
                                  ) : (
                                    <label
                                      className="btn btn-danger ms-2"
                                      onClick={() => blockBatch(item._id)}
                                    >
                                     <i className="fa fa-times"></i>
                                    </label>
                                  )}
                                </td>
                                <td> 
                                  <Link to={`/assigntests/${item._id}`}>
                                    <label className="btn btn-outline-info ms-2">
                                      <i className="fa fa-tasks"></i>
                                    </label>
                                  </Link>
                                  <Link to={`/assignacttests/${item._id}`}>
                                    <label className="btn btn-outline-primary ms-2">
                                      A
                                    </label>
                                  </Link>
                                  <Link to={`/assignsattests/${item._id}`}>
                                    <label className="btn btn-outline-warning ms-2">
                                      S
                                    </label>
                                  </Link>
                                  <Link to={`/edit_batch/${item._id}`}>
                                    <label className="btn btn-outline-primary ms-2">
                                      <i className="fa fa-edit"></i>
                                    </label>
                                  </Link> 
                                  <Link to={`/delete_batch/${item._id}`}>
                                    <label
                                      className="btn btn-outline-danger ms-2"
                                      onClick={() => deleteBatch(item._id)}
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </label>
                                  </Link>
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
      )}
    </div> 
  );
}
export default TestList;
