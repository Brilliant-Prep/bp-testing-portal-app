import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
 

const AutoLogoutComponent = () => { 
  const rolename = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => { 
    const isAdmin = (rolename === 'admin');

    /*const timeoutDuration = isAdmin ? 60000000 : 12000000000;
    const logoutTimer = setTimeout(() => {
      // Perform logout logic here
      console.log('Auto logout after 2 seconds');
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("userid"); 
      navigate('/'); // Replace '/' with your actual login page route
    }, timeoutDuration);*/

    // Cleanup the timer when the component unmounts or when the user interacts with the app
    return () => {
      //clearTimeout(logoutTimer);
      console.log('AutoLogoutComponent unmounted');
    };
  }, [navigate]); // Include navigate in the dependency array to prevent linting warnings 
};

export default AutoLogoutComponent;
