import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const initialState = {
  name: "",
  email: "",
};
function EditBatch() {
  const [state, setState] = useState();
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
      getSingleBatch(id);
    }
  }, [id]);
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const [timeData, setTimeData] = useState({});

  const handleCheckboxChange = (day) => {
    setTimeData((prevData) => ({
      ...prevData,
      [day]: prevData[day] ? undefined : { startTime: '', endTime: '' },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setTimeData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };


  const getSingleBatch = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit_batch/${id}`
    );
    if (response.status === 200) {
      setState({ ...response.data });
      setValue("batch_code", response.data.batch_code);
      setValue("batch_title", response.data.batch_title);
      setValue("no_of_students", response.data.no_of_students);
      setValue("no_of_days", response.data.no_of_days);
      setStartDate(new Date(response.data.start_date));
      setEndDate(new Date(response.data.end_date));
      
      setValue("starttime_sunday", response.data.starttime_sunday);
      setValue("endtime_sunday", response.data.endtime_sunday);
      setValue("starttime_monday", response.data.starttime_monday);
      setValue("endtime_monday", response.data.endtime_monday);
      setValue("starttime_tuesday", response.data.starttime_tuesday);
      setValue("endtime_tuesday", response.data.endtime_tuesday);
      setValue("starttime_wednesday", response.data.starttime_wednesday);
      setValue("endtime_wednesday", response.data.endtime_wednesday);
      setValue("starttime_thursday", response.data.starttime_thursday);
      setValue("endtime_thursday", response.data.endtime_thursday);
      setValue("starttime_friday", response.data.starttime_friday);
      setValue("endtime_friday", response.data.endtime_friday);
      setValue("starttime_saturday", response.data.starttime_saturday);
      setValue("endtime_saturday", response.data.endtime_saturday); 

      if(response.data.sunday==true) setTimeData['sunday'] = true;
      else setTimeData['sunday'] = false;
    }
  };


  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update_batch/${id}`,
        {
          ...values,
          id: id,
          start_date: startDate,
          end_date: endDate,
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
          navigate("/batches");
          window.location.reload(true);
        }
      }
    } catch (error) {
      console.log(error);
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
                      <h4 class="card-title">Edit Batch</h4>
                    </div>
                    <div class="col-6 text-right">
                      <Link to={`/batches`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to Batches</Link>
                    </div>
                  </div><br/>
                  <div> 
                      <form class="form-sample" onSubmit={handleSubmit(onSubmit)}>
                        <div class="row"><div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-6 col-form-label">
                                    Batch Code <span class="error">*</span>
                              </label>
                              <div class="col-sm-6">
                                <input
                                  type="text"
                                  name="batch_code"
                                  class="form-control"
                                  {...register("batch_code", {
                                    required: "Batch Code is required",
                                  })}
                                />
                                {errors.batch_code && (
                                  <p style={{ color: "red" }}>{errors.batch_code.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-6 col-form-label">
                                Batch Title <span class="error">*</span>
                              </label>
                              <div class="col-sm-6">
                                <input
                                  type="text"
                                  name="batch_title"
                                  class="form-control"
                                  {...register("batch_title", {
                                    required: "Test Title is required",
                                  })}
                                />
                                {errors.batch_title && (
                                  <p style={{ color: "red" }}>{errors.batch_title.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-6 col-form-label">
                                No of Students
                              </label>
                              <div class="col-sm-6">
                                <input
                                  type="text"
                                  name="no_of_students"
                                  class="form-control"
                                  {...register("no_of_students")}
                                />
                                {errors.no_of_students && (
                                  <p style={{ color: "red" }}>
                                    {errors.no_of_students.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-6 col-form-label">
                                No of Days <span class="error">*</span>
                              </label>
                              <div class="col-sm-6">
                                <input
                                  type="text"
                                  name="no_of_days"
                                  class="form-control"
                                  {...register("no_of_days", {
                                    required: "No of Days is required",
                                  })}
                                />
                                {errors.no_of_students && (
                                  <p style={{ color: "red" }}>
                                    {errors.no_of_days.message}
                                  </p>
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
                        <br />
                        
                        <div>
                            {daysOfWeek.map((day) => (
                              <div key={day} class="row">
                                <div class="col-md-3">
                                    <label>
                                      <strong>{day}</strong><br/>
                                      <input style={{ float: "left",paddingRight:"20px" }}
                                        name={day}
                                        type="checkbox"
                                        checked={timeData[day]}
                                        {...register(`${day}`)}
                                        onChange={() => handleCheckboxChange(day)}
                                      />
                                    </label>
                                </div>
                                <div class="col-md-9">
                                    {timeData[day] && (
                                      <>
                                      <div class="row">
                                        <div class="col-md-3">
                                            <label htmlFor={`startTime-${day}`}>Start Time:</label>
                                            <input
                                              class="form-control"
                                              type="time"
                                              name={`starttime_${day}`}
                                              {...register(`starttime_${day}`)}
                                              id={`startTime-${day}`}
                                              value={timeData[day]?.startTime || ''}
                                              onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                                            />
                                        </div>
                                        <div class="col-md-3">
                                            <label htmlFor={`endTime-${day}`}>End Time:</label>
                                            <input
                                              class="form-control"
                                              type="time"
                                              name={`endtime_${day}`}
                                              {...register(`endtime_${day}`)}
                                              id={`endTime-${day}`}
                                              value={timeData[day]?.endTime || ''}
                                              onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                                            />
                                        </div>
                                    </div><br/>
                                      </>
                                    )}
                                </div>
                              </div>
                            ))}
                        </div>
                        <br/><br/>
                        <div class="row" style={{marginTop: "20px"}}>
                          <div class="col-md-12" align="center">
                            <Link to={`/batches`} class="btn btn-outline-danger">Cancel</Link>
                                  {" "}
                            <button type="submit" class="btn btn-outline-primary mr-2">
                              Update
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

export default EditBatch;
