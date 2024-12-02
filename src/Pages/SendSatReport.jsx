import React, { useState, useEffect, useRef } from 'react';
import HTMLToPDF from "../Components/SatScoreReport/SatPdfReport";

function SendEmailPage() {  
  return (
    <div className="pdf_score_view">
    <div id="main-wrapper">
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
               <HTMLToPDF />
          </div>
        </div>
      </div> 
    </div>
  </div>
  );
}
export default SendEmailPage;
