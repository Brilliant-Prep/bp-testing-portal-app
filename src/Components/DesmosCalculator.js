import React, { useEffect } from 'react';

function DesmosCalculator() {
  useEffect(() => {
    // Load the Desmos API script
    const script = document.createElement('script');
    script.src = 'https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize the Desmos calculator when the script is loaded
      const elt = document.getElementById('calculator');
      const calculator = window.Desmos.GraphingCalculator(elt);
    };

    return () => {
      // Clean up by removing the script if the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="calculator" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default DesmosCalculator;
