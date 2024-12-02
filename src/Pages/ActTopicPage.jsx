import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import TopicList from "../Components/ActTopic/TopicList";

function ActTopicPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <TopicList />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default ActTopicPage; 
