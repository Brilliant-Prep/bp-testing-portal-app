import React, { Fragment } from "react"; 
import SHeaderbar from "../Components/Navbar/Header.js";
import SFooterbar from "../Components/Navbar/Footer.js";
import EditTopic from "../Components/ActSubTopic/EditTopic";

function EditActSubTopicPage() {
  return (
    <div> 
    <SHeaderbar/>
    <div class="app-wrapper">	    
	    <div class="app-content pt-3">
           <div class="container-xl">
                 <EditTopic />
           </div>
	    </div>
	    <SFooterbar/>
    </div>
    </div>
  );
}

export default EditActSubTopicPage;
