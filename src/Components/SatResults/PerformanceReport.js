import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file
import LineChart from './LineChart';
import axios from "axios";
import Chart from 'chart.js';

const Scores = () => { 
  const { id } = useParams();
  const userId = localStorage.getItem("userid"); 
 
  const [reading_count, setReadingCount] = useState([]);
  const [math_count, setMathCount] = useState([]);
  const [total_count, setTotalCount] = useState([]);
  const [mc1_count, setMc1Count] = useState([]);
  const [mc2_count, setMc2Count] = useState([]);
  const [tc_count, setTCCount] = useState([]);
  const [mw1_count, setMw1Count] = useState([]);
  const [mw2_count, setMw2Count] = useState([]);
  const [tw_count, setTWCount] = useState([]);
  const [mo1_count, setMo1Count] = useState([]);
  const [mo2_count, setMo2Count] = useState([]);
  const [to_count, setTOCount] = useState([]);
  const [mac1_count, setMac1Count] = useState([]);
  const [mac2_count, setMac2Count] = useState([]);
  const [tma_count, setTmaCount] = useState([]);
  const [mao1_count, setMao1Count] = useState([]);
  const [mao2_count, setMao2Count] = useState([]);
  const [tmao_count, setTMAOCount] = useState([]);
  const [maw1_count, setMaw1Count] = useState([]);
  const [maw2_count, setMaw2Count] = useState([]);
  const [tmw_count, setTMWCount] = useState([]);

  const chartData = {
    labels: ['Test 1', 'Test 2'],
    datasets: [{
        label: 'Scores',
        backgroundColor: [
            '#3a2f7c',
            '#3a2f7c',
        ],
        borderColor: [
            '#3a2f7c',
            '#3a2f7c',
        ],
        borderWidth: 30,
        maxBarThickness: 30,
        
        data: [
            0,
            reading_count
        ]
    }],
  };

  const chartData2 = {
    labels: ['Test1', 'Test2'],
    datasets: [{
        label: 'Scores',
        backgroundColor: [
            '#ed197e',
            '#ed197e',
        ],
        borderColor: [
            '#ed197e',
            '#ed197e',
        ],
        borderWidth: 30,
        maxBarThickness: 30,
        
        data: [
            0,
            math_count
        ]
    }],
  };
  
  useEffect(() => {
    getReport() 
  }, []);
  
  const getReport = async () => {
    try { 
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsatreportbyuser/${userId}/${id}` 
      );
      if (response.status === 200) {  
        setReadingCount(response.data.readingCount); 
        setMathCount(response.data.mathCount); 
        setTotalCount(response.data.totalCount); 
        setMc1Count(response.data.mc1Count); 
        setMc2Count(response.data.mc2Count); 
        setTCCount(response.data.totalrCount); 
        setMw1Count(response.data.mw1Count); 
        setMw2Count(response.data.mw2Count); 
        setTWCount(response.data.totalwCount); 
        setMo1Count(response.data.mo1Count); 
        setMo2Count(response.data.mo2Count); 
        setTOCount(response.data.totaloCount);
        setMac1Count(response.data.mac1Count); 
        setMac2Count(response.data.mac2Count); 
        setTmaCount(response.data.totalmrCount);
        setMao1Count(response.data.mao1Count); 
        setMao2Count(response.data.mao2Count); 
        setTMAOCount(response.data.totalmaoCount);  
        setMaw1Count(response.data.maw1Count); 
        setMaw2Count(response.data.maw2Count); 
        setTMWCount(response.data.totalmwCount); 
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };    

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Performance Report</h1>
        <div className="middle_container">
            <div className="page-content">
                <div style={{padding:"20px 50px"}}>
                    <div class="satmods">
                            <div class="rounds noborder">
                                <h3>Reading & Writing</h3>
                                <div className="chart">
                                <LineChart data={chartData} />
                                </div>
                            </div>
                            <div class="rounds noborder">
                               <h3>Math</h3>
                                <div className="chart" style={{paddingTop:"25px"}}>
                                    <LineChart data={chartData2} />
                                </div>
                            </div>
                    </div>
                    <div class="satmods">
                            <div class="rounds">
                                <div class="rowround">
                                    <div class="colname" style={{width:"50%"}}>
                                        <strong>Test Name</strong>
                                    </div>
                                    <div class="colname">
                                        <strong>Score</strong>
                                    </div> 
                                </div>                  
                                <div class="rowround">
                                    <div class="colname satgreen" style={{width:"50%"}}>
                                        Test 1
                                    </div>
                                    <div class="colname satgreen">
                                        0
                                    </div> 
                                </div> 
                                <div class="rowround">
                                    <div class="colname satgreen" style={{width:"50%"}}>
                                        Test 2
                                    </div>
                                    <div class="colname satgreen">
                                         {reading_count}
                                    </div> 
                                </div>  
                            </div>
                            <div class="rounds"> 
                                <div class="rowround">
                                    <div class="colname" style={{width:"50%"}}>
                                        <strong>Test Name</strong>
                                    </div>
                                    <div class="colname">
                                        <strong>Score</strong>
                                    </div> 
                                </div> 
                                <div class="rowround">
                                    <div class="colname satgreen" style={{width:"50%"}}>
                                        Test 1
                                    </div>
                                    <div class="colname satgreen">
                                        0
                                    </div> 
                                </div> 
                                <div class="rowround">
                                    <div class="colname satgreen" style={{width:"50%"}}>
                                        Test 2
                                    </div>
                                    <div class="colname satgreen">
                                        {math_count}
                                    </div> 
                                </div>  
                            </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  );
};
export default Scores;
