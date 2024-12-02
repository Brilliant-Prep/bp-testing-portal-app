import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
let table = null;

function InstructorList() {
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {  
    setTimeout(() => {
      table.destroy()
      getInstructors();
    }, 2000);
  }, []);

  useEffect(()=>{
    table = new DataTable('#parentTable',{
      'lengthMenu':[[10,25,50,-1],[10,25,50,"All"]],
      'pageLength': 100, // Default to showing 100 rows
    });
    
  }) 

  const deleteInstructor = async (id) => {
    if (window.confirm("Are you sure you want to Delete Instructor?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}delete_user/${id}`
      );
      toast.success(response.data);
      getInstructors();
      window.location.reload(true);
    }
  };

  const blockParent = async (id) => {
    if (window.confirm("Are you sure you want to Deactivate Instructor?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}block_user/${id}`
      );
      toast.success(response.data);
      getInstructors();
      window.location.reload(true);
    }
  };

  const unblockInstructor = async (id) => {
    if (window.confirm("Are you sure you want to Activate Instructor?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}unblock_user/${id}`
      );
      toast.success(response.data);
      getInstructors();
      window.location.reload(true);
    }
  };

  const getInstructors = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getallinstructors`
    );
    if (response.status === 200) {
      setData(response.data);
      navigate("/instructors");
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
                    <h4 class="card-title">Instructor List</h4>
                  </div>
                  <div class="col-6 text-right">
                    <Link to={`/add_instructor`} class="btn btn-outline-primary"><i className="fa fa-plus"></i> Add Instructor</Link>
                  </div>
                </div>
                <div class="table-responsive">
                  <table
                    class="table table-striped table-bordered zero-configuration"
                    width="100%" id="parentTable"
                  >
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th width="180px" class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0
                        ? data.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {item.first_name} {item.middle_name}{" "}
                                  {item.last_name}
                                </td>
                                <td>{item.email}</td> 
                                <td>{item.phone}</td>
                                <td align="center"> 
                                    {item.status ? (
                                        <label title="In Active Topic"
                                          className="btn btn-success ms-2"
                                          onClick={() => blockParent(item._id)}
                                        >
                                          <i className="fa fa-check"></i>
                                        </label>
                                      ) : (
                                        <label title="Active Topic"
                                          className="btn btn-danger ms-2"
                                          onClick={() => unblockInstructor(item._id)}
                                        >
                                        <i className="fa fa-times"></i>
                                        </label>
                                      )}
                                </td>
                                <td class="text-center"> 
                                  <Link to={`/edit_instructor/${item._id}`}>
                                    <label title="Edit Instructor" class="btn btn-outline-primary">
                                      <i className="fa fa-edit"></i>
                                    </label>
                                  </Link>
                                  {" "}
                                  <Link to={`/delete_instructor/${item._id}`}>
                                  <label title="Delete Instructor" class="btn btn-outline-danger" 
                                      onClick={() => deleteInstructor(item._id)}> 
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
    </div>
  );
}
export default InstructorList;
