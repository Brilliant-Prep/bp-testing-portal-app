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

function AdminList() {
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAdmins(); 
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
      table = new DataTable('#parentTable',{
        'lengthMenu':[[10,25,50,-1],[10,25,50,"All"]],
        'pageLength': 100,
      });
    }
  }, [data]); 

  const deleteAdmin = async (id) => {
    if (window.confirm("Are you sure you want to Delete Admin?")) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}delete_user/${id}`
      );
      toast.success(response.data);
      getAdmins();
      window.location.reload(true);
    }
  };

  const blockParent = async (id) => {
    if (window.confirm("Are you sure you want to Deactivate Sub Admin?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}block_user/${id}`
      );
      toast.success(response.data);
      getAdmins();
      window.location.reload(true);
    }
  };

  const unblockParent = async (id) => {
    if (window.confirm("Are you sure you want to Activate Sub Admin?")) {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}unblock_user/${id}`
      );
      toast.success(response.data);
      getAdmins();
      window.location.reload(true);
    }
  };

  const getAdmins = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getalladmins`
    );
    if (response.status === 200) {
      setData(response.data);
      navigate("/admins");
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
            <h4 class="card-title">Admin List</h4>
          </div>
          <div class="col-6 text-right">
            <Link to={`/add_admin`} class="btn btn-outline-primary"><i className="fa fa-plus"></i> Add Admin</Link>
          </div>
        </div>
        <div class="row"  style={{ marginTop: "20px" }}>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
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
                        <th className="text-center">Status</th>
                        <th width="180px"className="text-center">Action</th>
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
                                          onClick={() => unblockParent(item._id)}
                                        >
                                        <i className="fa fa-times"></i>
                                        </label>
                                      )}
                                </td>
                                <td className="text-center"> 
                                  <Link to={`/edit_admin/${item._id}`}>
                                    <label title="Edit Admin" class="btn btn-outline-primary">
                                      <i className="fa fa-edit"></i>
                                    </label>
                                  </Link>
                                  {" "}
                                  <Link to={`/delete_admin/${item._id}`}>
                                  <label title="Delete Admin" class="btn btn-outline-danger" 
                                      onClick={() => deleteAdmin(item._id)}> 
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
export default AdminList;
