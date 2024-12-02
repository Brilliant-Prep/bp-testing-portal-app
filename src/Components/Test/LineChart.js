import React from 'react';

const VerticalBarGraph = ({ data }) => {
  return (
    <div className="vchart-container">
      <div className="vbar-container">
        {data.map((value, index) => (
          <div key={index} className="vbar-wrapper">
            <div className="vbar" style={{ height: `${value}%` }}></div>
            <div className="vbar-label">Label {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalBarGraph;
