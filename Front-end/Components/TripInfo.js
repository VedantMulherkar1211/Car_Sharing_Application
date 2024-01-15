import { useState } from "react";
import { useEffect } from "react";



function TripInfo() {


    useEffect(() => {
        fetch("http://localhost:9000/tripDetails")
            .then(resp => resp.json())
            .then(data => TakeUser(data))
    })

    const [us, TakeUser] = useState([]);

    return (

        <div style={{ color: 'blue' }} className="container-sm mt-4 bg-light p-4 rounded d-flex flex-column align-items-center bodyWithBackground">

            <h1 className="opacity-10 bg-primary-subtle fs-1 text text-danger"> Trips Information </h1>
            <table className="table table-bordered table-striped table-hover">
                <thead className="bg-dark text-light">
                    <tr>
                        <th> Trip Id </th>
                        <th> Driver Id </th>
                        <th> Departure </th>
                        <th> Destination </th>
                        <th> Departure Time </th>
                        <th> Amount Per Seat </th>
                        <th> Available Seats </th>
                    </tr>

                    {

                        us.map((v) => {
                            return (
                                <tr>
                                    <td> {v.trip_id} </td>
                                    <td> {v.driver_id} </td>
                                    <td> {v.departure} </td>
                                    <td> {v.destination} </td>
                                    <td> {v.departure_time} </td>
                                    <td> {v.amount_per_seat} </td>
                                    <td> {v.available_seats} </td>
                                </tr>

                            )

                        })


                    }
                </thead>
            </table>

        </div>


    )
}

export default TripInfo;