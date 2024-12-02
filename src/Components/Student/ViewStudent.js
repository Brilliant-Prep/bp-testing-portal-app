import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
};

function EditStudent() {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit/${id}`
    );
    if (response.status === 200) {
      setState({ ...response.data });
      setValue("first_name", response.data.first_name);
      setValue("middle_name", response.data.middle_name);
      setValue("last_name", response.data.last_name);
      setValue("email", response.data.email);
      setValue("school", response.data.school);
      setValue("gpa", response.data.gpa);
      setValue("phone", response.data.phone);
      setValue("notes", response.data.notes);
    }
  };

  return ( 
    <div class="content-body container">
    <div class="container-fluid">
      <div class="row" style={{paddingTop:"20px"}}>
        <div class="col-6">
          <h4 class="card-title">View Student</h4>
        </div>
        <div class="col-6 text-right">
          <Link to={`/parents`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to Parents</Link>
        </div>
      </div><br/>
      <div class="row" style={{paddingTop:"20px"}}>
        <div class="col-12">
          <div class="card">
            <div class="card-body view_student">
              <div>  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            First Name <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              name="first_name"
                              class="form-control"
                              {...register("first_name", {
                                required: "First Name is required",
                              })}
                            />
                            {errors.first_name && (
                              <p style={{ color: "red" }}>{errors.first_name.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Middle Name</label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              class="form-control"
                              name="middle_name"
                              {...register("middle_name")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Last Name <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              name="last_name"
                              class="form-control"
                              {...register("last_name", {
                                required: "Last Name is required",
                              })}
                            />
                            {errors.last_name && (
                              <p style={{ color: "red" }}>{errors.last_name.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Email Address <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="email"
                              name="email"
                              class="form-control"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Enter valid email",
                                },
                              })}
                            />
                            {errors.email && (
                              <p style={{ color: "red" }}>{errors.email.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            School <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              class="form-control"
                              name="school"
                              {...register("school", {
                                required: "School Name is required",
                              })}
                            />
                            {errors.school && (
                              <p style={{ color: "red" }}>{errors.school.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Unweighted GPA <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              class="form-control"
                              name="gpa"
                              {...register("gpa", {
                                required: "Unweighted GPA is required",
                              })}
                            />
                            {errors.gpa && (
                              <p style={{ color: "red" }}>{errors.gpa.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Phone <span class="error">*</span>
                          </label>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              class="form-control"
                              name="phone"
                              {...register("phone", {
                                required: "Phone is required",
                              })}
                            />
                            {errors.phone && (
                              <p style={{ color: "red" }}>{errors.phone.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group row">
                          <label class="col-sm-12 col-form-label">Notes</label>
                          <div class="col-sm-12">
                            <textarea
                              class="form-control"
                              name="notes"
                              {...register("notes")}
                              style={{ height: "300px;" }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div> 
                  <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default EditStudent;
