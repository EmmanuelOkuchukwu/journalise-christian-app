import React from 'react';
import JesusCross from '../assets/art-2092530_1920.jpg';
import Dashboard from '../assets/speed-4028234_1920.jpg';
import PrayerTime from '../assets/prayer-1308663_1920.jpg';
import Connect from '../assets/contact-us-2993000_1920.jpg';
import '../scss/home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <div className="banner">
                <img className="img-banner" src={JesusCross} alt="The Cross" width="600" height="400" />
            </div>
            <div className="card-group">
                <div className="card">
                    <img className="img-card" src={Dashboard} alt="Dashboard" width="600" height="400" />
                    <div className="card-body">
                        <h2>Profile</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eaque eos et exercitationem laudantium nam nihil, nulla obcaecati placeat repellendus sed soluta. Accusamus expedita itaque natus omnis perferendis saepe voluptatum.</p>
                        <button className="info-btn">Visit Now!</button>
                    </div>
                </div>
                <div className="card">
                    <img className="img-card" src={PrayerTime} alt="Dashboard" width="600" height="400" />
                    <div className="card-body">
                        <h2>Prayer Requests</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eaque eos et exercitationem laudantium nam nihil, nulla obcaecati placeat repellendus sed soluta. Accusamus expedita itaque natus omnis perferendis saepe voluptatum.</p>
                        <button className="info-btn">Visit Now!</button>
                    </div>
                </div>
                <div className="card">
                    <img className="img-card" src={Connect} alt="Dashboard" width="600" height="400" />
                    <div className="card-body">
                        <h2>Learn More</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eaque eos et exercitationem laudantium nam nihil, nulla obcaecati placeat repellendus sed soluta. Accusamus expedita itaque natus omnis perferendis saepe voluptatum.</p>
                        <button className="info-btn">Visit Now!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
