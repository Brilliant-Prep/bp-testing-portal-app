
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Tabs.css'; // Import your CSS file 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 

const Profile = () => { 
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    no_of_students: '',
    gpa: '',
    phone: '',  
    city: '',
    state: '',
    zipcode: '',
  }); 
  const [activeTab, setActiveTab] = useState(1); 
  const [tabsData, setTabsData] = useState([]);
  const { id } = useParams();
  const userId = localStorage.getItem("userid");
  const [message, setMessage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const openModal3 = () => {
    setShowModal3(true);
  };

  const closeModal3 = () => {
    setShowModal3(false);
  };

  const openModal4 = () => {
    setShowModal4(true);
  };

  const closeModal4 = () => {
    setShowModal4(false);
  };

  const handleTabClick = (index) => {
    getSingleUser(userId);
    setActiveTab(index);
  }; 
  const handleTabClick2 = (index,userId) => {
    getSingleUser(userId);
  }; 

  const [data, setData] = useState([]); 
  
  useEffect(() => { 
    getSingleUser(userId);
    // Fetch data from API and update tabsData state
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}get_students/${userId}`);
        setTabsData(response.data); // Assuming the API response is an array of tab data
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
        setFormData({ ...response.data });
    }
  };     

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    alert(e.target.value);
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
        const userId = formData._id;    
        
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}update_parent/${userId}`, formData);

        if (response.status === 200) {
        setMessage('Parent profile updated successfully!');
        // Handle success, e.g., show a success message or redirect the user
        } else {
        setMessage('Failed to update parent profile');
        // Handle failure, show an error message, etc.
        }
    } catch (error) {
      console.error('Error updating parent profile:', error);
      setMessage('Error updating parent profile');
    }
  };
  const [selectedTiming, setSelectedTiming] = useState(null);

  const handleTimingChange = (value) => {
    setSelectedTiming(value);
  };
  return (
    <div>        
        <h5>Parents</h5> 
        <div className="middle_container">
             <div className="page-content">
                <div className="tabbed profile_page">
                    <input type="radio" id="tab1" name="css-tabs" checked={activeTab === 0} />
                    <input type="radio" id="tab2" name="css-tabs" checked={activeTab === 1} />
                    {tabsData.map((tab, index) => {
                        return (
                            <input
                                key={index} // Make sure to add a unique key
                                type="radio"
                                id={`tab${index + 3}`}
                                name="css-tabs"
                                checked={activeTab === index + 2}
                            />
                        );
                    })}
                    <ul className="tabs">
                        <li className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
                            <label>Billing</label> 
                        </li>
                        <li className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <label>Account</label> 
                        </li>
                        {tabsData.map((tab, index) => (
                            <li key={index} className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick2(index + 2, tab._id)}>
                                <label>{tab.first_name}</label> 
                            </li> 
                        ))}
                    </ul>

                    <div className="tab-content">
                    {activeTab === 0 && (
                        <>
                            <div>
                                Billing
                            </div>
                        </>
                    )}

                    {activeTab === 1 && (
                       <>
                           <div>
                                <div>
                                    <div className="container-xl px-4 mt-4">
                                        <form>
                                            <div className="row">
                                                <div className="col-xl-4">
                                                <div className="card mb-4 mb-xl-0">
                                                    <div className="card-header">Profile Picture</div>
                                                    <div className="card-body text-center">
                                                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                                    <button className="btn btn-primary" type="button">Upload new image</button>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-xl-8">
                                                <div className="card mb-4">
                                                    <div className="card-header">Account Settings</div>
                                                    <div className="card-body">
                                                        {message && (
                                                            <div className={message.includes('success') ? 'success-message' : 'error-message'}>
                                                            {message}
                                                            </div>
                                                        )}
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="first_name">First name</label>
                                                                <input className="form-control" id="first_name" type="text" 
                                                                name="first_name" value={formData.first_name} 
                                                                onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="last_name">Last name</label>
                                                                <input className="form-control" id="last_name" type="text" 
                                                                name="last_name" value={formData.last_name} 
                                                                onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputFirstName">Middle name</label>
                                                                <input className="form-control" id="inputFirstName" type="text" 
                                                                name="middle_name" value={formData.middle_name} 
                                                                onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputLastName">Gender</label><br/>
                                                                <span style={{float:"left", marginRight:"5px"}}>
                                                                        <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Male" style={{display:"block",float:"left", marginRight:"5px"}}
                                                                        checked={formData.gender === 'Male'}
                                                                        onChange={handleGenderChange}
                                                                        />{' '} Male
                                                                </span>
                                                                <span style={{float:"left", marginRight:"5px"}}>
                                                                        <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Female" style={{display:"block",float:"left", marginRight:"5px"}}
                                                                        checked={formData.gender === 'Female'}
                                                                        onChange={handleGenderChange}
                                                                        />{' '}
                                                                        Female
                                                                </span>                                                                    
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                                <input className="form-control" id="email" type="email" placeholder="Enter your email address" name="email" 
                                                                value={formData.email} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                                <input className="form-control" id="inputPhone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                                                            </div> 
                                                        </div>
                                                        {formData.role === 'parent' && (
                                                            <>
                                                                <div className="row gx-3 mb-3">
                                                                    <div className="col-md-6">
                                                                        <label className="small mb-1" htmlFor="address">Address</label>
                                                                        <input className="form-control" id="address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="small mb-1" htmlFor="suite">Apt/Suite</label>
                                                                        <input className="form-control" id="suite" type="text" name="suite" value={formData.suite} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="row gx-3 mb-3">
                                                                        <div className="col-md-6">
                                                                            <label className="small mb-1" htmlFor="country">Country</label>
                                                                            <input className="form-control" id="country" type="text" name="country" value={formData.country} onChange={handleInputChange} />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label className="small mb-1" htmlFor="state">State</label>
                                                                            <input className="form-control" id="state" type="text" name="state" value={formData.state} onChange={handleInputChange} />
                                                                        </div>
                                                                </div>
                                                                <div className="row gx-3 mb-3">
                                                                        <div className="col-md-6">
                                                                            <label className="small mb-1" htmlFor="city">City</label>
                                                                            <input className="form-control" id="city" type="text" name="city" value={formData.city} onChange={handleInputChange} />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label className="small mb-1" htmlFor="zipcode">Zipcode</label>
                                                                            <input className="form-control" id="zipcode" type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} />
                                                                        </div>
                                                                </div>
                                                            </> 
                                                        )}
                                                        {formData.role === 'student' && (
                                                            <><div className="row gx-3 mb-3">
                                                                          <div className="col-md-6">
                                                                              <label className="small mb-1" htmlFor="address">School Name</label>
                                                                              <input className="form-control" id="school" type="text" name="school" value={formData.school} onChange={handleInputChange} />
                                                                          </div>
                                                                          <div className="col-md-6">
                                                                              <label className="small mb-1" htmlFor="suite">Graduation Year</label>
                                                                              <input className="form-control" id="graduation_year" type="text" name="graduation_year" value={formData.graduation_year} onChange={handleInputChange} />
                                                                          </div>
                                                                      </div><div className="row gx-3 mb-3">
                                                                              <div className="col-md-6">
                                                                                  <div className="account_bk_style">
                                                                                      <p>
                                                                                          Learning Accommodations
                                                                                      </p>
                                                                                      <p style={{ color: "#de3e7e" }}>
                                                                                          Poor eyesight, Dyslexia, Hearing
                                                                                      </p>
                                                                                      <p style={{ float: "right" }}>
                                                                                          <a href="#" onClick={openModal}>
                                                                                              Edit
                                                                                          </a>
                                                                                      </p>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="col-md-6">
                                                                                  <div className="account_bk_style">
                                                                                      <p>
                                                                                          Testing Accommodations
                                                                                      </p>
                                                                                      <p style={{ color: "#de3e7e" }}>
                                                                                          Poor eyesight, Dyslexia, Hearing
                                                                                      </p>
                                                                                      <p style={{ float: "right" }}>
                                                                                          <a href="#" onClick={openModal2}>
                                                                                              Edit
                                                                                          </a>
                                                                                      </p>
                                                                                  </div>
                                                                              </div>
                                                                          </div></>
                                                        )}
                                                        <button style={{float:"right"}} className="btn btn-primary" type="button" onClick={handleSaveChanges}>Save</button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
<>
                    {tabsData.map((tab, index) => (
                        <React.Fragment key={index}>
                        {activeTab === 2 && (
                             <div>
                             <div>
                                 <div className="container-xl px-4 mt-4">
                                     <h6>Batch 1: Fridays, 9:00 am - 1:00 pm</h6> 
                                     <form>
                                         <div className="row">
                                             <div className="col-xl-4">
                                             <div className="card mb-4 mb-xl-0">
                                                 <div className="card-header">Profile Picture</div>
                                                 <div className="card-body text-center">
                                                 <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                 <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                                 <button className="btn btn-primary" type="button">Upload new image</button>
                                                 </div>
                                             </div>
                                             </div>
                                             <div className="col-xl-8">
                                             <div className="card mb-4">
                                                 <div className="card-header">Account Settings</div>
                                                 <div className="card-body">
                                                 <div className="row gx-3 mb-3">
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
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputLastName">Gender</label><br/>
                                                                <span style={{float:"left", marginRight:"5px"}}>
                                                                        <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Male" style={{display:"block",float:"left", marginRight:"5px"}}
                                                                        checked={formData.gender === 'Male'}
                                                                        onChange={handleGenderChange}
                                                                        />{' '} Male
                                                                </span>
                                                                <span style={{float:"left", marginRight:"5px"}}>
                                                                        <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Female" style={{display:"block",float:"left", marginRight:"5px"}}
                                                                        checked={formData.gender === 'Female'}
                                                                        onChange={handleGenderChange}
                                                                        />{' '}
                                                                        Female
                                                                </span>                                                                    
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                                <input className="form-control" id="email" type="email" placeholder="Enter your email address" name="email" 
                                                                value={formData.email || ''} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                                <input className="form-control" id="inputPhone" type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
                                                            </div> 
                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="address">Address</label>
                                                                <input className="form-control" id="address" type="text"  name="address" value={formData.address || ''} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="suite">Apt/Suite</label>
                                                                <input className="form-control" id="suite" type="text" name="suite" value={formData.suite || ''} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3"> 
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="country">Country</label>
                                                                <input className="form-control" id="country" type="text" name="country" value={formData.country} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="state">State</label>
                                                                <input className="form-control" id="state" type="text" name="state" value={formData.state} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="city">City</label>
                                                                <input className="form-control" id="city" type="text"  name="city" value={formData.city || ''} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="zipcode">Zipcode</label>
                                                                <input className="form-control" id="zipcode" type="text" name="zipcode" value={formData.zipcode || ''} onChange={handleInputChange} />
                                                            </div>
                                                        </div> 
                                                     <div className="row gx-3 mb-3">
                                                          <div className="col-md-6">
                                                               <div className="account_bk_style"> 
                                                                     <p>
                                                                         Learning Accommodations 
                                                                     </p>
                                                                     <p style={{color:"#de3e7e"}}> 
                                                                         Poor eyesight, Dyslexia, Hearing
                                                                     </p>
                                                                     <p  style={{float:"right"}}>
                                                                         <a href="#" onClick={openModal}>
                                                                             Edit
                                                                         </a>
                                                                     </p>
                                                               </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                               <div className="account_bk_style"> 
                                                                     <p>
                                                                         Testing Accommodations  
                                                                     </p>
                                                                     <p style={{color:"#de3e7e"}}> 
                                                                         Poor eyesight, Dyslexia, Hearing
                                                                     </p>
                                                                     <p style={{float:"right"}}>
                                                                         <a href="#" onClick={openModal2}>
                                                                             Edit
                                                                         </a>
                                                                     </p>
                                                               </div>
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
                        )}
                        </React.Fragment>
                    ))}
                    </> 
                    </div>
                </div>
             </div>
        </div>
        {/* Edit Modal */}
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> 
                            <img src="https://www.kabirsprep.com/e264a4c303f23013288f.png"
                            />
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div class="learning_acccommodations">
                                <h5>Choose learning acccommodations</h5>
                                <div>
                                    <ul>
                                        <li>Poor eyesight</li>
                                        <li>Hearing impairments</li>
                                        <li>Dyslexia</li>
                                        <li>Autism</li>
                                        <li>Anxiety/Stress</li>
                                        <li>Depression</li>
                                        <li>ADHD/ADD</li>
                                        <li>Other</li>
                                    </ul>
                                </div>
                                <div class="form-group"> 
                                    <textarea class="other-text form-control"
                                    placeholder="Comments (Optional)"></textarea>
                                    <p>
                                        All learning acccommodations submitted 
                                        will also be visible on any linked parent/guardian accounts
                                    </p>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                        Back
                    </button>
                    <button type="button" className="btn btn-succecss" onClick={closeModal}>
                        Save
                    </button>
                    {/* Add additional buttons or actions if needed */}
                    </div>
                </div>
            </div>
        </div>

        <div
            className={`modal fade ${showModal2 ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal2 ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> 
                            <img src="https://www.kabirsprep.com/e264a4c303f23013288f.png"
                            />
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div class="learning_acccommodations"> 
                                <div class="form-group">  
                                    <h5>Apply for Testing Accommodations</h5>
                                    <p>
                                         You will be asked to upload your 
                                         testing accommodations form from a school, 
                                         testing organization, or physician.
                                    </p>
                                    <p>
                                        All testing accommodations requests 
                                        submitted will also be visible to any linked 
                                        parent/guardian accounts.
                                    </p>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal2}>
                        Never mind
                    </button>
                    <button type="button" className="btn btn-succecss"  onClick={openModal3}>
                            Get Started
                    </button>
                    {/* Add additional buttons or actions if needed */}
                    </div>
                </div>
            </div>
        </div>

        <div
            className={`modal fade ${showModal3 ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal3 ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> 
                            <img src="https://www.kabirsprep.com/e264a4c303f23013288f.png"
                            />
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div class="testing_acccommodations">
                                <h5>Choose the course.</h5>
                                <p>Select one, you can apply for another later.</p>
                                <div>
                                    <ul>
                                        <li>SAT®/PSAT®</li>
                                        <li>ACT®</li> 
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={openModal2}>
                        Back
                    </button>
                    <button type="button" className="btn btn-succecss" onClick={openModal4}>
                            Continue
                    </button>
                    {/* Add additional buttons or actions if needed */}
                    </div>
                </div>
            </div>
        </div>

        <div
            className={`modal fade ${showModal4 ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal4 ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> 
                            <img src="https://www.kabirsprep.com/e264a4c303f23013288f.png"
                            />
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div class="testing_acccommodations">
                                <h5>Select your accommodations.</h5>
                                <p>You may select more than one.</p>
                                <div>
                                    <ul>
                                        <li>
                                            <div className="course-item">
                                            Extended Timing
                                            <div className="timing-options">
                                                <div className="radio timing-option">
                                                <label>
                                                    <input
                                                    type="radio"
                                                    value="1.5"
                                                    checked={selectedTiming === '1.5'}
                                                    onChange={() => handleTimingChange('1.5')}
                                                    /> 
                                                    1.5x
                                                </label>
                                                </div>
                                                <div className="radio timing-option">
                                                <label>
                                                    <input
                                                    type="radio"
                                                    value="2"
                                                    checked={selectedTiming === '2'}
                                                    onChange={() => handleTimingChange('2')}
                                                    /> 
                                                    2x
                                                </label>
                                                </div>
                                                <div className="radio timing-option">
                                                <label>
                                                    <input
                                                    type="radio"
                                                    value="2.5"
                                                    checked={selectedTiming === '2.5'}
                                                    onChange={() => handleTimingChange('2.5')}
                                                    /> 
                                                    2.5x
                                                </label>
                                                </div>
                                            </div>
                                            </div>
                                        </li>
                                        <li>Large text print</li> 
                                        <li>Record answers in text booklet</li> 
                                        <li>Other</li> 
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal4}>
                        Back
                    </button>
                    <button type="button" className="btn btn-succecss" onClick={closeModal4}>
                        Save
                    </button>
                    {/* Add additional buttons or actions if needed */}
                    </div>
                </div>
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
export default Profile;
