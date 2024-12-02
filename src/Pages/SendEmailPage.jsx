import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Headerbar from "../Components/Sidebar/Headerbar";

function SendEmailPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}send-verification-email`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );

      toast.info("Send success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="main-wrapper">
        <Headerbar />
        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <div class="content-wrapper">
              <div class="card">
                <div class="card-body">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-6">
                        <h4 class="card-title">Send email to verification</h4>
                      </div>
                      <div class="col-6 text-right">
                        <Link to={`/tests`} class="btn btn-outline-primary">
                          <i className="fa fa-arrow-left"></i> Back to ACT Tests
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-12">
                      <form
                        class="form-sample"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">
                                Student name <span class="error">*</span>
                              </label>
                              <div class="col-sm-9">
                                <input
                                  type="text"
                                  name="student_name"
                                  class="form-control"
                                  {...register("student_name", {
                                    required: "Student name is required",
                                  })}
                                />
                                {errors.student_name && (
                                  <p style={{ color: "red" }}>
                                    {errors.student_name.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">
                                Email address <span class="error">*</span>
                              </label>
                              <div class="col-sm-9">
                                <input
                                  type="email"
                                  name="email_address"
                                  class="form-control"
                                  {...register("email_address", {
                                    required: "Email address is required",
                                  })}
                                />
                                {errors.email_address && (
                                  <p style={{ color: "red" }}>
                                    {errors.email_address.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12" align="center">
                            <Link to={`/tests`} class="btn btn-outline-danger">
                              Cancel
                            </Link>{" "}
                            <button
                              type="submit"
                              class="btn btn-outline-primary mr-2"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                      <ToastContainer />
                    </div>
                  </div>

                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="copyright container">
            <p>&copy; - 2023 Zonup Prep. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendEmailPage;
