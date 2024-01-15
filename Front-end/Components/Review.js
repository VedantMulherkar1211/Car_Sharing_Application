import { useEffect, useState } from "react";
import './Login.css';
export default function YourComponent() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:9000/review");
                const data = await response.json();

                // Assuming the response is an array of reviews
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                color: 'blue',
                backgroundImage: `url('7178884.jpg')`, // Replace with the actual path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
            className="container mt-4 p-4 rounded d-flex flex-column align-items-center"
        >
            <h1 className="opacity-10 bg-primary-subtle fs-1 text text-danger"> Reviews </h1>
            <table className="table table-bordered table-striped table-hover">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Review ID</th>
                        <th>Passenger ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.review_id}>
                            <td>{review.review_id}</td>
                            <td>{review.passenger_id}</td>
                            <td>{review.passenger_username}</td>
                            <td>{review.passenger_name}</td>
                            <td>{review.passenger_review}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
