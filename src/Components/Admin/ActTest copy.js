import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

function ActTest() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (index, event, letter) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = event.target.value;
    console.log(letter);
    setSelectedValues(newSelectedValues);
  };

  const myArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  ];

  const onSubmit = async (values) => {
    try {
      alert(values);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}acttest`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (data) {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="App">
        {myArray.map((option, index) => (
          <div className="radio-btn-container">
            <div class="number">{option}</div>
            <div className="radio-btn">
              <input
                key={index}
                name={index}
                type="radio"
                value={selectedValues[index] || ""}
                onChange={(event) => handleChange(index, event, "A")}
              />
            </div>
            <div className="radio-btn">
              <input
                key={index}
                name={index}
                type="radio"
                value={selectedValues[index] || ""}
                onChange={(event) => handleChange(index, event, "B")}
              />
            </div>
            <div className="radio-btn">
              <input
                key={index}
                name={index}
                type="radio"
                value={selectedValues[index] || ""}
                onChange={(event) => handleChange(index, event, "C")}
              />
            </div>
            <div className="radio-btn">
              <input
                key={index}
                name={index}
                type="radio"
                value={selectedValues[index] || ""}
                onChange={(event) => handleChange(index, event, "D")}
              />
            </div>
          </div>
        ))}
        <br />
        <br />

        <button type="submit" style={{ backgroundColor: "green" }}>
          Submit Test
        </button>
        <br />
        <br />
      </div>
    </form>
  );
}

export default ActTest;
