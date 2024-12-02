import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const { parent_id } = useParams();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedOption, setSelectedOption] = useState('default');

  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }

  // Event handler for when the select value changes
  const handleSelectChange2 = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}register`,
        {
          ...values,
          graduation_year: selectedClient,
          parent_id: parent_id,
          role: "student",
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (data) {
        if (data.errors) {
          const { name, email, password } = data.errors;
          if (name) generateError(name);
          else if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/students");
          window.location.reload(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  return (
    <div class="content-body container">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              <h4 class="card-title">Add Student</h4>
            </div>
            <div class="col-6 text-right">
              <Link to={`/parents`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to Parents</Link>
            </div>
          </div><br/>
          <div> 
              <form class="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                      <div class="col-12">
              <div class="card">
                <div class="card-body">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-12 col-form-label">
                                First Name <span class="error">*</span>
                              </label>
                              <div class="col-sm-12">
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
                              <label class="col-sm-12 col-form-label">Middle Name</label>
                              <div class="col-sm-12">
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
                              <label class="col-sm-12 col-form-label">
                                Last Name <span class="error">*</span>
                              </label>
                              <div class="col-sm-12">
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
                              <label class="col-sm-12 col-form-label">
                                Email Address <span class="error">*</span>
                              </label>
                              <div class="col-sm-12">
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
                              <label class="col-sm-12 col-form-label">
                                Password <span class="error">*</span>
                              </label>
                              <div class="col-sm-12">
                                <input
                                  type="password"
                                  class="form-control"
                                  {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                      value: 6,
                                      message: "Password must be more than 4 characters",
                                    },
                                    maxLength: {
                                      value: 8,
                                      message:
                                        "Password cannot exceed more than 8 characters",
                                    },
                                  })}
                                />
                                {errors.Password && (
                                  <p style={{ color: "red" }}>{errors.Password.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-12 col-form-label">
                                Timer <span class="error">*</span>
                              </label>
                              <div class="col-sm-12"> 
                                   <select class="form-control" name="timeroptions" 
                                    value={selectedOption}
                                    onChange={handleSelectChange2}>
                                           <option value="default">Default</option>
                                           <option value="1.5">1.5 x</option>
                                           <option value="2">2x</option>
                                   </select>
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
                  </div>
                  </div>
            </div>
          </div>
                        <br alear="all"/>
                          <div class="row" style={{ marginTop: "20px" }}>
                            <div class="col-md-12" align="right">
                              <Link to={`/parents`} class="btn btn-outline-danger">Cancel</Link>
                              {" "}
                              <button type="submit" class="btn btn-outline-success mr-2">
                                Submit
                              </button>
                            </div>
                          </div>
              </form>
              <ToastContainer />
          </div>
        </div>
    </div>
  );
}

export default AddStudent;
