import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Modal from "./Modal";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

function TestList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); 
  let table = null;
  useEffect(() => {
    const fetchData = async () => {
      try { 
        await getTests();
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
      table = new DataTable('#satlist',{
        'lengthMenu':[[10,25,50,100,-1],[10,25,50,100,"All"]],
        'pageLength': 100,
      });
    }
  }, [data]);  

  const userId = localStorage.getItem("userid");
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // ... Other functions and code ...

  const openReportModal = (id) => {
    setSelectedTestId(id);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setSelectedTestId(null);
    setIsReportModalOpen(false);
  };

  const deleteTest = async (id) => {
    if (window.confirm("Are you sure you want to delete test?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}delete_sattest/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  const blockTest = async (id) => {
    if (window.confirm("Are you sure you want to deactivate test?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}block_sattest/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  const unblockTest = async (id) => {
    if (window.confirm("Are you sure you want to activate test?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}unblock_sattest/${id}`
      );
      toast.success(response.data);
      getTests();
    }
  };

  const blockVTest = async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}block_vsattest/${id}`
    );
    toast.success(response.data);
    getTests();
  };

  const unblockVTest = async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}unblock_vsattest/${id}`
    );
    toast.success(response.data);
    getTests();
  };

  const getTests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getallsattests`
    );
    if (response.status === 200) {
      setData(response.data);
      navigate("/sattests");
    }
  };
  const ResetTest = async (id) => {
    if (window.confirm("Are you sure you want to Reset Test?")) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}reset_sattest/${id}/${userId}`
      );
      toast.success(response.data);
      getTests();
      window.location.reload(true);
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
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title">SAT Tests List</h4>
                  </div>
                  <div class="col-6 text-right">
                    <Link to={`/add_sattest`} class="btn btn-outline-primary">
                      <i className="fa fa-plus"></i> Add New SAT Test
                    </Link>
                  </div>
                </div>
                <div class="table-responsive">
                  <table id="satlist" class="table table-striped table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Test Code</th>
                        <th>Test Name</th>
                        <th>No of Questions</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Video Status</th>
                        <th width="300px">Action</th>
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
                                <td>{index + 1}</td>
                                <td>{item.test_code}</td>
                                <td>{item.test_title}</td>
                                <td>{item.no_of_questions}</td>
                                <td>{start_date}</td>
                                <td>{end_date}</td>
                                <td align="center">
                                  {item.status ? (
                                    <label
                                      title="In Active Topic"
                                      className="btn btn-success ms-2"
                                      onClick={() => blockTest(item._id)}
                                    >
                                      <i className="fa fa-check"></i>
                                    </label>
                                  ) : (
                                    <label
                                      title="Active Topic"
                                      className="btn btn-danger ms-2"
                                      onClick={() => unblockTest(item._id)}
                                    >
                                      <i className="fa fa-times"></i>
                                    </label>
                                  )}
                                </td>
                                <td align="center">
                                  {item.vstatus ? (
                                    <label
                                      title="In Active Topic"
                                      className="btn btn-success ms-2"
                                      onClick={() => blockVTest(item._id)}
                                    >
                                      <i className="fa fa-check"></i>
                                    </label>
                                  ) : (
                                    <label
                                      title="Active Topic"
                                      className="btn btn-danger ms-2"
                                      onClick={() => unblockVTest(item._id)}
                                    >
                                      <i className="fa fa-times"></i>
                                    </label>
                                  )}
                                </td>
                                <td>
                                  <Link title="Assign Batches" to={`/assignbatches/${item._id}`}>
                                    <label
                                      className="btn btn-outline-info" 
                                    >
                                      <i className="fa  fa-tasks"></i>
                                    </label>
                                  </Link>{" "} 
                                  <Link to={`/excelimport/${item._id}`}>
                                    <label class="btn btn-outline-info">
                                      <i className="fa fa-upload"></i>
                                    </label>
                                  </Link>{" "}
                                  <Link to={`/edit_sattest/${item._id}`}>
                                    <label class="btn btn-outline-warning">
                                      <i className="fa fa-edit"></i>
                                    </label>
                                  </Link>{" "}
                                  <Link to={`/delete_sattest/${item._id}`}>
                                    <label
                                      className="btn btn-outline-danger"
                                      onClick={() => deleteTest(item._id)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </label>
                                  </Link><br/><br/>
                                  <Link to={`/start/satquestion/${item._id}`}>
                                    <label className="btn btn-outline-primary">
                                      <i className="fa fa-graduation-cap"></i>
                                    </label>
                                  </Link>{" "}
                                  <Link to={`/sat/testresults/${item._id}`}>
                                    <label className="btn btn-outline-info">
                                      <i className="fa fa-comments"></i>
                                    </label>
                                  </Link>{" "}  
                                  <Link onClick={() => ResetTest(item._id)}>
                                    <label className="btn btn-outline-info">
                                      <i className="fas fa-sync-alt">&#xf0e2;</i>
                                    </label>
                                  </Link>{" "}   
                                </td>
                              </tr>
                            );
                          })
                        : "<tr><td colspan='9'>No Data Available</td></tr>"}
                    </tbody>
                  </table>
                </div>
                {/* Report Modal */}
                <Modal
                  isOpen={isReportModalOpen}
                  closeModal={closeReportModal}
                ></Modal>
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
