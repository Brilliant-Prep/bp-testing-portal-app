// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
         <div className="column footer_first">
              sunitha.rishi2012@gmail.com
        </div>
        <div className="column">
            {/* Content for the second column */}
        </div>
        <div className="column footer_last">
            <div class="row">
                <div className="col">
                    <button className="btn btn-primary back_button">Back</button>
                    {" "}
                    <button className="btn btn-primary next_button">Next</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;
