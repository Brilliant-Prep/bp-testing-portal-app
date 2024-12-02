import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentSatScoreList() {
  const [students, setStudents] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchSatScores = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}satallstudentsscores`
        );
        if (response.status === 200) {
          const studentData = response.data;

          // Set headers based on the API response
          setHeaders(studentData.headers); // assuming the headers are part of the response

          // Collect students
          setStudents(studentData.students); // assuming students are part of the response
        }
      } catch (error) {
        console.error("Error fetching student scores:", error);
      }
    };

    fetchSatScores();
  }, []);

  const renderScores = (tests) => {
    return headers.slice(2).map((_, index) => {
      const test = tests?.find(t => t.type === `SAT Test ${Math.floor(index / 3) + 1}`);
      const scoreType = (index % 3 === 0) ? 'score' : (index % 3 === 1) ? 'math' : 'reading';
      return (
        <td key={index}>
          {test ? test[scoreType] : '-'}
        </td>
      );
    });
  };

  return (
    <div className="content-body container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h4 className="card-title">All Students Score Report</h4>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-bordered zero-configuration"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        {headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          {student.scores.map((score, scoreIndex) => (
                            <td key={scoreIndex}>{score !== null ? score : '-'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSatScoreList;
