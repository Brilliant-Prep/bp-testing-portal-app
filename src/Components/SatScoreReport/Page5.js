import React, { useState } from "react";
import VerticalBarChart from './VerticalBarChart';
const Page5 = () => {

  const numbers = Array.from({ length: 27 }, (_, index) => index + 1);
  return (
    
    <div style={{paddingTop:"20px"}}>
      <div class="card-body pdf_score"> 
          <div class="logo">
              <img src="/images/logo.png" border="0"/>
          </div>
          <div class="headding">
                <h2>Strength & Weeknesses</h2>
                <h5>Math</h5>
          </div>
          <div class="row"> 
                <div class="col_address">
                    <div><span style={{width:"75px"}}>Student</span><span>:</span> Sunitha.Y</div>
                    <div><span style={{width:"75px"}}>Student ID</span><span>:</span> 123456</div>
                </div>
                <div class="col_address right">
                    <div><span style={{width:"75px"}}>Tested On</span><span>:</span> November 22, 2022</div>
                    <div><span style={{width:"75px"}}>Test Code</span><span>:</span> BP_SAT1</div>
                </div>
          </div>

          <div class="row d-flex justify-content-center mt-100" style={{padding:"20px 0px 30px 0px"}}>
              <div class="col-md-12">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="page3_strength_weekness">  
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Data from Figure (DAF)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Support</td>
                          <td>
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td>1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Fill in Blank</td>
                          <td>
                              <span class="crcount">4</span>
                              <span class="wrcount">5</span>
                              <span class="orcount">6</span>
                          </td>
                          <td>2 of 3</td>
                        </tr>  
                        <tr>
                          <td class="rpad"><span class="scat_percent">4%</span> Function (FUN)</td>
                          <td class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Underlined Sentence</td>
                          <td>
                              <span class="crcount">7</span>
                              <span class="wrcount">8</span>
                              <span class="orcount">9</span>
                          </td>
                          <td>0 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> General (GEN)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Main Purpose</td>
                          <td>
                              <span class="crcount">10</span>
                              <span class="wrcount">11</span>
                              <span class="orcount">12</span>
                          </td>
                          <td>1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Main Idea</td>
                          <td>
                              <span class="crcount">13</span>
                              <span class="wrcount">14</span>
                              <span class="orcount">15</span>
                          </td>
                          <td>2 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Logical Completion (LGC)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Logical Completion</td>
                          <td>
                              <span class="crcount">16</span>
                              <span class="wrcount">17</span>
                              <span class="orcount">18</span>
                          </td>
                          <td>0 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Quotation (QUT)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Fill in Blank</td>
                          <td>
                              <span class="crcount">19</span>
                              <span class="wrcount">20</span>
                              <span class="orcount">21</span>
                          </td>
                          <td>1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Illustrate Claim</td>
                          <td>
                              <span class="crcount">3</span>
                              <span class="wrcount">4</span>
                              <span class="orcount">5</span>
                          </td>
                          <td>2 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Specific (SPC)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> What is True/Detail</td>
                          <td>
                              <span class="crcount">22</span>
                              <span class="wrcount">22</span>
                              <span class="orcount">23</span>
                          </td>
                          <td>0 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Support and Weaken (SUW)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Support</td>
                          <td>
                              <span class="crcount">24</span>
                              <span class="wrcount">25</span>
                              <span class="orcount">26</span>
                          </td>
                          <td>1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Weaken</td>
                          <td>
                              <span class="crcount">27</span>
                              <span class="wrcount">1</span>
                              <span class="orcount">2</span>
                          </td>
                          <td>2 of  3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Two Text (TWT)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Two Text</td>
                          <td>
                              <span class="crcount">3</span>
                              <span class="wrcount">4</span>
                              <span class="orcount">5</span>
                          </td>
                          <td>0 of 3</td>
                        </tr>
                        <tr>
                          <td  class="rpad"><span class="scat_percent">4%</span> Vocab-in-Context (VIC)</td>
                          <td  class="rpad">
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td  class="rpad">1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Fill in Blank</td>
                          <td>
                              <span class="crcount">6</span>
                              <span class="wrcount">7</span>
                              <span class="orcount">8</span>
                          </td>
                          <td>1 of 3</td>
                        </tr>
                        <tr>
                          <td class="mcat_sat"><span class="scat_percent">4%</span> Similar Word</td>
                          <td>
                              <span class="crcount">1</span>
                              <span class="wrcount">2</span>
                              <span class="orcount">3</span>
                          </td>
                          <td>2 of 3</td>
                        </tr>
                  </table>
              </div>
          </div>  
          <div class="satfooter">
              <div class="left">
                    &copy; 2023 This content is protected by federal copyright laws, which prohibit its reproduction, whether in entirety or in part, without the
  explicit written consent of Brilliant Education Group, LLC.
              </div>
              <div class="right">
                    Page 6
              </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;
