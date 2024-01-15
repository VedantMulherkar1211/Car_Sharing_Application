import React, { useState } from 'react';
// import Feedback from './feedback';
// import Review from './Review';
import Registration from './RegistrationForm';
import Logout from './LoginForm';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const [activeTab, setActiveTab] = useState('booking');
    const mystate = useSelector(state => state.logged);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <img src="7178884.jpg" class="img-fluid" alt="Responsive image"></img>

            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <h1><span className="navbar-brand">Car Pooling</span></h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-dark" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className={`navbar-brand mb-0 h1 nav-item`} >
                                <Link to="/tripinfo" className="nav-link">Show Trip</Link>
                            </li>
                            <li className={`navbar-brand mb-0 h1 nav-item `} >
                                <Link to="/review" className="nav-link">Review</Link>
                            </li>
                            <li className={`navbar-brand mb-0 h1 nav-item `} >
                                <Link to="/aboutUs" className="nav-link">About us</Link>
                            </li>
                            <li className={`navbar-brand mb-0 h1 nav-item `}>
                                <Link to="/logout" className="nav-link">LOGOUT</Link>
                            </li>
                        </ul>
                        <Outlet />

                    </div>
                </div>
            </nav>


            <div className="container mt-5">

            </div>

        </div>
    );
};

export default Navbar;


// <div className="container mt-4">
// {/* {activeTab === 'Review' && <Review />}
// {activeTab === 'feedback' && <Feedback />}
// {activeTab === 'registration' && <Registration />} */}
// {activeTab === 'logout' && <Logout />}
// </div>
