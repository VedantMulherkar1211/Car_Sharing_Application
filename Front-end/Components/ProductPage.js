import React, { useState, useEffect } from 'react';

function RideBookingForm() {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [totalPassengers, setTotalPassengers] = useState(1);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [billAmount, setBillAmount] = useState(0);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    const calculateBill = () => {
        const baseFarePerPassenger = 500;
        const totalBill = totalPassengers * baseFarePerPassenger;
        setBillAmount(totalBill);
    };

    return (
        <div style={{ color: 'blue' }} className="container-sm mt-4 bg-light p-4 rounded d-flex flex-column align-items-center bodyWithBackground">
            <h1 className="mb-4">Booking</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="departure" className="form-label">Departure:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="departure"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="destination" className="form-label">Destination:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="totalPassengers" className="form-label">Total Passengers:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalPassengers"
                        value={totalPassengers}
                        onChange={(e) => setTotalPassengers(parseInt(e.target.value, 10))}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="driverSelect" className="form-label">Select Driver:</label>
                    <select
                        className="form-select"
                        id="driverSelect"
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        required
                    >
                        <option value="">Select a Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="button" className="btn btn-primary" onClick={calculateBill}>
                    Calculate Bill
                </button>
            </form>

            <h2 className="mt-4">Bill: Rs.{billAmount}</h2>
        </div>
    );
};

export default RideBookingForm;
