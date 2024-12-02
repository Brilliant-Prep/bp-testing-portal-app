import React, { useEffect, useState } from "react";
import axios from "axios";

const LOCAL_STORAGE_QUESTION_REMAINING =
  "LOCAL_STORAGE_QUESTION_REMAINING".toLowerCase();

const getTimeRemainingByQuestionTestId = (questionTestId) => {
  try {
    return (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUESTION_REMAINING))?.[
        questionTestId
      ] || null
    );
  } catch (error) {
    return null;
  }
};

const CountdownTimer = ({
  initialTime,
  sectionType,
  moduleType,
  onTimeIsUp,
  questionTestId,
  isPauseInterval = false,
  containerStyle = {},
  styleTimer = {},
  forceUpdate = false,
}) => {
  const timeRemainingByQuestionTestId =
    getTimeRemainingByQuestionTestId(questionTestId);
  const [timeRemaining, setTimeRemaining] = useState(
    parseInt(timeRemainingByQuestionTestId) || initialTime
  );

  const getTime = async () => {
    try {
      const userid = localStorage.getItem("userid");

      console.log("userid :: ", userid);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getMyRemainingTime/${questionTestId}/${userid}?sectionType=${sectionType}&moduleType=${moduleType}`,
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        console.log("response :: ", response);
        if (response?.data?.time) setTimeRemaining(response?.data?.time);
      }
    } catch (error) {
      console.error("Error saving get time:", error);
    }
  };
  const updateTime = async (time) => {
    try {
      if (questionTestId) {
        const userid = localStorage.getItem("userid");
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}updateMyRemainingTime/${questionTestId}`,
          {
            time,
            userid,
            sectionType,
            moduleType,
          },
          {
            headers: {
              "content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          console.log("updateTime : response :: ", response);
        }
      }
    } catch (error) {
      console.error("Error saving get time:", error);
    }
  };

  useEffect(() => {
    if (forceUpdate) {
      setTimeRemaining(initialTime);
    }
    getTime();
  }, [forceUpdate, initialTime]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        if (!isPauseInterval) {
          setTimeRemaining((prevTime) => {
            const newTimer = prevTime - 1;
            const saveValue = {
              [questionTestId]: newTimer.toString(),
            };
            localStorage.setItem(
              LOCAL_STORAGE_QUESTION_REMAINING,
              JSON.stringify(saveValue)
            );
            updateTime(newTimer);
            return newTimer;
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    onTimeIsUp && onTimeIsUp();
  }, [JSON.stringify(timeRemaining), JSON?.stringify(isPauseInterval), JSON?.stringify(onTimeIsUp), JSON?.stringify(questionTestId)]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div style={containerStyle}>
      <p style={styleTimer}>{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default CountdownTimer;
