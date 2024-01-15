import React from 'react';
import './Login.css';

export default function AboutUs() {
    return (
        <div
            className="opacity-1 bg-secondary-subtle "
            style={{
                backgroundImage: `url('7178884.jpg')`, // Replace with the actual path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'black',
            }}
        >
            <div className="about-header">
                <h1>Car Pooling System</h1>
                <p className="about-subtitle">Connecting People, Sharing Rides</p>
            </div>

            <div className="about-section">
                <h2>What is Carpooling?</h2>
                <p className="about-description">
                    Carpooling is a transportation arrangement where multiple individuals share a single vehicle to travel together, typically to and from work or other common destinations. In carpooling, participants take turns driving or share the cost of transportation, contributing to a more efficient use of vehicles and resources.
                </p>
            </div>

            <div className="about-section">
                <h2>Problem Statement</h2>
                <ul className="about-list">
                    <li>Create an efficient relational database for carpooling system?</li>
                    <li>Growing demand for car-sharing services.</li>
                    <li>Huge market for car sharing application.</li>
                    <li>Need a robust and efficient database.</li>
                    <li>Data generated in real-time during ridesharing activities.</li>
                    <li>Our schema is tailored to ensure seamless data management, retrieval, and overall system efficiency.</li>
                </ul>
            </div>

            <div className="about-section">
                <h2>Our Vision</h2>
                <p className="about-description">
                    Our vision is to create a sustainable and efficient carpooling system that enhances the commuting experience, reduces traffic congestion, and contributes to a greener environment.
                </p>
            </div>
        </div>
    );
}
