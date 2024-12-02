import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 

const ProgressReport = () => {
  const [activeTab, setActiveTab] = useState(0); 
  const { id } = useParams();
  const userId = localStorage.getItem("userid");

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false); 
 

  const handleTabClick = (index) => {
    setActiveTab(index);
  }; 

  const [data, setData] = useState([]); 
  
  useEffect(() => { 
  }, []);     
  return (
    <div> 
        <div class="app-content pt-3 p-md-3 p-lg-4">
		    <div class="container-xl"> 
            <div class="row g-4 mb-4 weekly-calendar">
                    <div class="col-12 col-lg-9">
                        <h5>Progress Report</h5>
                        Rishikesh Y &gt; Report
                    </div>
                    <div class="col-12 col-lg-3">
                        <select class="form-control">
                                <option value="64d65272364367021fe8ac3a">Rishikesh Y</option>
                                <option value="651b7a7470b4f37aba2d3983">Ishu K</option>
                        </select>
                    </div>
                </div>
		    </div>
	    </div>
	    <div class="row g-4 mb-4">
            <div class="col-12 col-lg-12">
                <div class="app-card app-card-chart h-100 shadow-sm"> 
                    <div class="app-card-body p-3 p-lg-4"> 
                        <div class="chart-container">
                            <canvas id="canvas-barchart" style={{height:"200"}}></canvas>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="row g-4 mb-4">
            <div class="col-12 col-lg-6">
                <div class="app-card app-card-chart h-100 shadow-sm"> 
                    <div class="app-card-body p-3 p-lg-4"> 
                        <div class="chart-container">
                            <canvas id="canvas-barchart2" ></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="app-card app-card-chart h-100 shadow-sm"> 
                    <div class="app-card-body p-3 p-lg-4"> 
                        <div class="chart-container">
                            <canvas id="canvas-barchart4" ></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  );
}; 
export default ProgressReport;
