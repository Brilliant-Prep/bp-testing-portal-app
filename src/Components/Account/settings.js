
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 

const Settings = () => { 
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '', 
    password: '',
  });  
  const { id } = useParams();
  const userId = localStorage.getItem("userid");
  const [message, setMessage] = useState(null);   

  const [data, setData] = useState([]); 
  const [password, setPassword] = useState(''); 
  
  useEffect(() => { 
    getSingleUser(userId);
    // Fetch data from API and update tabsData state
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}get_students/${userId}`);
        //setTabsData(response.data); // Assuming the API response is an array of tab data
      } catch (error) {
        console.error('Error fetching tabs data:', error);
      }
    };

    fetchData();
  }, []); 

  const getSingleUser = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}edit/${id}`
    );
    if (response.status === 200) {
        setFormData({
            ...response.data,
            password: '' // Ensure password is empty for user to input
        });
    }
  };     

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
        ...formData,
        [name]: value,
      });
      setPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
        const userId = formData._id;    
        
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}update_settings/${userId}`, formData);

        if (response.status === 200) {
        setMessage('Profile updated successfully!');
        // Handle success, e.g., show a success message or redirect the user
        } else {
        setMessage('Failed to update profile');
        // Handle failure, show an error message, etc.
        }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };
  const [selectedTiming, setSelectedTiming] = useState(null);

  const handleTimingChange = (value) => {
    setSelectedTiming(value);
  };
  return (
    <div>        
        <h5>Account Settings</h5> 
        <div className="middle_container">
             <div className="page-content">
                <form>
                    <div className="row">
                        <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                 <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                 <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>                            
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Account Settings</div>
                            <div className="card-body">
                            <div className="row gx-3 mb-3">
                                    <div class="msgcolor">{message}</div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="first_name">First name</label>
                                        <input className="form-control" id="first_name" type="text" 
                                        name="first_name" value={formData.first_name || ''} 
                                        onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="last_name">Last name</label>
                                        <input className="form-control" id="last_name" type="text" 
                                        name="last_name" value={formData.last_name || ''} 
                                        onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">Middle name</label>
                                        <input className="form-control" id="inputFirstName" type="text" 
                                        name="middle_name" value={formData.middle_name || ''} 
                                        onChange={handleInputChange} />
                                    </div> 
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                        <input className="form-control" id="email" type="email" placeholder="Enter your email address" name="email" 
                                        value={formData.email || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Password</label>
                                        <input
                                            className="form-control" 
                                            type="password"
                                            name="password"
                                            value={formData.password} 
                                            onChange={handleInputChange}
                                        />
                                    </div> 
                                </div>  
                                <button style={{float:"right"}} className="btn btn-primary" type="button" onClick={handleSaveChanges}>Save</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
             </div>
        </div>   
    </div>
  );
};
const cellStyle = {
border: '1px solid #000',
padding: '8px',
textAlign: 'center',
};

const labelStyle = {
display: 'block',
margin: '4px 0',
};
export default Settings;
