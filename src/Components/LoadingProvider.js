import React, { useState, useEffect } from "react";

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the document is already loaded
    if (document.readyState === "complete") {
      setIsLoading(false); // Page has already loaded
    } else {
      // Add event listener for when the page finishes loading
      const handlePageLoad = () => setIsLoading(false);

      window.addEventListener("load", handlePageLoad);

      // Cleanup event listener when the component unmounts
      return () => {
        window.removeEventListener("load", handlePageLoad);
      };
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingProvider;
