import React, { useState, useEffect, Fragment } from "react";
import  Resource from '../Components/Resources/Resource.js';
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js"; 
import LineChart from '../Components/SatResults/LineChart';
import axios from "axios";

function Resources() {
const [data, setData] = useState([]);
const [results, setResults] = useState([]);
const [results3, setResults3] = useState([]);
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
	labels: ['R&W 1', 'R&W 2'],
	datasets: [{
		label: 'Reading Scores',
		backgroundColor: [
			'#3a2f7c',
			'#3a2f7c',
		],
		borderColor: [
			'#3a2f7c',
			'#3a2f7c', 
		],
		borderWidth: 1,
		maxBarThickness: 6,
		
		data: [
			20,
			22, 
			27
		]
	}],
 };
 const chartData2 = {
	labels: ['Math 1', 'Math 2'],
	datasets: [{
		label: 'Math Scores',
		backgroundColor: [ 
			'#ed197e',
			'#ed197e',
		],
		borderColor: [ 
			'#ed197e',
			'#ed197e',
		],
		borderWidth: 1,
		maxBarThickness: 6,
		
		data: [ 
			20,
			18,
			22
		]
	}],
 };
  const rolename = localStorage.getItem("role");
  useEffect(() => {
    getReport()  
  }, []);
  const userId = localStorage.getItem("userid");
  
  const getReport = async () => {
    try { 
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getsatreportbyuser/${userId}/64e25a2e8957e3eeac340996` 
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
    <SHeaderbar/>
	{rolename=='student' && (
    <div class="app-wrapper">	    
	    <div class="app-content pt-3 p-md-3 p-lg-4">
		    <div class="container-xl">
			    <div class="row g-4 mb-4">
			        <div class="col-12 col-lg-6">
				        <div class="app-card app-card-chart h-100 shadow-sm"> 
					        <div class="app-card-body p-3 p-lg-4"> 
								<div className="chart">
									<LineChart data={chartData} />
								</div>
					        </div>
				        </div>
			        </div> 
					<div class="col-12 col-lg-6">
				        <div class="app-card app-card-chart h-100 shadow-sm"> 
					        <div class="app-card-body p-3 p-lg-4"> 
								<div className="chart">
									<LineChart data={chartData2} />
								</div>
					        </div>
				        </div>
			        </div> 
			    </div>
		    </div>
	    </div>
	    
	    <SFooterbar/>
    </div>
	)}
    </div>
  );
}

export default Resources; 
