import React, { useState } from "react";
const Page1 = () => {

  const [data, setData] = useState([
    { label: 'R&W 1', percentage: '96.2' },
    { label: 'R&W 2', percentage: '70.2' },
    { label: 'Math 1', percentage: '100' },
    { label: 'Math 2', percentage: '65.5' },
  ]);
  return (
    
    <div>
    <div class="card-body pdf_score"> 
         <div class="row d-flex justify-content-center mt-100">
            <div class="col-md-12">
                <div className="sections-score-wrapper" style={{ display: 'flex' }}>
                  <div class="block" style={{ marginTop: '40px' }}>
                      <div class="sc_head">Reading & Writing Score</div>
                      <div class="rsatprogress-bar satprogress" role="progressbar" aria-valuenow="100" 
                      aria-valuemin="0" aria-valuemax="100">
                           <span>620<br/></span>
                           200-800
                      </div>
                  </div>
                  <div class="block">
                      <div class="sc_head">Total Score</div>
                      <div class="rsatprogress-bar2 satprogress" role="progressbar" aria-valuenow="75" 
                      aria-valuemin="0" aria-valuemax="100">
                           <span>1320<br/></span>
                           400-1600   
                      </div>
                  </div>
                  <div class="block" style={{ marginTop: '40px' }}>
                      <div class="sc_head">Math Score</div>
                      <div class="rsatprogress-bar3 satprogress" role="progressbar" aria-valuenow="75" 
                      aria-valuemin="0" aria-valuemax="100">
                           <span>700<br/></span>
                           200-800
                      </div>
                  </div>
                </div>
            </div>
       </div> 

       <div class="satmods">
            <div class="rounds">
                <div class="rwtitle">Reading & Writing</div>
                <div class="rowround">
                    <div class="colname">
                         &nbsp;
                    </div>
                    <div class="colname">
                        M1
                    </div>
                    <div class="colname">
                        M2
                    </div>
                    <div class="colname">
                        Total
                    </div>
                </div>
                <div class="rowround">
                    <div class="colname satgreen">
                         # Correct
                    </div>
                    <div class="colname satgreen">
                        10
                    </div>
                    <div class="colname satgreen">
                        20
                    </div>
                    <div class="colname satgreen">
                        30
                    </div>
                </div>  
                <div class="rowround">
                    <div class="colname satred">
                         # Incorrect
                    </div>
                    <div class="colname satred">
                        10
                    </div>
                    <div class="colname satred">
                        20
                    </div>
                    <div class="colname satred">
                        30
                    </div>
                </div>                
                <div class="rowround">
                    <div class="colname satorange">
                         # Omitted
                    </div>
                    <div class="colname satorange">
                        10
                    </div>
                    <div class="colname satorange">
                        20
                    </div>
                    <div class="colname satorange">
                        30
                    </div>
                </div> 
                <div class="final_score">
                    Score 400
                </div>
            </div>
            <div class="rounds">
                <div class="rwtitle">Math</div>
                <div class="rowround">
                    <div class="colname">
                         &nbsp;
                    </div>
                    <div class="colname">
                        M1
                    </div>
                    <div class="colname">
                        M2
                    </div>
                    <div class="colname">
                        Total
                    </div>
                </div>
                <div class="rowround">
                    <div class="colname satgreen">
                         # Correct
                    </div>
                    <div class="colname satgreen">
                        10
                    </div>
                    <div class="colname satgreen">
                        20
                    </div>
                    <div class="colname satgreen">
                        30
                    </div>
                </div>  
                <div class="rowround">
                    <div class="colname satred">
                         # Incorrect
                    </div>
                    <div class="colname satred">
                        10
                    </div>
                    <div class="colname satred">
                        20
                    </div>
                    <div class="colname satred">
                        30
                    </div>
                </div>                
                <div class="rowround">
                    <div class="colname satorange">
                         # Omitted
                    </div>
                    <div class="colname satorange">
                        10
                    </div>
                    <div class="colname satorange">
                        20
                    </div>
                    <div class="colname satorange">
                        30
                    </div>
                </div> 
                <div class="final_score">
                    Score 400
                </div>
            </div>
       </div>

       <div class="satmods">
            <div class="rounds noborder">
                <h3>Performance</h3>
                <div className="chart">
                     <canvas id="canvas-barchart3" ></canvas>
                </div>
            </div>
            <div class="rounds noborder">
                <h3>Accuracy</h3>
                <div className="chart" style={{paddingTop:"25px"}}>
                    {data.map((item, index) => (
                      <div key={index} className="bar-container">
                        <div className="label">{item.label}</div>
                        <div className="bar-wrapper">
                          <div className="bar" style={{ width: `${item.percentage}%` }}>
                          </div>
                        </div>
                        <div className="percentage">{`${item.percentage}%`}</div>
                      </div>
                    ))}
                </div>
            </div>
       </div>
    </div>
  </div>
  );
};

export default Page1;
