import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import videoFile from '../Components/sat_video.mp4';
const userid = localStorage.getItem("userid");


function PreSatQuestion() {

  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  // Get student_id from URL query parameters
  let userId = getQueryParam('student_id'); 
  if (!userId) {
    userId = localStorage.getItem("userid");
  }
  const [showLoading, setShowLoading] = useState(true);
 
  const { id } =useParams();
  
  setTimeout(() => {
    setShowLoading(false)
  }, 15000);

  const handleNextButtonClick = async () => {
    //  console.log(props.data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}saveteststatus`,
        {
          test_id: id,
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
        let userId = getQueryParam('student_id'); 
        if (!userId) {
          window.location.assign("/satquestion/" + id);
        }
        else
        {
          window.location.assign(`/satquestion/${id}?student_id=${userId}`); 
        }
      }
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };  
  
  return (
    <>

      <div class="container-fluid page-body-wrapper" style={{ padding: "0px" }}>
        <div class="main-panel">
          <div>

            {showLoading ?
              <>
                <div className="mt-5 mb-5">
                     <h4 className="text-center" >We're Getting Your Practice Test Ready. </h4>
                </div>
                <div class="background_bg_test">
                <video width="640" height="360" autoPlay muted>
                  <source src={videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                  <center>
                      <div style={{ width: "25rem" }}>
                        <div style={{ padding: "2rem" }}>
                            This process could take about a minute.<br/> Please avoid refreshing or exiting
                        </div>
                      </div>
                  </center>
                </div>
              </>
              : <>
                <div>
                  <center>
                    <h2 class="practice_test_head">Practice Test</h2>
                    <div className="card practice_Test_block">
                      <div className="d-flex flex-row">
                        <div class="practice_icon">
                          <i class="fa fa-clock-o" aria-hidden="true"></i>
                        </div>
                        <div class="practice_text">
                          <h3  class="practice_Test_title">Timing</h3>
                          <div class="text-content">
                              Full-length practice tests are timed like real exams, but you can save and exit the test any time. If you continue on a different device, you'll need to start over.
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div class="practice_icon">
                          <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        </div>
                        <div class="practice_text">
                          <h3 class="practice_Test_title">Scores</h3>
                          <div class="text-content">
                              When you finish the practice test, go to My Practice to see your scores and get personalized study tips.
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div class="practice_icon">
                          <i class="fa fa-street-view" aria-hidden="true"></i>
                        </div>
                        <div class="practice_text">
                          <h3  class="practice_Test_title">Assistive Technology</h3>
                          <div class="text-content">
                              If you use assistive technology, you should try it out on the practice test so you know what to expect on test day.
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div class="practice_icon">
                          <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                        </div>
                        <div class="practice_text">
                          <h3 class="practice_Test_title">No Lockdown Mode</h3>
                          <div class="text-content">
                              We don't lock down practice tests. On test day, Bluebook prevents you from accessing other programs or apps.
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
                <div className="row fixed-footer">
                  <br />
                  <hr />
                  <div className="d-flex" >
                    <div className="col-8">

                    </div>

                    <div className="col-4 paginations">
                      <button onClick={() => { window.history.back() }}
                      >
                        Prev
                      </button>
                      <button onClick={handleNextButtonClick}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>}
          </div>
        </div>
      </div>
    </>
  );
}

export default PreSatQuestion;
