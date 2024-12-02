import React, { useEffect, useState } from "react";

import apiService from "../services/apiService";

function Home() {
  const role = localStorage.getItem('role')
  const [userCount, setUserCount] = useState({
    teamLeader: 0,
    recruiter: 0
  })
  const getDashboadCount = async () => {
    try {
      const result = await apiService().get('dashboardCount')
      setUserCount(result.data.data)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getDashboadCount()
  }, [])
  return (
    <>
      {role === 'admin' && (
        <>
          <h1>Team Leader Count: {userCount?.teamLeader}</h1>
          <h1>Recruiter Count: {userCount?.recruiter}</h1>
        </>
      )}

      {role === 'team_leader' && (
        <h1>Recruiter Count: {userCount?.recruiter}</h1>
      )}
    
    </>
  );
}

export default Home;
