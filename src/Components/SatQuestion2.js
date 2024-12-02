import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import he from "he"; // Import the he library
import CountdownTimer from "./CountdownTimer";
import { Col, Modal, Row } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'font-awesome/css/font-awesome.min.css';
const first_name = localStorage.getItem("first_name");
const last_name = localStorage.getItem("last_name");
function ModuleFinish({ onTimeIsUp }) {
  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="card">
            <div class="card-body">
              <div class="col-12">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title">Create New SAT Test</h4>
                  </div>
                  <div class="col-6 text-right">
                    <Link to={`/sattests`} class="btn btn-outline-primary"><i className="fa fa-arrow-left"></i> Back to SAT Tests</Link>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-12">
                    <div className="container-fluid" style={{ background: "white" }}>
                      <div>
                        <h4>Complete all modules</h4>
                        <p>
                          All your work has been saved.
                          <br />
                          You'll move on automatically in just a movement.
                          <br />
                          Do not refresh this page or exit the app.
                        </p>
                        <img src="images/Loading_icon.gif" border="0" />
                        {/* <CountdownTimer initialTime={GAP_DURATION / 1000} /> */}
                        <CountdownTimer
                          initialTime={6000 / 1000}
                          onTimeIsUp={onTimeIsUp}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionModal({ data, section, module, currentQuestionIndex, onQuestionSelect, onClose }) {
  function isAttempted(index) {
    if (data[index].selected_answer != null) return "active"
  }
  return (
    <div className="question-modal">
      <div className="modal-content">
        <div class="row">
          <div style={{ float: "left", width: "90%" }}>
            <h2>Section {section}, Module {module}: Reading and Writing</h2>
          </div>
          <div style={{ float: "right", width: "10%" }}>
            <button onClick={onClose} class="questionclose">X</button>
          </div>
        </div>
        <hr />
        <ul class="breadcrumb">
          <li>
            Current
          </li>
          <li>
            Unanswered
          </li>
          <li>
            For Review
          </li>
        </ul>
        <hr />
        <ul id="question_list">
          {data.map((_, index) => (
            <li key={index} className={`${isAttempted(index)} question-no`}>
              <div className="bookmark-container">{data[index]?.bookmarked ? <i class="fa fa-bookmark" aria-hidden="true"></i> : ""}</div>
              <div className="current-container">{currentQuestionIndex === index ? <i class="fa fa-map-marker" aria-hidden="true"></i> : <></>}</div>
              <button onClick={() => onQuestionSelect(index)}>{index + 1}</button>
            </li>
          ))}
        </ul>
        <button class="review_button">Go to Review Page</button>
      </div>
    </div>
  );
}

function ModalAnswers(props) {
  useEffect(() => {
    if (props.show) {
      // save answer test here
      saveAnswerTest();
    }
  }, [props.data, props.show]);

  const saveAnswerTest = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}saveanswertest`,
        {
          module_type: props.moduleType,
          section_type: props.sectionType,
          answers: props.data,
          score: props.score,
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
  return (<>
    <div style={{textAlign:"center",paddingTop:"30px"}}>
          <h3>Check Your Work</h3>
          <p>
              On test day, you won't be able to move on the next module until time expires,<br/>
              For these practice questions, you can click <strong>Next</strong> when you're ready to move on
          </p>
          <ul id="question_list" class="checkwork">
            <div class="row">
              <div class="title">
                <h6><strong>Section 1, Module 1: Reading and Writing Questions</strong></h6>
              </div>
              <div class="breadcrub">
              <i class="fa fa-check" aria-hidden="true"></i> Unanswered <i class="fa fa-bookmark" aria-hidden="true"></i> For Review
              </div>
            </div>
            <hr/>
            {props.data.map((_, index) => (
              <li key={index} className={`${props.isAttempted(index)} question-no`}>
                <div className="bookmark-container">{props.data[index]?.bookmarked ? <i class="fa fa-bookmark" aria-hidden="true"></i> : ""}</div>
                <div className="current-container">{props.currentQuestionIndex === index ? <i class="fa fa-map-marker" aria-hidden="true"></i> : <></>}</div>

                <button onClick={() => props.onQuestionSelect(index)}>{index + 1}</button>
              </li>
            ))}
          </ul> 
      </div>
    
  </>


  );
}

// const QUESTION_SET_SIZE = 3;
const GAP_DURATION = 1 * 60 * 1000; // 10 minutes in milliseconds
const QUESTION_DURATON = (1 * 60 * 3000) / 100; // 30 minutes in miliseconds
// const QUESTION_DURATON = 3; // 30 minutes in miliseconds
function SatQuestion() {
  useEffect(() => {
    getQuestions();
  }, []);

  const [data, setData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showGap, setShowGap] = useState(false); // State to manage the gap display
  const [showStrike, setShowStrike] = useState(false); // State to manage the gap display

  const [showModalAnswer, setShowModalAnswer] = useState(false);
  const [moduleType, setModuleType] = useState(1);
  const [sectionType, setSectionType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  const [correctText, setCorrectText] = useState("");
  const [selectedText, setSelectedText] = useState();
  const [note, setNote] = useState("");
  const [color, setColor] = useState("yellow");
  const [showAnnotationBox, setShowAnnotationBox] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  useEffect(() => {
    console.log("currentQuestionIndex > ", currentQuestionIndex);
    console.log("data.length > ", data.length);
    // setShowModalAnswer(currentQuestionIndex === data.length - 1);
  }, [currentQuestionIndex]);

  useEffect(() => {
    (async () => {
      await getQuestions(moduleType, sectionType);
    })();
  }, [moduleType, sectionType]);

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
      currentQuestion
    }));
    setData(updatedData);
  };

  const toggleStrike= () => {
setShowStrike(!showStrike)
  };

  const handleNextQuestion = () => {
    // Update selected answer for the current question
    const currentData = [...data];
    Object.assign(currentData[currentQuestionIndex], {
      ...currentData[currentQuestionIndex],
      selected_answer: selectedAnswer,
    });
    setData(currentData);

    if (currentQuestionIndex === data?.length - 1) {
      setShowModalAnswer(true);
    } else {
      setSelectedAnswer(
        data[currentQuestionIndex + 1].selected_answer || null
      );
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    // Update selected answer for the current question
    const currentData = [...data];
    Object.assign(currentData[currentQuestionIndex], {
      ...currentData[currentQuestionIndex],
      selected_answer: selectedAnswer,
    });
    setData(currentData);

    setSelectedAnswer(
      data[currentQuestionIndex - 1].selected_answer || null
    );
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [showDirections, setShowDirections] = useState(true);


  const data2 = [] // Your array of questions

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setShowModalAnswer(false)
    setShowModal(false); // Close the modal
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const getQuestions = async (module_type = 1, section_type = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getallquestions`,
        {
          params: {
            module_type,
            section_type,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching questions:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentQuestion = data[currentQuestionIndex];
  console.log(currentQuestionIndex, currentQuestion, "currentQuestion===");
  console.log(data, "data---");

  if (data.length === 0) {
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

  const refetchQuestions = async () => {
    console.log("move to next module or finish all tests");
    let currentModuleType = moduleType;

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

    // Accumulate current module's data for PDF generation
    setAccumulatedData((prevData) => [...prevData, ...data]);
  };


  const handleContinue = () => {
    if (moduleType === 2 && sectionType === 2) {
      console.log('continue button');
      setAccumulatedData((prevData) => [...prevData, ...data]
      );
      console.log('accumlatedata', accumulatedData);
      handleDownloadPDF(accumulatedData)
    }
    setShowGap(true);
    setShowModalAnswer(false);
    resetSelectedAnswers();
  };
  const handleCancel = () => {
    setShowModalAnswer(false);
  };

  const handleStrikeout = (choiceKey) => {


    // Update the score based on the correct answer
    const currentData = [...data];
    const currentQuestion = currentData[currentQuestionIndex];

    let strikeoptions = [...currentQuestion.strikeoptions ?? []]

    if (strikeoptions.indexOf(choiceKey) == -1) {strikeoptions.push(choiceKey)}else{
      strikeoptions.splice(strikeoptions.indexOf(choiceKey),1)
    }

    // Update the data with the selected answer
    Object.assign(currentData[currentQuestionIndex], {
      ...currentQuestion,
      strikeoptions: strikeoptions,
    });

    setData(currentData);


    const updatedData = data.map((question) => ({
      ...question,
      currentQuestion
    }));
    setData(updatedData);

    // const element = document.getElementById(choiceKey);
    // if (element) {
    //   if (element.classList.contains('incorrect-option')) {
    //     // If the element has the 'strikethrough' class, remove it
    //     element.classList.remove('incorrect-option');
    //   } else {
    //     // If the element doesn't have the 'strikethrough' class, add it
    //     element.classList.add('incorrect-option');
    //   }
    // }

  };

  const annotateHandler = () => {
    const selection = window.getSelection();
    const id = uuid();

    if (selection?.toString()) {
      console.log("selection", selection);

      setAnnotations([...annotations, { id, text: selection.toString(), color }]);
      setSelectedText(selection.toString());

      setShowAnnotationBox(true);

      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.style.textDecoration = textUnderline ? "underline" : "";
      span.className = "highlighted-text";
      // span.id = "text";
      span.id = id;
      span.textContent = selectedText;
      selection.getRangeAt(0).surroundContents(span);
    }
    selection?.removeAllRanges();
  };
  function isAttempted(index) {
    if (data[index].selected_answer != null) return "active"
  }
  const annotationSaveHandler = () => {
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

      setNote("");
    }

    // setShowAnnotationBox(false);
  };

  const uuid = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  console.log(moduleType, sectionType, "moduleType");
  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };

  // setSectionType(currentSectionType + 1);
  // const refetchQuestions = async () => {
  //   console.log("move to next module or finish all tests");
  //   let currentModuleType = moduleType;

  //   if (moduleType === 1 && sectionType === 1) {
  //     setModuleType(moduleType + 1);
  //   } else if (moduleType === 2 && sectionType === 1) {
  //     setModuleType(moduleType - 1);
  //     setSectionType(sectionType + 1);
  //   } else {
  //     setModuleType(2);
  //   }
  //   setShowGap(false);
  //   setShowModalAnswer(false);
  //   setCurrentQuestionIndex(0);
  // };

  return (
    <>
    
      <div class="container-fluid page-body-wrapper" style={{ padding: "0px" }}>
        <div class="main-panel">
          <div>
            <div class="card" style={{ padding: "0px" }}>
              <div class="card-body" style={{ padding: "0px" }}>
                <div
                  className="container-fluid"
                  style={{
                    background: "white",
                    position: "relative",
                    padding: "0px",
                    margin: "0px",
                    // minHeight: '75vh',
                  }}
                >
                  {showGap ? (
                    <div>
                      <h4>This Module Is Over</h4>
                      <p>
                        All your work has been saved.
                        <br />
                        You'll move on automatically in just a movement.
                        <br />
                        Do not refresh this page or exit the app.
                      </p>
                      <img src="images/Loading_icon.gif" border="0" />

                      <CountdownTimer
                        initialTime={GAP_DURATION / 10000}
                        onTimeIsUp={refetchQuestions}
                      />
                    </div>
                  ) : (
                    <><div className="row">
                      <div className="col-12">
                        <div className="row fixed-header">
                          <div className="col-12" style={{ padding: "0px 20px" }}>
                            <div className="col-4">
                              Section {sectionType}, Module {moduleType}:
                              Reading and Writing<br />
                              <button onClick={toggleDirections}>
                                {showDirections ? (
                                  // Display an arrow that points upwards when the popup is open
                                  <span>Directions &#11206;</span>
                                ) : (
                                  // Display an arrow that points downwards when the popup is closed
                                  <span>Directions &#11205; </span>
                                )}
                              </button>


                              {showDirections && (
                                <div class="popupContainer">
                                  <div class="arrow-up"></div>
                                  <div id="popupContent">
                                    <div style={{ height: "320px" }}>
                                      <p>
                                        The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or graph. Read each passageand question carefully,
                                        and then choose the best answer to the question based on the passage(s).
                                      </p>
                                      <p>
                                        All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
                                      </p>
                                    </div>
                                    <button class="directionClose" onClick={toggleDirections}>Close</button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              className="col-4"
                              style={{
                                textAlign: "center"
                              }}>
                              <div style={{
                                height: "30px"
                              }}>
                                {isTimerVisible ? (
                                  <CountdownTimer
                                    initialTime={QUESTION_DURATON}
                                    onTimeIsUp={() => {
                                      setShowModalAnswer(true);
                                    }}
                                  />
                                ) : (
                                  <i class="fa fa-clock-o" style={{
                                    fontSize: "20px"
                                  }}></i>
                                )}
                              </div>
                              <button class="timetoggles" onClick={() => setIsTimerVisible(!isTimerVisible)}>
                                {isTimerVisible ? "Hide" : "Show"}
                              </button>
                            </div>
                            <div className="col-4" style={{
                                    textAlign: "right"
                                  }}>
                              <button onClick={annotateHandler} className="">
                                      <i class="fa fa-pencil"></i><br/>
                                      Annotate
                              </button>
                              <button className="" style={{
                                    marginLeft: "20px"
                                  }}>
                                   <i class="fa fa-ellipsis-v"></i><br/>
                                     More
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                        {!showModalAnswer?    <div className="row" style={{
                          height: "480px", marginTop: "105px"
                        }}>
                          <div
                            className="col-12" style={{ padding: "0px 20px" }}>
                            <div
                              className="col-6"
                              style={{
                                borderRight: "2px solid #666",
                                height: "100%",
                                paddingRight: "20px",
                              }}
                            >
                              {currentQuestion?.figure === "" ? (
                                <div>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: he.decode(
                                        currentQuestion?.passage.replace(
                                          "�",
                                          "&eacute;"
                                        )
                                      ),
                                    }} />
                                </div>
                              ) : (
                                <div>
                                  <img
                                    src={currentQuestion?.figure}
                                    style={{ width: "90%" }}
                                    alt="Question Figure" />
                                </div>
                              )}
                            </div>
                            <div
                              className="col-6"
                              style={{ paddingLeft: "20px" }}
                            >
                              
                              
                              <div class="row question_header">
                                   <div class="question_no">{currentQuestionIndex + 1}{" "}</div>
                                   <div style={{ float: "left", width:"85%" }}>
                                        <div style={{ float: "left", marginRight:"10px"}} onClick={toggleBookMark}>
                                          <div className={currentQuestion?.bookmarked ? 'bookmarked-class' : 'not-bookmarked-class'}>
                                          {currentQuestion?.bookmarked ? <i className="fa fa-bookmark" aria-hidden="true"></i> : 
                                          <i className="fa fa-bookmark-o" aria-hidden="true"></i>}
                                        </div>
                                        </div> 
                                        Mark of Review
                                   </div>
                                   <div class="strikeeout" onClick={toggleStrike}>{showStrike ? 'ABC' : "ABC"}</div>
                              </div>
                              {currentQuestion?.question_text}
                              <ul className="question_ans">
                                {["A", "B", "C", "D"].map((choiceKey) => (
                                  <div className="flex items-center justify-center my-4">
                                    <div id={choiceKey}
                                   
                                      className={`flex border w-full rounded-lg px-5 py-2 cursor-pointer border-gray-500 false ${ currentQuestion?.strikeoptions && currentQuestion?.strikeoptions?.findIndex((e)=>e==choiceKey)  !== -1?( "incorrect-option"):""}`}
                                    >

                                      <div
                                        className={`rounded-full h-[30px] w-[30px] border border-gray-400 flex items-center justify-center mr-5`}
                                      >
                                        <input
                                          type="radio"
                                          name="answer"
                                          checked={selectedAnswer === choiceKey}
                                          onChange={() => handleAnswerSelect(choiceKey)} />
                                      </div>
                                      <div>
                                        {data.length > currentQuestionIndex && (
                                          <span>
                                            {choiceKey}.{" "}
                                            {currentQuestion[`choice_${choiceKey?.toLowerCase()}`]}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                   {showStrike? <div onClick={() => handleStrikeout(choiceKey)}
                                      className="incorrect-btn cursor-pointer rounded-full h-[20px] w-[20px] text-xs border border-gray-400 flex items-center justify-center ml-4"
                                    >
                                      {choiceKey}
                                    </div>:<></>}
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>:<></>}
                        {showModalAnswer? <div className="row" style={{height: "480px", marginTop: "95px"}}>
                       <ModalAnswers
                                score={score}
                                moduleType={moduleType}
                                sectionType={sectionType}
                                selectedAnswer={selectedAnswer}
                                data={data}
                                isAttempted={isAttempted}
                                currentQuestionIndex={currentQuestionIndex}
                                show={showModalAnswer}
                                onContinue={handleContinue}
                                onCancel={handleCancel}
                                onQuestionSelect={handleQuestionSelect}
                              />
                       

                            </div>:<></>}
                        <div className="row fixed-footer">
                          <br />
                          <hr />
                          <div className="col-12" style={{ padding: "0px 20px" }}>
                            <div className="col-4">
                              <p>{first_name} {last_name}</p>
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
                                />
                              )}
                              <div className="pagination">

                                <button onClick={handleOpenModal}>Question {currentQuestionIndex + 1} of{" "}
                                  {data.length}</button>
                              </div>
                            </div>
                            <div className="col-4 paginations">
                              <button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                              >
                                Prev
                              </button>
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
                      {showAnnotationBox && (
                        <div className="w-full h-[60%] fixed bottom-0 bg-gray-200">
                          <div className="flex justify-between bg-gray-900 text-white px-16 py-3">
                            <h1>
                              New Annotation:
                              <span className="ml-2 text-gray-300 text-sm">{formatSelection(selectedText)}</span>
                            </h1>
                            <div>
                              <button onClick={() => setShowAnnotationBox(false)}>Close X</button>
                            </div>
                          </div>
                          <div className="px-16 my-5">
                            <div className="flex items-center space-x-5 mb-3">
                              <div className="space-x-3 flex items-center justify-center">
                                <label htmlFor="colorPicker">Highlight Color:</label>
                                <input
                                  type="color"
                                  id="colorPicker"
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                  style={{ backgroundColor: color }}
                                  className="rounded-full w-0 h-0 outline-none border-[1px] border-gray-800 p-3" />
                              </div>
                              <div className="space-x-3 flex items-center justify-center">
                                <div>Underline Style:</div>
                                <button
                                  onClick={() => setTextUnderline(!textUnderline)}
                                  className={`underline border-[1px] border-gray-800 px-1 ${textUnderline && "border-[2px] font-bold"}`}
                                >
                                  U
                                </button>
                              </div>
                            </div>
                            <div>
                              <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-[60%] h-[100px] resize-none rounded border-[1px] border-gray-400 focus-within:border-gray-600 outline-none p-3" />

                              <div className="mt-2 space-x-2">
                                <button
                                  onClick={annotationSaveHandler}
                                  className="rounded-3xl px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button className="rounded-3xl px-4 py-2 text-sm hover:bg-gray-300">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>)}</>
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
