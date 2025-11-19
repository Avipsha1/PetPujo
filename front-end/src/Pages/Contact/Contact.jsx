import React from "react";
import "./Contact.css";
import { assets } from "../../assets/assets";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>
        CONTACT <span>US</span>
      </h2>

      <div className="contact-content">
        {/* === Left Side Image === */}
        <div className="contact-image">
          <img src={assets.contact} alt="Food" />
        </div>

        {/* === Right Side Info === */}
        <div className="contact-info">
          <div className="office-info">
            <h3>OUR OFFICE</h3>
            <p>
              398, Ramkrishnapur Road, Barasat,<br />
              Near Jagadighata Market,<br />
              Kolkata, West Bengal 700125
            </p>
            <p>
              <strong>Tel:</strong> (415) 555-0132
              <br />
              <strong>Email:</strong> unieats@gmail.com
            </p>
          </div>

          <div className="career-info">
            <h3>CAREERS AT UniEats</h3>
            <p>Learn more about us and job openings.</p>
            <button className="explore-btn">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
