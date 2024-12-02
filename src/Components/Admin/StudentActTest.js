import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import ConfirmationPopup from "../Popups/ConfirmationPopup";
import { useParams } from "react-router-dom";

function NActTest() {
  const params = useParams();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [btnText, setbtnText] = useState("Submit Test");
  const [no_questions, setnoquestions] = useState();
  const [sbomData, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [testRecords, setTestRecords] = useState([]);
  const { id } = useParams();

  const initData = (id) => {
    if (id) {
      getSingleTest(id);
      getTestRecords();
      getSections();
    }
  }

  useEffect(() => {
    initData(id);
  }, [id]);

  const getSections = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getallsections/${id}`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const getTestRecords = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getSActtest?test_id=${id}`, {
      headers: {
        token: typeof windows !== "undefined" ? localStorage.getItem('token') : ""
      }
    }
    );
    if (response.status === 200) {
      setTestRecords(response.data);
    }
  };


  useEffect(() => {
    console.log("selected test records  >", testRecords);
    const { data } = testRecords;
    if (data && data?.questions_and_answers && data?.questions_and_answers.length > 0) {
      data.questions_and_answers.forEach((item) => {
        setSelectedValues((prevSelectedValues) => ({
          ...prevSelectedValues,
          [`${item.section}_${item.question}`]: item.answer,
        }));
      })

    }
  }, [testRecords]);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const getSingleTest = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}sedit_test/${id}`
    );
    if (response.status === 200) {
      setnoquestions(response.data.no_of_questions);
    }
  };

  const onSubmit = (event) => {

    setOpenConfirmation(true);
    // it shoud be hit an API 
  };

  // Inside NActTest component
  const handleConfirm = async () => {
    setOpenConfirmation(false); // Close the confirmation popup

    const formData = Object.entries(selectedValues).map(([key, value]) => ({
      section: key.split('_')[0],
      question: key.split('_')[1],
      answer: value,
    }));

    const body = {
      created_by: "64b25f1d8f101cbe3781e367",
      student_id: "64d65272364367021fe8ac3a",
      test_id: id,
      questions_and_answers: formData,
    };



    try {
      // Send the data to the server to save in the database
      await axios.post(`${process.env.REACT_APP_BASE_URL}sacttest`, {
        ...body,
      });

      initData(id);

      // Handle success
      toast.success("Data saved successfully!");
    } catch (error) {
      console.log("error submit > ", error);
      // console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  const handleCancel = () => {
    setOpenConfirmation(false);
  };

  const getInitialData = async () => {
    try {
      const result = await apiService().get(`getActtest?test_id=${params.id}`);
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

  useEffect(() => {
    getInitialData();
  }, []);
  return (
    <div class="col-12">
                  <ConfirmationPopup
                    open={openConfirmation}
                    title="Confirmation"
                    message="Are you sure you want to proceed?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="App">
                      {sbomData.map(sbrow => (
                        <div key={sbrow.section_title}>
                          <h1 class="section_title">{sbrow.section_title}</h1>
                          {sbrow.no_of_questions == 75 && (
                            <Table testRecords={testRecords} selectedValues={selectedValues} rows={13} columns={6} modelType={sbrow.model_type} nvalue="75" section={sbrow._id} setSelectedValues={setSelectedValues} />
                          )}
                          {sbrow.no_of_questions == 60 && (
                            <Table testRecords={testRecords} selectedValues={selectedValues} rows={10} columns={6} modelType={sbrow.model_type} nvalue="60" section={sbrow._id} setSelectedValues={setSelectedValues} />
                          )}
                          {sbrow.no_of_questions == 40 && (
                            <Table testRecords={testRecords} selectedValues={selectedValues} rows={7} columns={6} modelType={sbrow.model_type} nvalue="40" section={sbrow._id} setSelectedValues={setSelectedValues} />
                          )}
                          <hr style={{ height: '1px', border: '0px', margin: '5px 0px', borderBottom: '1px solid #000' }} />
                          <hr style={{ height: '1px', border: '0px', margin: '5px 0px', borderBottom: '1px solid #000' }} />
                        </div>
                      ))}
                      <br />
                      <br />
                      {errors && (
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          Please select an option for each question
                        </span>
                      )}
                      <br />
                      <br />

                      <button type="submit" class="btn btn-outline-success">
                        {btnText}
                      </button>
                      <br />
                      <br />
                    </div>
                  </form>
                </div>
  );


}
function Table({ testRecords, rows, columns, modelType, nvalue, section, selectedValues, setSelectedValues }) {
  const handleRadioChange = (event, section, question) => {
    const selectedValue = event.target.value;
    console.log('Radio changed:', section, question, selectedValue);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [`${section}_${question}`]: selectedValue,
    }));
   
  };

  const isChecked = (option, section, question) => {
    let question_index = Object.keys(selectedValues).findIndex(e => e === `${section}_${question}`)
      if (question_index === -1) {
        return false
      } else {
        return option.toLowerCase() === selectedValues[`${section}_${question}`].toLowerCase()
      }
    return false;
  }

  const isCorrect = (option, section, question) => {
    const { data } = testRecords;
    if (data && data?.questions_and_answers && data?.questions_and_answers.length > 0) {
      const foundIndex = data.questions_and_answers.findIndex((item) => {
        return  item.section.toLowerCase() === section.toLowerCase() && item.question.toLowerCase() === question.toString().toLowerCase();
      });
      const item = data.questions_and_answers[foundIndex]
      if (item.answer.toLowerCase() === option.toLowerCase()) {
        if(item.status  === true){
          return "correct-ans"
        }else{
          return "wrong-ans"
        }
      }else{
        if(item.ranswer.toLowerCase() === option.toLowerCase() ){
          return "correct-ans"
        }
      }
    }
  
  }

  return (
    <table style={{ width: '100%' }} id="act_tests">
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: columns }).map((_, col) => {
            const question = col * rows + row + 1;
            const isEven = question % 2 === 0;
            let options;
            if (modelType == 5) {
              options = isEven
                ? ['F', 'G', 'H', 'J', 'K']
                : ['A', 'B', 'C', 'D', 'E'];
            } else {
              options = isEven
                ? ['F', 'G', 'H', 'J']
                : ['A', 'B', 'C', 'D'];
            }
            return (
              <td key={col} style={{ width: `${100 / columns}%` }}>
                {question <= nvalue && (
                  <div>
                    <label style={{ fontSize: '14px', paddingTop: '10px', fontWeight: 'bold' }}>
                      <strong>{question}</strong>
                    </label>
                    {options.map((option) => (
                      <label key={option}>
                        <input
                          required
                          type="radio"
                          value={option}
                          name={`selectedValues_${section}_${question}`}
                          onChange={(event) => handleRadioChange(event, section, question)}
                          checked={isChecked(option, section, question)}
                          className={`${isChecked(option, section, question) ? 'selected-radio' : ''} ${isCorrect(option, section, question) }`}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
}

export default NActTest;
