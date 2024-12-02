import React, { useEffect } from 'react';

const MathJaxWrapper = ({ children }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']]
        }
      };
      (function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
        script.async = true;
        document.head.appendChild(script);

        script.onload = function() {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_SVG';
          script.async = true;
          document.head.appendChild(script);
        };
      })();
    `;
a
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [children]);

  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};

export default MathJaxWrapper;
