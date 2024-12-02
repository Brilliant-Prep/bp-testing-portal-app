import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import AddTopic from "../Components/Topic/AddTopic";

function AddTopicPage() {
  return ( 
    <div> 
      <SHeaderbar/>
      <div class="app-wrapper">	    
        <div class="app-content pt-3">
            <div class="container-xl">
                  <AddTopic />
            </div>
        </div>
        <SFooterbar/>
      </div>
    </div> 
  );
} 
export default AddTopicPage;
