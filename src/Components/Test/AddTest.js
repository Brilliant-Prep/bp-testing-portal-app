import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTest() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
 

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}savetest`,
        {
          ...values,
          id: 0,
          start_date: startDate,
          end_date: endDate,
          formData: formData,
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
          navigate("/tests");
          window.location.reload(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const [formData, setFormData] = useState([]); 

  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="card">
            <div class="card-body">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <h4 class="card-title">Create New ACT Test</h4>
                </div>
                <div class="col-6 text-right">
                     <Link to={`/tests`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to ACT Tests</Link>
                </div>
              </div>
            </div>
            <br />
              <div class="row">
                <div class="col-12">
                    <form class="form-sample" onSubmit={handleSubmit(onSubmit)}>
                      <div class="row"><div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">
                              Test Code <span class="error">*</span>
                            </label>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                name="test_code"
                                class="form-control"
                                {...register("test_code", {
                                  required: "Test Code is required",
                                })}
                              />
                              {errors.test_code && (
                                <p style={{ color: "red" }}>{errors.test_code.message}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">
                              Test Title <span class="error">*</span>
                            </label>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                name="test_title"
                                class="form-control"
                                {...register("test_title", {
                                  required: "Test Title is required",
                                })}
                              />
                              {errors.test_title && (
                                <p style={{ color: "red" }}>{errors.test_title.message}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">
                              Start Date <span class="error">*</span>
                            </label>
                            <div class="col-sm-6">
                              <DatePicker
                                class="form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              {errors.start_date && (
                                <p style={{ color: "red" }}>{errors.start_date.message}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-6 col-form-label">
                              End Date <span class="error">*</span>
                            </label>
                            <div class="col-sm-6">
                              <DatePicker
                                class="form-control"
                                selected={endDate}
                                onChange={(date2) => setEndDate(date2)}
                              />
                              {errors.end_date && (
                                <p style={{ color: "red" }}>{errors.end_date.message}</p>
                              )}
                            </div>
                          </div>
                        </div> 
                      </div> 
                      <div class="row">
                        <div class="col-md-12" align="center">
                          <Link to={`/tests`} class="btn btn-outline-danger">Cancel</Link>
                          {" "}
                          <button type="submit" class="btn btn-outline-primary mr-2">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
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

export default AddTest;
