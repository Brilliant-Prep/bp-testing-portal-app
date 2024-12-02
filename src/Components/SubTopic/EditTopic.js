import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios"; 

const initialState = {
  topic_code: "",
  topic_title: "",
  topic_type: "",
};
function EditTopic() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    
    { value: "Reading", label: "Reading" },
    { value: "Writing", label: "Writing" },
    { value: "Math", label: "Math" },
    // Add more options as needed
  ];
  const [data, setData] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(''); 

  useEffect(() => {
    if (id) {
      getTopics();
      getSinglTopic(id);
    }
  }, [id]);
  const getTopics = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getalltopics`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const getSinglTopic = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit_subtopic/${id}`
    );
    if (response.status === 200) {
      const topicData = { ...response.data };
      setState(topicData);
      setValue("topic_code", topicData.topic_code);
      setValue("topic_title", topicData.topic_title);
      setValue("topic_type", topicData.topic_type);
      setValue("topic_id", topicData.topic_id);
      setSelectedOption2(topicData.topic_id);

      // Set the selectedOption based on the value from the database
      const selectedOptionFromDB = options.find(
        (option) => option.value === topicData.topic_type
      );
      setSelectedOption(selectedOptionFromDB); 
    }
  };

  function handleSelectChange(selectedOption) {
    setSelectedOption(selectedOption);
  }
  
  const handleSelectChange2 = event => {
    setSelectedOption2(event.target.value);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update_subtopic/${id}`,
        {
          ...values,
          id: id, 
          formData: formData,
          topic_type: selectedOption.value,
          topic_id: selectedOption2,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (data) {
        if (data.errors) {
          const { topic_code, topic_title, topic_type } = data.errors;
          if (topic_code) generateError(topic_code);
          else if (topic_title) generateError(topic_title);
          else if (topic_type) generateError(topic_type);
        } else {
          navigate("/subtopics");
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
                <h4 class="card-title">Edit Sub Topic</h4>
              </div>
              <div class="col-6 text-right">
                <Link class="btn btn-outline-warning" to={`/subtopics`}>
                      Back to Sub Topics
                </Link>
              </div>
            </div>
          </div>
          <br />
            <div class="row">
              <div class="col-12">
              <form class="form-sample" onSubmit={handleSubmit(onSubmit)}>
                <div class="row"> 
                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-6 col-form-label">
                          Topic Code <span class="error">*</span>
                        </label>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            name="topic_code"
                            class="form-control"
                            {...register("topic_code", {
                              required: "Topic Code is required",
                            })}
                          />
                          {errors.topic_code && (
                            <p style={{ color: "red" }}>{errors.topic_code.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-6 col-form-label">
                          Topic Title <span class="error">*</span>
                        </label>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            name="topic_title"
                            class="form-control"
                            {...register("topic_title", {
                              required: "Topic Title is required",
                            })}
                          />
                          {errors.topic_title && (
                            <p style={{ color: "red" }}>{errors.topic_title.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Select Type</label>
                            <div className="col-sm-6">
                              <Select
                                class="form-control"
                                options={options}
                                value={selectedOption}
                                onChange={handleSelectChange}
                              />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Select Topic</label>
                            <div className="col-sm-6">
                            <select 
                                class="form-control" value={selectedOption2} 
                                onChange={handleSelectChange2} >
                                <option value="">Select Topic</option>
                                {data.map(item => (
                                  <option key={item._id} value={item._id}>
                                    {item.topic_title}
                                  </option>
                                ))}
                              </select>
                            </div>
                        </div>
                    </div>
                </div> 
                <br /> 
                <div class="row">
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-outline-primary mr-2">
                      Submit
                    </button>
                    <button class="btn btn-light">Cancel</button>
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
export default EditTopic;
