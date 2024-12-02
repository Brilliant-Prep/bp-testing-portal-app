/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "./styles.css";
import he from "he"; // Import the he library
import jsPDF from "jspdf";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DesmosCalculator from "../Components/DesmosCalculator";
import Draggable from "react-draggable";
import CountdownTimer from "./CountdownTimer";
import Modal from "../Components/SatTest/Modal";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const first_name = localStorage.getItem("first_name");
const last_name = localStorage.getItem("last_name");
const userid = localStorage.getItem("userid"); 

const LOCAL_STORAGE_CURRENT_QUESTIONS_INDEX =
  "LOCAL_STORAGE_CURRENT_QUESTIONS_INDEX".toLowerCase();

function ModuleFinish({ onTimeIsUp }) {
  return <div className="container-fluid page-body-wrapper"></div>;
}

function QuestionModal({
  data,
  section,
  module,
  currentQuestionIndex,
  onQuestionSelect,
  onClose,
  goToReviewPage,
}) {
  function isAttempted(index) {
    if (
      data?.[index]?.selected_answer &&
      data?.[index]?.selected_answer !== null &&
      data?.[index]?.selected_answer !== ""
    ) {
      return "active";
    }

    return "";
  }

  return (
    <div className="question-modal">
      <div className="modal-content">
        <div className="row">
          <div style={{ float: "left", width: "90%" }}>
            <h2>
              Section {section}, Module {module}:{" "}
              {section === 1 ? " Reading & Writing" : " Math"}
            </h2>
          </div>
          <div style={{ float: "right", width: "10%" }}>
            <button onClick={onClose} className="questionclose">
              X
            </button>
          </div>
        </div>
        <hr className="dashed-border" />
        <ul className="breadcrumb">
          <li>Current</li>
          <li>Unanswered</li>
          <li>For Review</li>
        </ul>
        <hr />
        <ul id="question_list">
          {data.map((_, index) => (
            <li key={index} className={`${isAttempted(index)} question-no`}>
              <div className="bookmark-container">
                {data[index]?.bookmarked ? (
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                ) : (
                  ""
                )}
              </div>
              <div className="current-container">
                {currentQuestionIndex === index ? (
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                ) : (
                  <></>
                )}
              </div>
              <button onClick={() => onQuestionSelect(index)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        <button className="review_button" onClick={() => goToReviewPage()}>
          Go to Review Page
        </button>
      </div>
    </div>
  );
}

function ModalAnswers(props) {
  useEffect(
    () => {
      if (props.show) {
        // save answer test here
        saveAnswerTest();
      }
    },
    [props.data, props.show],
    props.test_id
  );

  const saveAnswerTest = async () => {
    console.log(props.data);
    props.setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}saveanswertest`,
        {
          test_id: props.test_id,
          module_type: props.moduleType,
          section_type: props.sectionType,
          answers: props.data,
          score: props.score,
          userid: userid,
        },
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        console.log("success save all answer for this module.");
      }
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  //#endregion timer
  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <h3>Check Your Work</h3>
        <p>
          On test day, you won't be able to move on the next module until time
          expires,
          <br />
          For these practice questions, you can click <strong>Next</strong> when
          you're ready to move on
        </p>
        <ul id="question_list" className="checkwork">
          <div className="row">
            <div className="title">
              <h6>
                <strong>
                  Section {props.sectionType}, Module {props.moduleType}:{" "}
                  {props.sectionType === 1
                    ? "Reading & Writing"
                    : "Maths Questions"}
                </strong>
              </h6>
            </div>
            <div className="breadcrub">
              <div>
                <span class="iconstyle">&nbsp;</span>
                <span class="textstyle">Unanswered</span>
              </div>
              <div>
                <span class="textstyle2">
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                </span>
                <span class="textstyle">For Review</span>
              </div>
            </div>
          </div>
          <hr />
          {props.data.map((_, index) => (
            <li
              key={index}
              className={`${props.isAttempted(index)} question-no`}
            >
              <div className="bookmark-container">
                {props.data[index]?.bookmarked ? (
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                ) : (
                  ""
                )}
              </div>
              <div className="current-container">
                {props.currentQuestionIndex === index ? (
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                ) : (
                  <></>
                )}
              </div>

              <button onClick={() => props.onQuestionSelect(index, false)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        {/* <button type="button" onClick={() => props.onContinue()}>
          Continue
        </button> */}
      </div>
    </>
  );
}
const fetchPendingQuestions = async (
  questionTestId,
  sectionType,
  moduleType
) => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }getPendingTest/${userid}/${questionTestId}${
        sectionType
          ? `?sectionType=${sectionType}&moduleType=${moduleType}`
          : ""
      }`,
      {
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data.data.data;
    }
  } catch (error) {
    console.error("Error fetching pending questions:", error);
  }
};
const getSatQuestionsByQuestionTestId = async (
  questionTestId,
  sectionType,
  moduleType
) => {
  let testData = null;
  //localStorage.removeItem("sat_questions");
  try {
    testData = await fetchPendingQuestions(
      questionTestId,
      sectionType,
      moduleType
    );
    // if (testData) {
    //   const sat_questions = {
    //     [questionTestId]: testData,
    //   };
    // }
    // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
    // } else {
    //   const currentStorage = JSON.parse(localStorage.getItem("sat_questions"));
    //   let storageData = null;
    //   if (currentStorage) {
    //     storageData = currentStorage[Object.keys(currentStorage)[0]];
    //   }

    //   if (storageData && Object.keys(storageData).length !== 0) {
    //     testData = storageData;
    //   }
    // }

    return testData || null;
  } catch (error) {
    return null;
  }
};

const timeroptions = localStorage.getItem("timeroptions"); 

// const QUESTION_SET_SIZE = 3;
let GAP_DURATION = 1 * 60 * 1000; // 10 minutes in milliseconds
let QUESTION_DURATON = (1 * 60 * 3200) / 100;
let MQUESTION_DURATON = (1 * 60 * 3500) / 100;
// const QUESTION_DURATON = 3; // 30 minutes in miliseconds
if(timeroptions=='1.5')
{
    QUESTION_DURATON = (1 * 60 * 4800) / 100;
    MQUESTION_DURATON = (1 * 60 * 5300) / 100;
}
else if(timeroptions=='2')
{
    QUESTION_DURATON = (1 * 60 * 6400) / 100;
    MQUESTION_DURATON = (1 * 60 * 7000) / 100;
}
else
{
  QUESTION_DURATON = (1 * 60 * 3200) / 100;
  MQUESTION_DURATON = (1 * 60 * 3500) / 100;
}

console.log("GAP_DURATION:", GAP_DURATION);
console.log("QUESTION_DURATION:", QUESTION_DURATON);
console.log("MQUESTION_DURATION:", MQUESTION_DURATON);

function SatQuestion() {
  const [mountTime, setMountTime] = useState(null);
  const [buttonClickTime, setButtonClickTime] = useState(null);

  const { id: questionTestId = null } = useParams();

  const [data, setData] = useState([]);
  
  const rolename = localStorage.getItem("role");
  useEffect(() => { 
 
    const preventCopyPaste = (e) => {
      e.preventDefault(); 
    };
 
    const preventSelectAll = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault(); 
      }
    };
 
     const preventContextMenu = (e) => {
      e.preventDefault(); 
    };
 
    const preventMouseSelection = (e) => {
      e.preventDefault();
    };
    
 
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);
    document.addEventListener('keydown', preventSelectAll); // Disable Ctrl+A
    document.addEventListener('contextmenu', preventContextMenu); // Disable right-click 


    if (!rolename) {      
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("userid"); 
      navigate('/');
    }
    else
    {
      checkTestRes();
    }
    
    const currentTime = new Date();
    setMountTime(currentTime);
  }, [buttonClickTime]);
  const checkTestRes = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}checkstudenttest/${userid}/${questionTestId}`
    );
    if (response.status === 200) {
      const sattestDataArray = response.data.sattestData

      console.log("sattestDataArray", sattestDataArray);

      if (sattestDataArray.length > 0) {
        const firstEntry = sattestDataArray[0];
        if(firstEntry.status==='Completed' || firstEntry.tstatus==='Start Test')
        {
          navigate('/practice_tests');
        } 
      } else {
        navigate('/practice_tests');
      }
    }
    };
  useEffect(() => {
    const currentTime = new Date();
    setMountTime(currentTime);
  }, [buttonClickTime]);

  const savePendingTest = async (sat_questions) => {
    // const currentStorage = JSON.parse(sat_questions);
    const currentQuestionObj = sat_questions[Object.keys(sat_questions)[0]];
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}savePendingTest`,
        {
          answers: currentQuestionObj.answers,
          userid: userid,
          testid: Object.keys(sat_questions)[0],
          submitted: false,
          currentSectionType: currentQuestionObj.currentSectionType,
          currentModuleType: currentQuestionObj.currentModuleType,
          sat_questions: sat_questions,
          currentQuestionIndex: currentQuestionObj.currentQuestionIndex,
        },
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        // navigate(`/practice_tests`);
        console.log("success save pending answer for this module.");
        saveAnswerTest();
      }
    } catch (error) {
      console.error("Error saving pending answers:", error);
    }
  };
  const createPendingTest = async (sat_questions) => {
    // const currentStorage = JSON.parse(sat_questions);
    const currentQuestionObj = sat_questions[Object.keys(sat_questions)[0]];
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}createNewPendingTest`,
        {
          answers: currentQuestionObj.answers,
          userid: userid,
          testid: questionTestId,
          submitted: false,
          currentSectionType:
            currentQuestionObj.currentSectionType || sectionType,
          currentModuleType: currentQuestionObj.currentModuleType || moduleType,
          sat_questions: sat_questions,
          currentQuestionIndex: currentQuestionObj.currentQuestionIndex,
        },
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("success save pending answer for this module.");
    } catch (error) {
      console.error("Error saving pending answers:", error);
    }
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showGap, setShowGap] = useState(false); // State to manage the gap display
  const [showStrike, setShowStrike] = useState(false); // State to manage the gap display
  const [currentSatQuestions, setCurrentSatQuestions] = useState({
    currentQuestionIndex: 0,
    isShowStrike: false,
    currentModuleType: 1,
    currentSectionType: 1,
  });

  const [showModalAnswer, setShowModalAnswer] = useState(false);
  const [moduleType, setModuleType] = useState(1);
  const [sectionType, setSectionType] = useState(1);
  const [loading, setLoading] = useState(true);
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const [isPauseTimer, setIsPauseTimer] = useState(false);

  const [isMDropdownOpen, setIsMDropdownOpen] = useState(false);

  const handleMoreClick = () => {
    setIsMDropdownOpen(!isMDropdownOpen);
  };

  const [correctText, setCorrectText] = useState("");
  const [selectedText, setSelectedText] = useState();
  const [note, setNote] = useState("");
  const [color, setColor] = useState("yellow");
  const [showAnnotationBox, setShowAnnotationBox] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [annotations, setAnnotations] = useState([
    {
      color: "yellow",
      id: "IukaQ",
      text: "ure if the bones belonged to juveniles or adults.",
    },
  ]);
  const [highlightedOptions, setHighlightedOptions] = useState([]);
  const [isStrikedOut, setIsStrikedOut] = useState(false);
  const [answertext, setAnswertext] = useState("");
  const [isBreakTime, setIsBreakTime] = useState(false);
  const loadingTimer = setTimeout(() => setLoading(false), 3000);
  const [desmosLoaded, setDesmosLoaded] = useState(false);
  const [validTextBox, setValidTextBox] = useState(true);

  // Handle input field changes
  const handleAnswertextChange = (e) => {
    const text = e.target.value;
    if (text && !text.match("[A-Za-z]+")) {
      setAnswertext(e.target.value);
      setValidTextBox(true);
    } else if (text) {
      setValidTextBox(false);
      if (text.length && (!answertext || answertext?.length === 0)) {
        setAnswertext("");
      }
    }
    if (!text) {
      setAnswertext(e.target.value);
    }
  };
  const [columnWidths, setColumnWidths] = useState({
    column1: "50%",
    column2: "50%",
  });

  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [isReferenceVisible, setIsReferenceVisible] = useState(false);

  useEffect(() => {
    // Simulate asynchronous loading of DesmosCalculator
    const loadDesmosCalculator = async () => {
      // Perform any asynchronous operations to load DesmosCalculator
      // For example, you might have an API call or other asynchronous logic

      // Simulate a delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Once the DesmosCalculator is loaded, set the DesmosLoaded state to true
      setDesmosLoaded(true);
    };

    loadDesmosCalculator();
  }, []);

  const calculatorHandler = () => {
    if (desmosLoaded) {
      setIsCalculatorVisible(true);
    }
  };

  const calculatorclosePopup = () => {
    // Close the popup when needed
    setIsCalculatorVisible(false);
  };

  const referenceHandler = () => {
    // When the "Calculator" button is clicked, show the popup
    setIsReferenceVisible(true);
    setIsMDropdownOpen(false);
  };

  const refernceclosePopup = () => {
    // Close the popup when needed
    setIsReferenceVisible(false);
  };

  useEffect(() => {
    const getData = async () => {
      const questionData = await getSatQuestionsByQuestionTestId(
        questionTestId
      );
      if (questionData) {
        setCurrentQuestionIndex(questionData.currentQuestionIndex || 0);
        setShowStrike(questionData.isShowStrike || false);

        if (
          (questionData.currentSectionType > sectionType ||
            questionData.currentModuleType > moduleType) &&
          questionData.answers
        ) {
          setCurrentSatQuestions(questionData);
          setModuleType(questionData?.currentModuleType || 1);
          setSectionType(questionData?.currentSectionType || 1);
        }
      }
    };

    getData();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     LOCAL_STORAGE_CURRENT_QUESTIONS_INDEX,
  //     JSON.stringify({ [questionTestId]: currentQuestionIndex })
  //   );
  // }, [currentQuestionIndex, questionTestId]);

  // const sentence = "asd qwe zxc rty fgh 123";
  // const wordToHighlight = "123";
  // const highlightColor = "yellow";

  // const highlightWords = (sentence, wordToHighlight, highlightColor) => {
  //   const words = sentence.split(" ");
  //   const highlightedWords = words.map((word) =>
  //     word === wordToHighlight ? (
  //       <span style={{ backgroundColor: highlightColor }}>{word}</span>
  //     ) : (
  //       word
  //     )
  //   );
  //   return highlightedWords;
  // };

  // const modifiedContent = highlightWords(
  //   sentence,
  //   wordToHighlight,
  //   highlightColor
  // );
  useEffect(() => {
    (async () => {
      const currentQuestion = data?.[currentQuestionIndex];
      //console.log(annotations);

      setSelectedAnswer(currentQuestion?.selected_answer);
      setAnswertext(currentQuestion?.selected_answer);
    })();
  }, [currentQuestionIndex, data]);

  // useEffect(() => {
  //   (async () => {
  //     const questionData = await getSatQuestionsByQuestionTestId(questionTestId, sectionType, moduleType); //Send section and module

  //     if(questionData && questionData.answers?.length) {
  //       setData(questionData.answers);
  //     } else {
  //       await getQuestions(questionTestId, moduleType, sectionType);
  //     }
  //   })();
  // }, [moduleType, sectionType]);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const questionData = await getSatQuestionsByQuestionTestId(
        questionTestId,
        sectionType,
        moduleType
      ); // Send section and module

      if (questionData && questionData.answers?.length) {
        setData(questionData.answers);
      } else {
        setLoading(true);
        setData([]);
        await getQuestions(questionTestId, moduleType, sectionType);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [moduleType, sectionType, questionTestId]); // Ensure questionTestId is also a dependency if it's used

  // useEffect(() => {
  //   // {
  //   //   bottom: 347,
  //   //   height: 16,
  //   //   left: 1058.0859375,
  //   //   right: 1196.640625,
  //   //   top: 331;
  //   //   width: 138.5546875,
  //   //   x: 1058.0859375,
  //   //   y: 331,
  //   // test.getAttribute("style", "color:green");
  //   // test.textContent = toDOM(currentSatQuestions?.parentEl)
  // }, [currentSatQuestions?.range]);

  const handleOptionClick = (answerIndex) => {
    // console.log('answerIndex',answerIndex)
    console.log("calll");

    rhandleStrikeout(answerIndex);
    setSelectedAnswer(answerIndex);

    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    if (currentQuestion.correct_answer === answerIndex) {
      setScore(score + 1); // Increase score if the answer is correct
    } else {
      // You may want to handle incorrect answers here if needed
    }

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      selected_answer: answerIndex,
    });

    setData(currentData);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    if (currentQuestion.correct_answer === answerIndex) {
      setScore(score + 1); // Increase score if the answer is correct
    } else {
      // You may want to handle incorrect answers here if needed
    }

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      selected_answer: answerIndex,
    });

    setData(currentData);
  };

  const resetSelectedAnswers = () => {
    const updatedData = data.map((question) => ({
      ...question,
      selected_answer: null,
    }));
    setData(updatedData);
  };

  const toggleBookMark = () => {
    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      bookmarked: !currentQuestion.bookmarked,
    });

    setData(currentData);

    const updatedData = data.map((question) => ({
      ...question,
      currentQuestion,
    }));
    setData(updatedData);

    const sat_questions = {
      [questionTestId]: {
        ...currentSatQuestions,
        answers: updatedData,
      },
    };

    // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
    savePendingTest(sat_questions);
  };

  const toggleStrike = () => {
    setShowStrike(!showStrike);

    const sat_questions = {
      [questionTestId]: {
        ...currentSatQuestions,
        isShowStrike: !showStrike,
      },
    };

    localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
  };

  const handleNextQuestion = () => {
    setValidTextBox(true);
    // Update selected answer for the current question
    const currentTime = new Date();
    setButtonClickTime(currentTime);

    const currentData = [...data];

    const isInput =
      currentQuestion?.question_type === "Math" &&
      currentQuestion.isgridIn.toLowerCase() === "true";
    Object.assign(currentData[currentQuestionIndex], {
      ...currentData?.[currentQuestionIndex],
      selected_answer: isInput ? answertext : selectedAnswer,
    });
    if (mountTime) {
      const difference = (currentTime - mountTime) / 1000;
      Object.assign(currentData[currentQuestionIndex], {
        ...currentData?.[currentQuestionIndex],
        duration: difference,
      });
    }
    setData(currentData);
    if (showModalAnswer && currentQuestionIndex === data?.length - 1) {
      handleContinue();
    } else if (currentQuestionIndex === data?.length - 1) {
      setShowModalAnswer(true);
    } else {
      setAnswertext("");
      setSelectedAnswer(
        data?.[currentQuestionIndex + 1]?.selected_answer || null
      );
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const sat_questions = {
      [questionTestId]: {
        currentSectionType: sectionType,
        currentModuleType: moduleType,
        answers: currentData,
        currentQuestionIndex:
          currentQuestionIndex === data?.length - 1
            ? currentQuestionIndex
            : currentQuestionIndex + 1,
      },
    };

    // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
    savePendingTest(sat_questions);
  };

  const handlePrevQuestion = () => {
    setValidTextBox(true);
    if (showModalAnswer) {
      setShowModalAnswer(false);
      return;
    }
    const isInput =
      currentQuestion?.question_type === "Math" &&
      currentQuestion.isgridIn.toLowerCase() === "true";
    // Update selected answer for the current question
    const currentData = [...data];
    Object.assign(currentData[currentQuestionIndex], {
      ...currentData[currentQuestionIndex],
      selected_answer: isInput ? answertext : selectedAnswer,
    });
    setData(currentData);
    const newQuestionIndex = currentQuestionIndex - 1;

    setSelectedAnswer(data[newQuestionIndex].selected_answer || null);
    setAnswertext(data[newQuestionIndex].selected_answer || "");
    setCurrentQuestionIndex(newQuestionIndex);

    const sat_questions = {
      [questionTestId]: {
        currentSectionType: sectionType,
        currentModuleType: moduleType,
        answers: currentData,
        currentQuestionIndex: newQuestionIndex,
      },
    };

    //localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
    savePendingTest(sat_questions);
  };

  const [online, setOnline] = useState(navigator.onLine); 

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      if (isPauseTimer) {
        setIsPauseTimer(false); // Resume timer or any other paused functionality
      }
    };

    const handleOffline = () => {
      setOnline(false);
      alert('You are offline. Please check your internet connection.');
      setIsPauseTimer(true); // Pause timer or any functionality that requires internet
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isPauseTimer]); // Include isPauseTimer in dependencies to handle its changes


  const [showModal, setShowModal] = useState(false);

  const [showDirections, setShowDirections] = useState(true);

  const [selectedTestId, setSelectedTestId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportResponse, setReportResponse] = useState(null);
  const navigate = useNavigate();
  // ... Other functions and code ...

  /*const getReport = async (userid, questionTestId) => {
    navigate(`/sat/testresults/${questionTestId}`);
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}send-actreport`,
        {
          params: {
            userid,
            questionTestId,
          },
        }
      );
      if (response.status === 200) {  

        // Display readingCount as a string
        alert("Reading & Writing Count: " + response.data.readingCount);

        // Display mathCount as a number
        alert("Math Count: " + response.data.mathCount);

      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching questions:", error);
    }
  };*/

  const getReport = async (userid, questionTestId) => {
    navigate(`/sat/testresults/${questionTestId}`);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}saveCompletedTest`,
        {
          test_id: questionTestId,
          submitted: true,
          userid: userid,
        },
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        console.log("success save all answer for this module.");
      }
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  const openReportModal = () => {
    getReport(userid, questionTestId);
    setSelectedTestId();
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setSelectedTestId(null);
    setIsReportModalOpen(false);
  };

  const handleQuestionSelect = (questionIndex, flag = true) => {
    setCurrentQuestionIndex(questionIndex);
    setShowModalAnswer(false);
    setShowModal(false); // Close the modal
    
    // same ans
    
    const currentTime = new Date();
    setButtonClickTime(currentTime);

    const currentData = [...data];

    const isInput =
      currentQuestion?.question_type === "Math" &&
      currentQuestion.isgridIn.toLowerCase() === "true";
    Object.assign(currentData[currentQuestionIndex], {
      ...currentData?.[currentQuestionIndex],
      selected_answer: isInput ? answertext : selectedAnswer,
    });
    if (mountTime) {
      const difference = (currentTime - mountTime) / 1000;
      Object.assign(currentData[currentQuestionIndex], {
        ...currentData?.[currentQuestionIndex],
        duration: difference,
      });
    }
    setData(currentData);
    // if (showModalAnswer && currentQuestionIndex === data?.length - 1) {
    //   handleContinue();
    // } else 
    if (currentQuestionIndex === data?.length - 1 && flag) {
      setShowModalAnswer(true);
    } else {
      setAnswertext("");
      setSelectedAnswer(
        data?.[currentQuestionIndex + 1]?.selected_answer || null
      );
      // setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const sat_questions = {
      [questionTestId]: {
        currentSectionType: sectionType,
        currentModuleType: moduleType,
        answers: currentData,
        currentQuestionIndex:
          currentQuestionIndex === data?.length - 1
            ? currentQuestionIndex
            : currentQuestionIndex + 1,
      },
    };
    // setAnswertext("");
    // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
    savePendingTest(sat_questions);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal); // Toggle the value of showModal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const mathExpression = "This is an example of inline math: $53/deg$";

  const goToReviewPage = () => {
    setShowModalAnswer(true);
    setCurrentQuestionIndex(data.length - 1);
  };

  const getQuestions = async (
    test_id = questionTestId,
    module_type = moduleType,
    section_type = sectionType
  ) => {
    try {
      clearTimeout(loadingTimer);
      setLoading(true);
      setData([]);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}getallquestions`, {
          params: {
            test_id,
            module_type,
            section_type,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const questions = response?.data || [];
            if (currentSatQuestions?.answers?.length) {
              const newQuestions = questions?.map((q) => {
                const question = currentSatQuestions?.answers?.find(
                  (curr) => curr?._id === q?._id
                );
                return {
                  ...q,
                  selected_answer: question?.selected_answer || "",
                  bookmarked: question?.bookmarked || false,
                  strikeoptions: question?.strikeoptions || [],
                };
              });
              setData(newQuestions);
              createPendingTest(newQuestions);
            } else {
              setData(questions);
              createPendingTest(questions);
            }
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching questions:", error);
    }
  };

  if (loading) {
    return (
      <div className="loader-center">
        <div className="loader"></div>
      </div>
    );
    // return <span className="loader"></span>;
  }
  <i></i>;
  const saveAnswerTest = async () => {
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}saveanswertest`,
        {
          test_id: questionTestId,
          module_type: moduleType,
          section_type: sectionType,
          answers: data,
          score: score,
          userid: userid,
        },
        {
          headers: {
            "content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        console.log("success save all answer for this module.");
      }
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };
  const currentQuestion = data[currentQuestionIndex];
  if (!loading && data.length === 0) {
    return (
      <ModuleFinish
        onTimeIsUp={() => {
          console.log("redirect to another page");
        }}
      />
    );
  }
  const handleDownloadPDF = (questionsData) => {
    const pdf = new jsPDF();

    let yPos = 20; // Initial y-position

    // Iterate through the questions and answers and add them to the PDF
    questionsData.forEach((question, index) => {
      // Add question text
      pdf.text(`Question ${index + 1}: ${question.question_text}`, 20, yPos);
      yPos += 10; // Increase y-position for next line

      // Add user's answer
      const answerText = question.isAnswered
        ? `Your Answer: ${question.choice_a}`
        : "Not answered";
      pdf.text(answerText, 20, yPos);
      yPos += 10; // Increase y-position for next line

      // Add a separator
      pdf.text("---------------------------------------------", 20, yPos);
      yPos += 10; // Increase y-position for next question
    });

    // Save the PDF and trigger download
    pdf.save("SAT_Questions_Answers.pdf");
  };

  const handleExit = () => {
    // savePendingTest();
    navigate(`/practice_tests`);
  };
  const refetchQuestions = async () => {
    setLoading(true);
    setData([]);
    if (moduleType === 1 && sectionType === 1) {
      setModuleType(moduleType + 1);
    } else if (moduleType === 2 && sectionType === 1) {
      setModuleType(moduleType - 1);
      setSectionType(sectionType + 1);
    } else {
      setModuleType(2);
    }
    setShowGap(false);
    setShowModalAnswer(false);
    setCurrentQuestionIndex(0);
    setIsBreakTime(false);

    // Accumulate current module's data for PDF generation
    setAccumulatedData((prevData) => [...prevData, ...data]);
  };

  const onBreakTime = async () => {
    if (moduleType === 2 && sectionType === 1) {
      setIsBreakTime(true);
    } else {
      refetchQuestions();
    }
  };

  const handleContinue = () => {
    setShowModalAnswer(false);
    if (moduleType === 2 && sectionType === 2) {
      setAccumulatedData((prevData) => [...prevData, ...data]);
      //handleDownloadPDF(accumulatedData);
      openReportModal();
    }
    setShowGap(true);
    setShowModalAnswer(false);
    resetSelectedAnswers();
  };
  const handleCancel = () => {
    setShowModalAnswer(false);
  };

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
      chtml: {
        minScale: 1.22,
      },
      options: {
        processHtml: true, // Enable processing of HTML tags
      },
    },
  };

  const handleStrikeout = (choiceKey) => {
    console.log("sdfdsf");
    setIsStrikedOut(!isStrikedOut);
    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    let strikeoptions = [...(currentQuestion.strikeoptions ?? [])];

    if (strikeoptions.indexOf(choiceKey) == -1) {
      strikeoptions.push(choiceKey);
    } else {
      strikeoptions.splice(strikeoptions.indexOf(choiceKey), 1);
    }

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      strikeoptions: strikeoptions,
    });
    const element = document.querySelector(`#${choiceKey}`);
    if (element) {
      element.classList.remove("highlighted");
    }

    setData(currentData);
  };
  const rhandleStrikeout = (choiceKey) => {
    // Set isStrikedOut to false
    setIsStrikedOut(false);

    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    let strikeoptions = [...(currentQuestion.strikeoptions ?? [])];

    strikeoptions = strikeoptions.filter((option) => option !== choiceKey);

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      strikeoptions: strikeoptions,
    });

    const element = document.querySelector(`#${choiceKey}`);
    if (element) {
      element.classList.remove("highlighted");
    }
    // Update the state or any other necessary logic based on the updated data
    setData(currentData);
  };
  const annotateHandler = () => {
    if (!window.getSelection) return null;
    var parentEl = null;
    const selection = window.getSelection();
    const id = uuid();

    if (selection?.toString()) {
      setAnnotations([
        ...annotations,
        { id, text: selection.toString(), color },
      ]);
      setSelectedText(selection.toString());

      setShowAnnotationBox(true);

      const span = document.createElement("span");

      span.style.backgroundColor = color;
      span.style.textDecoration = textUnderline ? "underline" : "";
      span.className = "highlighted-text";
      // span.id = "text";
      span.id = id;
      span.textContent = selection.toString();

      selection.getRangeAt(0).surroundContents(span);

      if (selection.rangeCount) {
        parentEl = selection.getRangeAt(0).commonAncestorContainer;
        if (parentEl?.nodeType !== 1) {
          parentEl = parentEl.parentNode;
        }
      }

      const sat_questions = {
        [questionTestId]: {
          ...currentSatQuestions,
          parentEl: domToJson(parentEl),
        },
      };

      // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
      savePendingTest(sat_questions);
    }
    selection?.removeAllRanges();
  };
  function jsonToDom(json, parentElement) {
    const element = document.createElement(json.tagName || "span");

    // Set attributes
    for (const key in json.attributes) {
      element.setAttribute(key, json.attributes[key]);
    }

    // Add text content if present
    if (json.textContent) {
      element.textContent = json.textContent;
    }

    // Check if json.children is iterable
    if (json.children && Array.isArray(json.children)) {
      // Recursively process children
      for (const childJson of json.children) {
        const childElement = jsonToDom(childJson);
        element.appendChild(childElement);
      }
    }

    // Append the created element to the parent (or the document body if no parent is provided)
    if (parentElement) {
      parentElement.appendChild(element);
    } else {
      document.body.appendChild(element);
    }

    return element;
  }

  function domToJson(element) {
    const result = {
      tagName: element.tagName,
      attributes: {},
      children: [],
    };

    // Add attributes
    for (const { name, value } of element.attributes) {
      result.attributes[name] = value;
    }

    // Recursively process child nodes
    for (const childNode of element.childNodes) {
      if (childNode.nodeType === Node.ELEMENT_NODE) {
        result.children.push(domToJson(childNode));
      } else if (childNode.nodeType === Node.TEXT_NODE) {
        // Include text content of the node
        result.children.push({
          textContent: childNode.textContent,
        });
      }
      // You can add more conditions for other node types if needed
    }

    return result;
  }
  function isAttempted(index) {
    if (
      data?.[index]?.selected_answer &&
      data?.[index]?.selected_answer !== null &&
      data?.[index]?.selected_answer !== ""
    ) {
      return "active";
    }

    return "";
  }

  const annotationSaveHandler = () => {
    console.log("annotations:", annotations);
    console.log("color, note ", color, note);

    const id = annotations[annotations.length - 1].id;
    const text = annotations[annotations.length - 1].text;
    console.log("id, text", id, text);

    if (selectedText) {
      const span = document.getElementById(id);
      console.log("span", span);

      span?.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("span");
        tooltip.className = "highlighted-tooltip";
        tooltip.textContent = note;
        span.appendChild(tooltip);
      });

      span?.addEventListener("mouseleave", () => {
        const tooltip = span.querySelector(".highlighted-tooltip");
        if (tooltip) {
          span.removeChild(tooltip);
        }
      });

      // update currentQuestion
      const html = document.getElementById(currentQuestion._id).innerHTML;
      currentQuestion.passage = html;

      setNote("");
    }

    setShowAnnotationBox(false);
  };

  const uuid = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUUID = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUUID += characters.charAt(randomIndex);
    }
    return shortUUID;
  };

  const formatSelection = (inputString) => {
    const words = inputString.split(" ");

    if (words.length <= 10) {
      return inputString;
    } else {
      const firstFiveWords = words.slice(0, 5).join(" ");
      const lastFiveWords = words.slice(-5).join(" ");
      return `"${firstFiveWords} ... ${lastFiveWords}"`;
    }
  };

  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };
  const handleResume = () => {
    setIsBreakTime(false);
    setLoading(true);
    refetchQuestions();
    // Update selected answer for the current question
    // const currentData = [...data];
    // Object.assign(currentData[currentQuestionIndex], {
    //   ...currentData?.[currentQuestionIndex],
    //   selected_answer: selectedAnswer,
    // });
    // setData(currentData);
    // if (showModalAnswer && currentQuestionIndex === data?.length - 1) {
    //   handleContinue();
    // } else if (currentQuestionIndex === data?.length - 1) {
    //   setShowModalAnswer(true);
    // } else {
    //   setAnswertext("");
    //   setSelectedAnswer(
    //     data?.[currentQuestionIndex + 1]?.selected_answer || null
    //   );
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // }

    // const sat_questions = {
    //   [questionTestId]: {
    //     currentSectionType: sectionType,
    //     currentModuleType: moduleType,
    //     answers: currentData,
    //     currentQuestionIndex:
    //       currentQuestionIndex === data?.length - 1
    //         ? currentQuestionIndex
    //         : currentQuestionIndex + 1,
    //   },
    // };

    // localStorage.setItem("sat_questions", JSON.stringify(sat_questions));
  };
  const toggleColumnWidth = (column) => {
    setColumnWidths((prevWidths) => {
      const isExpanded = prevWidths[column] === "70%";

      const updatedWidths = {
        ...prevWidths,
      };

      if (isExpanded) {
        updatedWidths[column] = "50%";
        // When collapsing, set the other column to '50%' as well
        const otherColumn = column === "column1" ? "column2" : "column1";
        updatedWidths[otherColumn] = "50%";
      } else {
        updatedWidths[column] = "70%";
        // When expanding, set the other column to '30%'
        const otherColumn = column === "column1" ? "column2" : "column1";
        updatedWidths[otherColumn] = "30%";
      }

      return updatedWidths;
    });
  };

  // const CountDownMemo = useMemo(
  //   () => (
  //     <CountdownTimer
  //       initialTime={sectionType === 1 ? QUESTION_DURATON : MQUESTION_DURATON}
  //       sectionType={sectionType}
  //       moduleType={moduleType}
  //       onTimeIsUp={() => {
  //         setShowModalAnswer(true);
  //       }}
  //       questionTestId={questionTestId}
  //       isPauseInterval={isPauseTimer}
  //     />
  //   ),
  //   [sectionType, moduleType, questionTestId, isPauseTimer]
  // );

  return (
    <> 
      <div
        className="container-fluid page-body-wrapper"
        style={{ padding: "0px" }}
      >
        <div className="main-panel">
          <div>
            <div
              className={
                "card " + (showGap && !isBreakTime ? "class1" : "class2")
              }
            >
              <div className="card-body" style={{ padding: "0px" }}>
                <div
                  className={"container-fluid " + (showGap ? "cclass1" : "")}
                >
                  {isBreakTime ? (
                    <div className="showgap">
                      <div className="col-12">
                        <div className="col-6 h-100 flex flex-col justify-center align-items-center">
                          <CountdownTimer
                            initialTime={GAP_DURATION / 100}
                            containerStyle={{}}
                            styleTimer={{ fontSize: 60 }}
                            sectionType={sectionType}
                            moduleType={moduleType}
                            onTimeIsUp={handleResume}
                          />
                          <button
                            className="directionClose"
                            onClick={handleResume}
                          >
                            Resume Test
                          </button>
                        </div>
                        <div className="col-6 text-left max-w-md">
                          <h1>Practice Test Break</h1>
                          <p>
                            You can resume this practice test as soon as you're
                            ready to move on. On test day, you'll wait until the
                            clock counts down. Read below to see how breaks work
                            on test day.
                          </p>
                          <hr className="divide-dashed" />

                          <h1>Practice Test Break</h1>
                          <span>
                            You may leave the room, but do not disturb students
                            who are still testing.
                          </span>
                          <br />
                          <br />
                          <span>Testing these rules during the break</span>
                          <br />
                          <br />
                          <span>
                            1. Do not access your phone, smartwatch, textbooks,
                            notes, or the internet.
                          </span>
                          <br />
                          <br />
                          <span>2. Do not eat or drink in the test room.</span>
                          <br />
                          <br />
                          <span>
                            3. Do not speak in the test room, outside the test
                            room, do not discuss the exam with anyone.
                          </span>
                          <br />
                        </div>
                      </div>
                    </div>
                  ) : showGap ? (
                    <div className="showgap">
                      <h4>This Module Is Over</h4>
                      <p>
                        All your work has been saved.
                        <br />
                        You'll move on automatically in just a movement.
                        <br />
                        Do not refresh this page or exit the app.
                      </p>
                      <img
                        src="https://i.gifer.com/ZKZg.gif"
                        border="0"
                        style={{ height: "50px" }}
                      />

                      <CountdownTimer
                        initialTime={60000 / 10000}
                        onTimeIsUp={onBreakTime}
                        sectionType={sectionType}
                        moduleType={moduleType}
                        forceUpdate
                        // questionTestId={questionTestId}
                        // isPauseInterval={isPauseTimer}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-12">
                          <div className="row fixed-header">
                            <div
                              className="col-12"
                              style={{ padding: "0px 20px" }}
                            >
                              <div className="col-4">
                                Section {sectionType}, Module {moduleType} :
                                {sectionType === 1
                                  ? " Reading & Writing"
                                  : " Math"}
                                <br />
                                <button onClick={toggleDirections}>
                                  {showDirections ? (
                                    // Display an arrow that points upwards when the popup is open
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        paddingTop: "10px",
                                        display: "block",
                                      }}
                                    >
                                      Directions{" "}
                                      <i className="fa fa-angle-up"></i>
                                    </span>
                                  ) : (
                                    // Display an arrow that points downwards when the popup is closed
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        paddingTop: "10px",
                                        display: "block",
                                      }}
                                    >
                                      Directions{" "}
                                      <i className="fa fa-angle-down"></i>
                                    </span>
                                  )}
                                </button>
                              </div>
                              <div
                                className="col-4"
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <div
                                  style={{
                                    height: "30px",
                                  }}
                                >
                                  {isTimerVisible ? (
                                    <CountdownTimer
                                      initialTime={
                                        sectionType === 1
                                          ? QUESTION_DURATON
                                          : MQUESTION_DURATON
                                      }
                                      sectionType={sectionType}
                                      moduleType={moduleType}
                                      onTimeIsUp={() => {
                                        saveAnswerTest();
                                        handleContinue();
                                      }}
                                      questionTestId={questionTestId}
                                      isPauseInterval={isPauseTimer}
                                    />
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          display: "none",
                                        }}
                                      >
                                        <CountdownTimer
                                          initialTime={
                                            sectionType === 1
                                              ? QUESTION_DURATON
                                              : MQUESTION_DURATON
                                          }
                                          sectionType={sectionType}
                                          moduleType={moduleType}
                                          onTimeIsUp={() => {
                                            setShowModalAnswer(true);
                                          }}
                                          questionTestId={questionTestId}
                                          isPauseInterval={isPauseTimer}
                                        />
                                        {/* {CountDownMemo} */}
                                      </div>
                                      <i
                                        className="fa fa-clock-o"
                                        style={{
                                          fontSize: "20px",
                                        }}
                                      ></i>
                                    </>
                                  )}
                                </div>
                                <button
                                  className="timetoggles"
                                  onClick={() =>
                                    setIsTimerVisible(!isTimerVisible)
                                  }
                                >
                                  {isTimerVisible ? "Hide" : "Show"}
                                </button>
                                {/* Pause timer */}
                              </div>
                              <div
                                className="col-4"
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                {sectionType === 1 ? (
                                  <div>
                                    <button
                                      onClick={annotateHandler}
                                      className="tooltip-container"
                                    >
                                      <i className="fa fa-pencil"></i>
                                      <br />
                                      <span style={{ fontSize: "12px" }}>
                                        Annotate
                                      </span>
                                      <div className="tooltip-text">
                                        MAKE A SELECTION FIRST
                                        <br />
                                        Select some text, then
                                        <br />
                                        press annotate.
                                      </div>
                                    </button>
                                    <button
                                      className=""
                                      style={{
                                        marginLeft: "20px",
                                      }}
                                      onClick={handleMoreClick}
                                    >
                                      <i className="fa fa-ellipsis-v"></i>
                                      <br />
                                      <span style={{ fontSize: "12px" }}>
                                        More
                                      </span>
                                    </button>
                                    {isMDropdownOpen && (
                                      <div className="dropdown-content">
                                        <button
                                          onClick={() =>
                                            setIsPauseTimer(!isPauseTimer)
                                          }
                                        >
                                          <i
                                            className={
                                              isPauseTimer
                                                ? "fa fa-play"
                                                : "fa fa-pause"
                                            }
                                          ></i>{" "}
                                          {!isPauseTimer ? "Pause" : "Play"}
                                        </button>
                                        <br />
                                        <button onClick={handleExit}>
                                          <i className="fa fa-times"></i> Exit
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      onClick={calculatorHandler}
                                      className=""
                                    >
                                      <i className="fa fa-calculator"></i>
                                      <br />
                                      <span style={{ fontSize: "12px" }}>
                                        Calculator
                                      </span>
                                    </button>
                                    <button
                                      onClick={referenceHandler}
                                      className=""
                                      style={{
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <i className="fa fa-ellipsis-v"></i>
                                      <br />
                                      <span style={{ fontSize: "12px" }}>
                                        Reference
                                      </span>
                                    </button>
                                    <button
                                      className=""
                                      style={{
                                        marginLeft: "20px",
                                      }}
                                      onClick={handleMoreClick}
                                    >
                                      <i className="fa fa-ellipsis-v"></i>
                                      <br />
                                      <span style={{ fontSize: "12px" }}>
                                        More
                                      </span>
                                    </button>
                                    {isReferenceVisible && (
                                      <div
                                        className="backgroundFade"
                                        id="backgroundFade"
                                      >
                                        <div className="refernceContainer">
                                          <div className="row">
                                            <div
                                              className="column"
                                              style={{ textAlign: "left" }}
                                            >
                                              Reference
                                            </div>
                                            <div className="column"></div>
                                            <div
                                              className="column"
                                              style={{ textAlign: "right" }}
                                            >
                                              <a onClick={refernceclosePopup}>
                                                <i className="fa fa-close"></i>
                                              </a>
                                            </div>
                                          </div>
                                          <div id="refernceContent">
                                            <div style={{ height: "320px" }}>
                                              <div>
                                                <img
                                                  src="/images/refernce.png"
                                                  border="0"
                                                />
                                              </div>
                                              <p>
                                                The number of degrees of arc in
                                                a circle in 360.
                                                <br />
                                                The number of radians of arc in
                                                a circle is &Pi;.
                                                <br />
                                                The sum of the measuares in
                                                degrees of the angles of a
                                                triangle is 180.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {isMDropdownOpen && (
                                      <div className="dropdown-content">
                                        <button
                                          onClick={() => {
                                            setIsPauseTimer(!isPauseTimer);
                                          }}
                                        >
                                          <i
                                            className={
                                              isPauseTimer
                                                ? "fa fa-play"
                                                : "fa fa-pause"
                                            }
                                          ></i>{" "}
                                          {!isPauseTimer ? "Pause" : "Play"}
                                        </button>
                                        <br />
                                        <button onClick={handleExit}>
                                          <i className="fa fa-times"></i> Exit
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {isCalculatorVisible && (
                                <Draggable>
                                  <div>
                                    <div
                                      className="calculatorContainer"
                                      style={{ left: "0px" }}
                                    >
                                      <div className="row">
                                        <div
                                          className="column"
                                          style={{ textAlign: "left" }}
                                        >
                                          Calculator
                                        </div>
                                        <div className="column"></div>
                                        <div
                                          className="column"
                                          style={{ textAlign: "right" }}
                                        >
                                          <a onClick={calculatorclosePopup}>
                                            <i className="fa fa-close"></i>
                                          </a>
                                        </div>
                                      </div>
                                      <div id="calculatorContent">
                                        <div style={{ height: "520px" }}>
                                          <DesmosCalculator />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Draggable>
                              )}
                            </div>
                            <hr className="dashed-border" />
                          </div>
                          {!showModalAnswer ? (
                            <div
                              className={`botoms row ${
                                isPauseTimer ? "disabled" : ""
                              }`}
                              style={{
                                minHeight: "100vh",
                                marginTop: "100px", 
                              }}
                            >
                              <div
                                className="col-12"
                                style={{ padding: "0px 20px" }}
                              >
                                {sectionType === 2 &&
                                currentQuestion?.figurestatus ===
                                  "false" ? null : (
                                  <div
                                    className="col-6 column"
                                    style={{
                                      borderRight: "2px solid #666",
                                      height: "500px",
                                      overflow: "auto",
                                      paddingRight: "20px",
                                      width: columnWidths.column1,
                                      display:
                                        sectionType == 2 &&
                                        currentQuestion?.figure === "false"
                                          ? "none"
                                          : "block",
                                    }}
                                  >
                                    <button
                                      className="column1_max"
                                      onClick={() =>
                                        toggleColumnWidth("column1")
                                      }
                                    >
                                      <img
                                        src="/images/lefticon.png"
                                        border="0"
                                      />
                                    </button>
                                    <div style={{ marginRight: "20px" }}>
                                      {currentQuestion?.context !== "" && (
                                        <div
                                          className="passage_test"
                                          style={{
                                            paddingBottom: "20px",
                                            paddingRight: "20px",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: he.decode(
                                              currentQuestion?.context?.replace(
                                                "�",
                                                "&eacute;"
                                              )
                                            ),
                                          }}
                                        />
                                      )}
                                      {currentQuestion?.figure !== "" && (
                                        <div
                                          style={{
                                            marginBottom: "10px",
                                            textAlign: "center",
                                          }}
                                        >
                                          <img
                                            src={currentQuestion?.figure}
                                            alt="Question Figure"
                                          />
                                        </div>
                                      )}
                                      <div
                                        className="passage_test"
                                        style={{
                                          paddingBottom: "20px",
                                          paddingRight: "20px",
                                        }}
                                        id={currentQuestion._id}
                                        dangerouslySetInnerHTML={{
                                          __html: he.decode(
                                            currentQuestion?.passage?.replace(
                                              "�",
                                              "&eacute;"
                                            )
                                          ),
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                                <div
                                  className="col-6 column"
                                  style={{
                                    paddingLeft: "20px",
                                    width: columnWidths.column2,
                                    margin:
                                      sectionType === 2 &&
                                      currentQuestion?.figurestatus === "false"
                                        ? "0px auto"
                                        : "",
                                    float:
                                      sectionType === 2 &&
                                      currentQuestion?.figurestatus === "false"
                                        ? "none"
                                        : "left",
                                  }}
                                >
                                  {sectionType === 2 &&
                                  currentQuestion?.figurestatus ===
                                    "false" ? null : (
                                    <button
                                      className="column2_max"
                                      onClick={() =>
                                        toggleColumnWidth("column2")
                                      }
                                    >
                                      <img
                                        src="/images/righticon.png"
                                        border="0"
                                      />
                                    </button>
                                  )}
                                  <div
                                    className="row question_header"
                                    style={{ marginLeft: "3px" }}
                                  >
                                    <div className="question_no">
                                      {currentQuestionIndex + 1}{" "}
                                    </div>
                                    <div
                                      style={{ float: "left", width: "85%" }}
                                    >
                                      <div
                                        style={{
                                          float: "left",
                                          marginRight: "10px",
                                        }}
                                        onClick={toggleBookMark}
                                      >
                                        <div
                                          className={
                                            currentQuestion?.bookmarked
                                              ? "bookmarked-class"
                                              : "not-bookmarked-class"
                                          }
                                        >
                                          {currentQuestion?.bookmarked ? (
                                            <i
                                              className="fa fa-bookmark"
                                              aria-hidden="true"
                                            ></i>
                                          ) : (
                                            <i
                                              className="fa fa-bookmark-o"
                                              aria-hidden="true"
                                            ></i>
                                          )}
                                        </div>
                                      </div>
                                      Mark for Review
                                    </div>
                                    <div
                                      title=""
                                      className={`strikeeout ${
                                        showStrike ? "active" : ""
                                      }`}
                                      onClick={toggleStrike}
                                    >
                                      {showStrike ? "ABC" : "ABC"}
                                      <span className="tooltiptext">
                                        Cross out answer choices you think are
                                        wrong.
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      paddingBottom: "5px",
                                      paddingTop: "10px",
                                    }}
                                  >
                                    {currentQuestion?.equation && (
                                      <>
                                        <div>
                                          <MathJaxContext
                                            version={3}
                                            config={config}
                                          >
                                            <MathJax
                                              inline
                                              dynamic
                                              hideUntilTypeset={"first"}
                                            >
                                              <div
                                                style={{ textAlign: "center" }}
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    currentQuestion?.equation,
                                                }}
                                              />
                                            </MathJax>
                                          </MathJaxContext>
                                        </div>
                                        <br />
                                      </>
                                    )}

                                    {currentQuestion?.question_type ===
                                    "Math" ? (
                                      <MathJaxContext
                                        version={3}
                                        config={config}
                                      >
                                        <MathJax
                                          inline
                                          dynamic
                                          hideUntilTypeset={"first"}
                                        >
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                currentQuestion?.question_text,
                                            }}
                                          />
                                        </MathJax>
                                      </MathJaxContext>
                                    ) : (
                                      // Render something else if sectionModule is not 2
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            currentQuestion?.question_text,
                                        }}
                                      />
                                    )}
                                  </div>

                                  {sectionType === 2 &&
                                  currentQuestion?.question_type === "Math" &&
                                  currentQuestion.isgridIn.toLowerCase() ===
                                    "true" ? (
                                    <div style={{ fontSize: "20px" }}>
                                      <input
                                        type="text"
                                        className="form-control answertextbox"
                                        value={answertext}
                                        onChange={handleAnswertextChange}
                                      />
                                      <br />
                                      {!validTextBox && (
                                        <>
                                          <span style={{color:"Red", fontSize:"10px", fontStyle:"italic"}}>Please provide your answer as a whole number, decimal, or fraction.</span>
                                          <br />
                                          <br />
                                        </>
                                      )}
                                      Answer Preview:{" "}
                                      <span className="answer_preview">
                                        {answertext}
                                      </span>
                                    </div>
                                  ) : (
                                    <ul className="question_ans scrollable-container">
                                      {["A", "B", "C", "D"].map((choiceKey) => (
                                        <div
                                          key={choiceKey}
                                          className="flex items-center justify-center"
                                          style={{ paddingBottom: "15px" }}
                                        >
                                          <div
                                            id={choiceKey}
                                            onClick={() =>
                                              handleOptionClick(choiceKey)
                                            }
                                            className={`flex border w-full rounded-lg px-2 cursor-pointer border-gray-500 false 
                                              ${
                                                currentQuestion?.strikeoptions &&
                                                currentQuestion?.strikeoptions?.findIndex(
                                                  (e) => e == choiceKey
                                                ) !== -1
                                                  ? "incorrect-option"
                                                  : ""
                                              } 
                                              ${
                                                selectedAnswer === choiceKey &&
                                                !currentQuestion?.strikeoptions?.includes(
                                                  choiceKey
                                                )
                                                  ? "highlighted"
                                                  : ""
                                              }`}
                                          >
                                            <div
                                              className={`rounded-full h-[30px] w-[30px] flex items-center justify-center mr-5`}
                                            >
                                              <label className="radio-label">
                                                <input
                                                  type="radio"
                                                  name="answer"
                                                  checked={
                                                    selectedAnswer === choiceKey
                                                  }
                                                  onChange={() =>
                                                    handleAnswerSelect(
                                                      choiceKey
                                                    )
                                                  }
                                                />
                                                <label className="letter">
                                                  {choiceKey}
                                                </label>
                                              </label>
                                            </div>
                                            <div>
                                              {data.length >
                                                currentQuestionIndex && (
                                                <span>
                                                  {currentQuestion?.question_type ===
                                                  "Math" ? (
                                                    <MathJaxContext
                                                      version={3}
                                                      config={config}
                                                    >
                                                      <MathJax
                                                        inline
                                                        dynamic
                                                        hideUntilTypeset={
                                                          "first"
                                                        }
                                                      >
                                                        {
                                                          currentQuestion[
                                                            `choice_${choiceKey?.toLowerCase()}`
                                                          ]
                                                        }
                                                      </MathJax>
                                                    </MathJaxContext>
                                                  ) : (
                                                    // Render something else if sectionModule is not 2
                                                    <span>
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            currentQuestion[
                                                              `choice_${choiceKey?.toLowerCase()}`
                                                            ],
                                                        }}
                                                      />{" "}
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          {showStrike && currentQuestion ? (
                                            currentQuestion?.strikeoptions &&
                                            currentQuestion?.strikeoptions?.findIndex(
                                              (e) => e == choiceKey
                                            ) !== -1 ? (
                                              <div
                                                key={choiceKey}
                                                onClick={() =>
                                                  handleStrikeout(choiceKey)
                                                }
                                                className="undo-btn cursor-pointer rounded-full h-[20px] w-[40px] text-xs flex items-center justify-center ml-4"
                                              >
                                                <u>Undo</u>
                                              </div>
                                            ) : (
                                              <div
                                                key={choiceKey}
                                                onClick={() =>
                                                  handleStrikeout(choiceKey)
                                                }
                                                className="incorrect-btn cursor-pointer rounded-full h-[20px] w-[40px] text-xs border border-gray-400 flex items-center justify-center ml-4"
                                              >
                                                {choiceKey}
                                              </div>
                                            )
                                          ) : null}
                                        </div>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {showModalAnswer ? (
                            <div
                              className="row"
                              style={{ minHeight: "100vh", marginTop: "95px" }}
                            >
                              <ModalAnswers
                                score={score}
                                moduleType={moduleType}
                                sectionType={sectionType}
                                test_id={questionTestId}
                                selectedAnswer={selectedAnswer}
                                data={data}
                                isAttempted={isAttempted}
                                currentQuestionIndex={currentQuestionIndex}
                                showModalAnswer={showModalAnswer}
                                onContinue={handleContinue}
                                onCancel={handleCancel}
                                onQuestionSelect={handleQuestionSelect}
                                setShowModalAnswer={setShowModalAnswer}
                                setShowGap={setShowGap}
                                setLoading={setLoading}
                                handleContinue={handleContinue}
                                setShowModal={setShowModal}
                              />
                            </div>
                          ) : (
                            <></>
                          )}

                          <div
                            className={`row ${
                              isPauseTimer ? "disabled" : ""
                            } fixed-footer`}
                          >
                            <hr className="dashed-border" />
                            <div
                              className="col-12"
                              style={{ padding: "0px 20px" }}
                            >
                              <div className="col-4">
                                <p>
                                  {first_name} {last_name}
                                </p>
                              </div>
                              <div className="col-4 question_numbers">
                                {showModal && (
                                  <QuestionModal
                                    data={data}
                                    section={sectionType}
                                    module={moduleType}
                                    currentQuestionIndex={currentQuestionIndex}
                                    onQuestionSelect={handleQuestionSelect}
                                    onClose={handleCloseModal}
                                    goToReviewPage={goToReviewPage}
                                  />
                                )}
                                <div className="pagination">
                                  <button onClick={handleToggleModal}>
                                    Question {currentQuestionIndex + 1} of{" "}
                                    {data.length}{" "}
                                    <i
                                      className={`fa fa-angle-${
                                        showModal ? "down" : "up"
                                      }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-4 paginations">
                                {currentQuestionIndex > 0 && (
                                  <button
                                    onClick={handlePrevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                  >
                                    Back
                                  </button>
                                )}
                                <button onClick={handleNextQuestion}>
                                  {currentQuestionIndex === data.length - 1
                                    ? "Submit"
                                    : "Next"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {showDirections && (
                        <div className="backgroundFade" id="backgroundFade">
                          <div className="popupContainer">
                            <div className="arrow-up"></div>
                            <div id="popupContent">
                              {sectionType === 1 ? (
                                <div style={{ height: "320px" }}>
                                  <p>
                                    The questions in this section address a
                                    number of important reading and writing
                                    skills. Each question includes one or more
                                    passages, which may include a table or
                                    graph. Read each passage and question
                                    carefully, and then choose the best answer
                                    to the question based on the passage(s).
                                  </p>
                                  <p>
                                    
                        
                                    All questions in this section are
                                    multiple-choice with four answer choices.
                                    Each question has a single best answer.
                                  </p>
                                </div>
                              ) : (
                                <div
                                  class="math-directions"
                                  style={{
                                    height: "320px",
                                    paddingRight: "25px",
                                    overflowY: "scroll",
                                  }}
                                >
                                  <p>
                                    The questions in this section address a
                                    number of important math skills. Use of a
                                    calculator is permitted for all questions. A
                                    reference sheet, calculator, and these
                                    directions can be accessed throughout the
                                    test.
                                  </p>

                                  <p>Unless otherwise indicated:</p>
                                  <ul>
                                    <li>
                                      All variables and expressions represent
                                      real numbers.
                                    </li>
                                    <li>
                                      Figures provided are drawn to scale.
                                    </li>
                                    <li>All figures lie in a plane.</li>
                                    <li>
                                      The domain of a given function is the set
                                      of all real numbers x for which f([x]) is
                                      a real number.
                                    </li>
                                  </ul>

                                  <p>
                                    For multiple-choice questions, solve each
                                    problem and choose the correct answer from
                                    the choices provided. Each multiple-choice
                                    question has a single correct answer.
                                  </p>

                                  <p>
                                    For student-produced response questions,
                                    solve each problem and enter your answer as
                                    described below:
                                  </p>
                                  <ul>
                                    <li>
                                      If you find more than one correct answer,
                                      enter only one answer.
                                    </li>
                                    <li>
                                      You can enter up to 5 characters for a
                                      positive answer and up to 6 characters
                                      (including the negative sign) for a
                                      negative answer.
                                    </li>
                                    <li>
                                      If your answer is a fraction that doesn't
                                      fit in the provided space, enter the
                                      decimal equivalent.
                                    </li>
                                    <li>
                                      If your answer is a decimal that doesn't
                                      fit in the provided space, enter it by
                                      truncating or rounding at the fourth
                                      digit.
                                    </li>
                                    <li>
                                      If your answer is a mixed number (such as
                                      3 1/2), enter it as an improper fraction
                                      (7/2) or its decimal equivalent (3.5).
                                    </li>
                                    <li>
                                      Don't enter symbols such as a percent
                                      sign, comma, or dollar sign.
                                    </li>
                                  </ul>
                                </div>
                              )}
                              <button
                                className="directionClose"
                                onClick={toggleDirections}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {showAnnotationBox && (
                        <div className="w-full h-[60%] fixed bottom-0 bg-gray-200">
                          <div className="flex justify-between bg-gray-900 text-white px-16 py-3">
                            <h1>
                              New Annotation:
                              <span className="ml-2 text-gray-300 text-sm">
                                {formatSelection(selectedText)}
                              </span>
                            </h1>
                            <div>
                              <button
                                onClick={() => setShowAnnotationBox(false)}
                              >
                                Close X
                              </button>
                            </div>
                          </div>
                          <div className="px-16 my-5">
                            <div className="flex items-center space-x-5 mb-3">
                              <div className="space-x-3 flex items-center justify-center">
                                <label htmlFor="colorPicker">
                                  Highlight Color:
                                </label>
                                <input
                                  type="color"
                                  id="colorPicker"
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                  style={{ backgroundColor: color }}
                                  className="rounded-full w-0 h-0 outline-none border-[1px] border-gray-800 p-3"
                                />
                              </div>
                              <div className="space-x-3 flex items-center justify-center">
                                <div>Underline Style:</div>
                                <button
                                  onClick={() =>
                                    setTextUnderline(!textUnderline)
                                  }
                                  className={`underline border-[1px] border-gray-800 px-1 ${
                                    textUnderline && "border-[2px] font-bold"
                                  }`}
                                >
                                  U
                                </button>
                              </div>
                            </div>
                            <div>
                              <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-[60%] h-[100px] resize-none rounded border-[1px] border-gray-400 focus-within:border-gray-600 outline-none p-3"
                              />

                              <div className="mt-2 space-x-2">
                                <button
                                  onClick={annotationSaveHandler}
                                  className="rounded-3xl px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button className="rounded-3xl px-4 py-2 text-sm hover:bg-gray-300">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <Modal
                        isOpen={isReportModalOpen}
                        closeModal={closeReportModal}
                        apiResponse={reportResponse}
                      ></Modal>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SatQuestion;
