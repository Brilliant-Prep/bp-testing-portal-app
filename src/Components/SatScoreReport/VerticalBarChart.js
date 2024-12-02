import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const VerticalBarChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['R&W 1', 'R&W 2', 'Math 1', 'Math 2'],
        datasets: [
          {
            label: 'Omitted',
            data: [10, 5, 5, 10],
            backgroundColor: 'rgba(244,176,0, 1)',
            borderColor: 'rgba(244,176,0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Missed',
            data: [7, 15, 15, 10],
            backgroundColor: 'rgba(255,0,0, 1)',
            borderColor: 'rgba(255,0,0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Correct',
            data: [10, 7, 2, 2],
            backgroundColor: 'rgba(0,177,81, 1)',
            borderColor: 'rgba(0,177,81, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default VerticalBarChart;
