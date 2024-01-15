drop table Vehicles;
drop table Feedback;
drop table Booking;
drop table Trip;
drop table Passenger;
drop table Driver;




CREATE TABLE Passenger(
    passenger_id INT AUTO_INCREMENT PRIMARY KEY,
    passenger_username VARCHAR(50) NOT NULL UNIQUE,
    passenger_name VARCHAR(50) NOT NULL,
    passenger_password VARCHAR(50) NOT NULL,
    passenger_email VARCHAR(50) NOT NULL UNIQUE,
    passenger_date_of_birth DATE NOT NULL,
    passenger_gender CHAR(1) NOT NULL,
    passenger_phone_number VARCHAR(10) NOT NULL UNIQUE ,
    passenger_registration_date_time datetime
);




CREATE TABLE Driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_username VARCHAR(50) NOT NULL UNIQUE,
    driver_name VARCHAR(100) NOT NULL,
    driver_password VARCHAR(50) NOT NULL,
    driver_email VARCHAR(50) NOT NULL,
    driver_date_of_birth DATE NOT NULL,
    driver_gender CHAR(1) NOT NULL,
    driver_mobile VARCHAR(10) NOT NULL,
    driver_address VARCHAR(255) NOT NULL,
    driver_licence VARCHAR(20) NOT NULL UNIQUE,
    driver_registration_date_time datetime
   
);




CREATE TABLE Vehicles (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    car_DriverId INT,
    car_company VARCHAR(255) NOT NULL,
    car_type VARCHAR(255) NOT NULL,
    car_description TEXT,
    LicensePlate VARCHAR(15),
    CONSTRAINT fk_car_customer FOREIGN KEY (car_DriverId) REFERENCES Driver(driver_id) on delete set null on update set null
);




CREATE TABLE Trip (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    departure VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_time DATETIME NOT NULL,
    amount_per_seat DECIMAL(7, 2),
    available_seats INT,
    CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) on delete set null on update set null
);



CREATE TABLE Booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    passenger_id INT,
    number_of_passenger INT CHECK (number_of_passenger > 0),
    book_time datetime,
    total_amount decimal(7,2),
    CONSTRAINT fk_trip FOREIGN KEY (trip_id) REFERENCES Trip(trip_id) on delete set null on update set null, 
    CONSTRAINT fk_passenger FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id) on delete set null on update set null
);


CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    passenger_id INT,
    trip_id INT,
    driver_id INT,
    feedback VARCHAR(255) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    feedback_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_passenger_feedback FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id) on delete set null on update set null,
    CONSTRAINT fk_trip_feedback FOREIGN KEY (trip_id) REFERENCES Trip(trip_id) on delete set null on update set null,
    CONSTRAINT fk_driver_feedback FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) on delete set null on update set null
);
