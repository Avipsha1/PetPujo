import React from "react";
import "./About.css";
import { assets } from "../../assets/assets"; 

const About = () => {
  return (
    <div className="about">
      <div className="about-top">
        <img
          src={assets.logo}
          alt="Doctors"
          className="about-img"
        />

        <div className="about-content">
          <h2>Welcome to UniEats</h2>
          <p>
            <strong>UniEats</strong> is a modern digital food court platform designed to simplify the way you explore and enjoy meals from multiple food outlets in one place. It allows users to browse a wide variety of cuisines, check menus, compare prices, and place quick takeaway orders with ease. With its user-friendly design and efficient ordering system.
          </p>

          <p>
            UniEats enhances your campus or workplace dining experience by reducing wait times and improving convenience. Our goal is to bring together quality food, smart technology, and seamless service to make every meal more accessible and enjoyable. At UniEats, great taste meets simplicity.
          </p>

          <h3>Our Vision</h3>
          <p>
            At UniEats, our vision is to revolutionize the food court experience by creating a unified digital platform that blends convenience, technology, and taste. We aim to make food ordering smarter and faster, empowering users to explore diverse cuisines and enjoy effortless access to their favorite meals.
          </p>
        </div>
      </div>

      <div className="why-choose-us">
        <h2>
          WHY <span>CHOOSE US</span>
        </h2>

        <div className="choose-grid">
          <div className="choose-card">
            <h4>Smart & Easy to Use:</h4>
            <p>
              UniEats offers a smooth, modern interface that makes browsing 
              and ordering from your favorite food court stalls simple and quick.
            </p>
          </div>

          <div className="choose-card">
            <h4>Real Time Updates:</h4>
            <p>
              et instant updates on menu availability, offers, and order status 
              — no more waiting in long queues or confusion about what’s available.
            </p>
          </div>

          <div className="choose-card">
            <h4>Made for Students:</h4>
            <p>
              Built by students, UniEats understands campus life. 
              It’s designed to save your time, match your taste, and make your food court experience effortless.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
