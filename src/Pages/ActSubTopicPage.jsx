import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import TopicList from "../Components/ActSubTopic/TopicList";

function ActSubTopicPage() {
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

export default ActSubTopicPage; 
