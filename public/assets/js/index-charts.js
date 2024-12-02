'use strict';

/* Chart.js docs: https://www.chartjs.org/ */

window.chartColors = {
	green: '#f768a0',
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed'
};

/* Random number generator for demo purpose */
var randomDataPoint = function(){ return Math.round(Math.random())};


//Chart.js Line Chart Example 

var lineChartConfig = {
	type: 'line',

	data: {
		labels: ['Test 1', 'Test 2'],
		
		datasets: [{
			label: 'Current week',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				400,
				860,
				1600
			],
		}, {
			label: 'Previous week',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				800,
				960,
				1600
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Verbal & Math Score',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
					return tooltipItem.value;
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};



// Chart.js Bar Chart Example 

const calculateChartWidth = (labels, datasets) => {
	// Calculate the total number of bars (sum of dataset lengths)
	const totalBars = datasets.reduce((acc, dataset) => acc + dataset.data.length, 0);
  
	// Assuming each bar has a width of 40 pixels, adjust as needed
	const barWidth = 40;
  
	// Calculate the total width of the chart
	const totalChartWidth = totalBars * barWidth;
  
	// Add additional padding if needed
	const padding = 20;
  
	// Return the calculated width
	return totalChartWidth + padding;
  };
  
const barChartConfig = {
	type: 'bar',
	data: {
	  labels: ['Test1', 'Test2'],
	  datasets: [
		{
		  label: 'Scores',
		  backgroundColor: window.chartColors.green,
		  borderColor: window.chartColors.green,
		  borderWidth: 1,
		  maxBarThickness: 6,
		  data: [53, 0],
		},
		{
		  label: 'Scores',
		  backgroundColor: 'blue',
		  borderColor: 'blue',
		  borderWidth: 1,
		  maxBarThickness: 6,
		  data: [42, 0],
		},
	  ],
	},
	options: {
	  responsive: true,
	  height: 1,
	  width: calculateChartWidth(['Test1', 'Test2'], [
		{ data: [53, 0] },
		{ data: [42, 0] },
	  ]),
	  // ... (rest of the options)
	},
};
  
  // Example usage:
const adjustedWidth = calculateChartWidth(['Test1', 'Test2'], [
	{ data: [53, 0] },
	{ data: [42, 0] },
]);
console.log('Adjusted Chart Width:', adjustedWidth);
  


var barChartConfig2 = {
	type: 'bar',

	data: {
		labels: ['Test1', 'Test2'],
		datasets: [{
			label: 'Scores',
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth: 1,
			maxBarThickness: 6,
			
			data: [
				53,
				0 
			]
		}]
	},
	options: {
		responsive: true,
		aspectRatio: 1.5,
		legend: {
			position: 'bottom',
			align: 'end',
		},
		title: {
			display: true,
			text: 'Reading Score'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},

			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},

				
			}]
		}
		
	}
}

var barChartConfig4 = {
	type: 'bar',

	data: {
		labels: ['Test1', 'Test2'],
		datasets: [{
			label: 'Scores',
			backgroundColor: 'blue',
			borderColor: 'blue',
			borderWidth: 1,
			maxBarThickness: 6,
			
			data: [
				42,
				0 
			]
		}]
	},
	options: {
		responsive: true,
		aspectRatio: 1.5,
		legend: {
			position: 'bottom',
			align: 'end',
		},
		title: {
			display: true,
			text: 'Math Score'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},

			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},

				
			}]
		}
		
	}
}


var barChartConfig3 = {
	type: 'bar',

	data: {
		labels: ['R&W 1', 'R&W 2', 'R&W 3', 'R&W 4'],
		datasets: [{
			label: 'Scores',
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth: 1,
			maxBarThickness: 6,
			
			data: [
				23,
				25,
				21,
				19,
				0,
				27
			]
		}]
	},
	options: {
		responsive: true,
		aspectRatio: 1.5,
		legend: {
			position: 'bottom',
			align: 'end',
		},
		title: {
			display: true,
			text: 'Total Score'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},

			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},

				
			}]
		}
		
	}
}



// Generate charts on load
window.addEventListener('load', function(){
	
	/*var lineChart = document.getElementById('canvas-linechart').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig);*/

	var barChart = document.getElementById('canvas-barchart');
	if (barChart) {
		var barChart = document.getElementById('canvas-barchart').getContext('2d');
		window.myBar = new Chart(barChart, barChartConfig);
	}

	var barChart2 = document.getElementById('canvas-barchart2');
	if (barChart2) {
		var barChartContext2 = barChart2.getContext('2d');
		window.myBar2 = new Chart(barChartContext2, barChartConfig2);
	}

	var barChart4 = document.getElementById('canvas-barchart4');
	if (barChart4) {
		var barChartContext2 = barChart4.getContext('2d');
		window.myBar2 = new Chart(barChartContext2, barChartConfig4);
	}

	var barChart3 = document.getElementById('canvas-barchart3');
	if (barChart3) {
		var barChartContext3 = barChart3.getContext('2d');
		window.myBar3 = new Chart(barChartContext3, barChartConfig3);
	}
});
	
