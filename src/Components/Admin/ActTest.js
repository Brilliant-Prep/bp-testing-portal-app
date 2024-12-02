import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import ConfirmationPopup from "../Popups/ConfirmationPopup";
import { useParams } from "react-router-dom";

function ActTest() {
  const params = useParams();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [btnText, setbtnText] = useState("Submit Test");
  const [no_questions, setnoquestions] = useState();
  const [section_name, setname] = useState();
  const userid = localStorage.getItem("userid"); 
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState([]);
  const [english_count, setenglishcount] = useState([]);
  const [math_count, setmathcount] = useState([]);
  const [reading_count, setreadingcount] = useState([]);
  const [science_count, setsciencecount] = useState([]);
  const { id } = useParams();
  const { sid } = useParams();
  useEffect(() => { 
    if(sid==1) 
    {
      setnoquestions(75);
      setname('English');
    }
    if(sid==2)
    {
      setnoquestions(60);
      setname(section_name);
      setname('Math');
    }
    if(sid==3)
    {
      setnoquestions(40);
      setname(section_name);
      setname('Reading');
    }
    if(sid==4)
    {
      setnoquestions(40);
      setname(section_name);
      setname('Science');
    }
  }, [id], [sid]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

   

  const myArray = [];
  for (let i = 1; i <= no_questions; i++) {
    myArray.push(i);
  }

  const onSubmit = async (data) => {
    const formData1 = Object.entries(data).map(([key, value]) => ({
      question: parseInt(key.split("_")[1], 10) + 1,
      answer: value,
    }));
    setFormData(formData1);
    setOpenConfirmation(true);
  };

  const handleConfirm = async () => {
    setOpenConfirmation(false);
    const body = {
      created_by: userid,
      test_id: id,
      section: section_name,
      questions_and_answers: formData,
    };
    try {
      const result = await apiService().post("acttest", body);
      reset();
      if(sid==4) navigate(`/act/testresults/${id}`);
      else navigate(`/acttests/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpenConfirmation(false);
  };

  const getInitialData = async () => {
    try {
      const result = await apiService().get(`getActtest?test_id=${params.id}&section=${params.sid}`);
      if (result.data.data) {
        setbtnText("Update Test");
        result.data.data.questions_and_answers.forEach((element, index) => {
          setValue(`selectedValues_${index}`, element.answer);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getsInitialData = async () => {
    try {
      const result = await apiService().get(`getSActtest?test_id=${params.id}&userid=${userid}&section=${params.sid}`);
      if (result.data.data) { 
        setApiResponse(result.data.data.questions_and_answers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPracticeTests = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}actsectionstatus/${userid}/${params.id}`
    );
      if (response.status === 200) {
          setenglishcount(response.data.english_count);         
          setmathcount(response.data.math_count);        
          setreadingcount(response.data.reading_count);        
          setsciencecount(response.data.science_count);
      }
    };
  useEffect(() => {
    getInitialData();
    getsInitialData();
    getPracticeTests();
  }, []);
  return (
    <>
      {openConfirmation && (
        <ConfirmationPopup
          open={true}
          title="Confirmation"
          message="Are you sure you want to proceed?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div className="practice_tests">
        <div className="blocks active">              
            <div class="icon">
            <i class="fa fa-edit"></i>
            </div>
            <div className="content">
                <h3>1st Act Practice Test</h3>
                <p>Version: Practice 2008|09</p>
                {section_name}                 
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="App">
            {myArray.map((option, index) => {
            const selectedAnswer = apiResponse[index] ? apiResponse[index].answer : null;            
            const rightAnswer = apiResponse[index] ? apiResponse[index].ranswer : null;  
            return (
                  <div  className="radio-btn-container">
                    {option % 2 === 0 ? (
                      <div>
                          <div className="number">{option}</div>
                          <div className="radio-btn"> 
                          <input 
                            type="radio"
                            id={`option1_${index}`}
                            name={`selectedValues_${index}`} 
                            value="F"
                            {...register(`selectedValues_${index}`)}
                          />
                          <label
                            style={{ color: (selectedAnswer === "F" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "F") ? 'red' : 'black' }}
                            htmlFor={`option1_${index}`}
                            className="radioLabel"
                          >
                            F
                          </label>
                          </div>
                          <div className="radio-btn">
                            <input id={`option2_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="G" 
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "G" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "G") ? 'red' : 'black' }}
                            htmlFor={`option2_${index}`} className="radioLabel">G</label>
                          </div>
                          <div className="radio-btn">
                            <input id={`option3_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="H"
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "H" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "H") ? 'red' : 'black' }}
                            htmlFor={`option3_${index}`} className="radioLabel">H</label>
                          </div>
                          <div className="radio-btn">
                            
                            <input id={`option4_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="J"
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "J" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "J") ? 'red' : 'black' }}
                            htmlFor={`option4_${index}`} className="radioLabel">J</label>
                          </div>
                          {sid == 2 && (
                              <div className="radio-btn">
                                <input
                                  id={`option5_${index}`}
                                  name={`selectedValues_${index}`}
                                  type="radio"
                                  value="K"
                                  {...register(`selectedValues_${index}`)}
                                />
                                <label
                                  style={{
                                    color:
                                      selectedAnswer === "K" && selectedAnswer === rightAnswer
                                        ? "green"
                                        : selectedAnswer === "K"
                                        ? "red"
                                        : "black",
                                  }}
                                  htmlFor={`option5_${index}`}
                                  className="radioLabel"
                                >
                                  K
                                </label>
                              </div>
                            )}
                      </div>
                    ) : (
                      <div>
                          <div className="number">{option}</div>
                          <div className="radio-btn">
                            <input id={`option1_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="A"
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "A" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "A") ? 'red' : 'black' }}
                            htmlFor={`option1_${index}`} className="radioLabel">A</label>
                          </div>
                          <div className="radio-btn">
                            <input id={`option2_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="B"
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "B" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "B") ? 'red' : 'black' }}
                            htmlFor={`option2_${index}`} className="radioLabel">B</label>
                          </div>
                          <div className="radio-btn">
                            <input id={`option3_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="C"
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "C" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "C") ? 'red' : 'black' }}
                            htmlFor={`option3_${index}`} className="radioLabel">C</label>
                          </div>
                          <div className="radio-btn">
                            <input id={`option4_${index}`}
                              name={`selectedValues_${index}`}
                              type="radio"
                              value="D" 
                              {...register(`selectedValues_${index}`)}
                            />
                            <label 
                            style={{ color: (selectedAnswer === "D" && selectedAnswer === rightAnswer) ? 'green' : (selectedAnswer === "D") ? 'red' : 'black' }}
                            htmlFor={`option4_${index}`} className="radioLabel">D</label>
                          </div>
                          {sid == 2 && (
                            <div className="radio-btn">
                              <input
                                id={`option5_${index}`}
                                name={`selectedValues_${index}`}
                                type="radio"
                                value="E"
                                {...register(`selectedValues_${index}`)}
                              />
                              <label
                                style={{
                                  color:
                                    selectedAnswer === "E" && selectedAnswer === rightAnswer
                                      ? "green"
                                      : selectedAnswer === "E"
                                      ? "red"
                                      : "black",
                                }}
                                htmlFor={`option5_${index}`}
                                className="radioLabel"
                              >
                                E
                              </label>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            <br />
            <br />
            {errors && (
              <span
                style={{
                  color: "red",
                }}
              > 
              </span>
            )}
            <br />
            <br /> 
                {((sid == 1 && english_count === 0) ||
                  (sid == 2 && math_count === 0) ||
                  (sid == 3 && reading_count === 0) ||
                  (sid == 4 && science_count === 0)) && (
                  <button type="submit" className="btn btn-outline-success">
                    {btnText}
                  </button>
                )}
            <br />
            <br />
          </div>
        </form>
      </div>
    </>
  );
}

export default ActTest;
