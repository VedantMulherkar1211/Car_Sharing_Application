drop procedure InsertPassenger;
drop procedure UpdatePassenger;

drop procedure InsertDriver;
drop procedure UpdateDriver;

drop procedure InsertVehicle;
drop trigger check_driver_id;

drop procedure InsertTrip;
drop trigger tr_check_trip_driver;

drop procedure InsertBooking;
drop function CalculateTotalAmountForTrip;
drop trigger tr_check_trip_booking_data;
drop procedure cancel_booking;
drop trigger update_available_seats_trigger;

drop procedure InsertFeedback;




-- Stored procedure for inserting data into the Passenger table

DELIMITER //

CREATE PROCEDURE InsertPassenger(
    IN p_username VARCHAR(50),
    IN p_name VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_date_of_birth DATE,
    IN p_gender CHAR(1),
    IN p_address VARCHAR(255),
    IN p_phone_number VARCHAR(10)
)
BEGIN
    INSERT INTO Passenger (
        passenger_username,
        passenger_name,
        passenger_password,
        passenger_email,
        passenger_date_of_birth,
        passenger_gender,
        passenger_phone_number,
        passenger_registration_date_time
    ) VALUES (
        p_username,
        p_name,
        p_password,
        p_email,
        p_date_of_birth,
        p_gender,
        p_phone_number,
        NOW() 
    );
END //

DELIMITER ;




-- Stored procedure for Updating data into the Passenger table

DELIMITER //

CREATE PROCEDURE UpdatePassenger(
    IN p_passenger_id INT,
    IN p_passenger_username VARCHAR(50),
    IN p_passenger_name VARCHAR(50),
    IN p_passenger_password VARCHAR(50),
    IN p_passenger_email VARCHAR(50),
    IN p_passenger_date_of_birth DATE,
    IN p_passenger_gender CHAR(1),
    IN p_passenger_phone_number VARCHAR(10)
)
BEGIN
    UPDATE Passenger
    SET
        passenger_username = p_passenger_username,
        passenger_name = p_passenger_name,
        passenger_password = p_passenger_password,
        passenger_email = p_passenger_email,
        passenger_date_of_birth = p_passenger_date_of_birth,
        passenger_gender = p_passenger_gender,
        passenger_phone_number = p_passenger_phone_number
    WHERE
        passenger_id = p_passenger_id;
END //

DELIMITER ;




DELIMITER //

CREATE PROCEDURE InsertDriver(
    IN p_driver_username VARCHAR(50),
    IN p_driver_name VARCHAR(100),
    IN p_driver_password VARCHAR(50),
    IN p_driver_email VARCHAR(50),
    IN p_driver_date_of_birth DATE,
    IN p_driver_gender CHAR(1),
    IN p_driver_mobile VARCHAR(10),
    IN p_driver_address VARCHAR(255),
    IN p_driver_licence VARCHAR(20)
)
BEGIN
    INSERT INTO Driver (
        driver_username,
        driver_name,
        driver_password,
        driver_email,
        driver_date_of_birth,
        driver_gender,
        driver_mobile,
        driver_address,
        driver_licence,
        driver_registration_date_time
    ) VALUES (
        p_driver_username,
        p_driver_name,
        p_driver_password,
        p_driver_email,
        p_driver_date_of_birth,
        p_driver_gender,
        p_driver_mobile,
        p_driver_address,
        p_driver_licence,
        NOW() -- Assuming you want to use the current date and time for registration
    );
END //

DELIMITER ;




DELIMITER //

CREATE PROCEDURE UpdateDriver(
    IN p_driver_id INT,
    IN p_driver_username VARCHAR(50),
    IN p_driver_name VARCHAR(100),
    IN p_driver_password VARCHAR(50),
    IN p_driver_email VARCHAR(50),
    IN p_driver_date_of_birth DATE,
    IN p_driver_gender CHAR(1),
    IN p_driver_mobile VARCHAR(10),
    IN p_driver_address VARCHAR(255),
    IN p_driver_licence VARCHAR(20)
)
BEGIN
    UPDATE Driver
    SET
        driver_username = p_driver_username,
        driver_name = p_driver_name,
        driver_password = p_driver_password,
        driver_email = p_driver_email,
        driver_date_of_birth = p_driver_date_of_birth,
        driver_gender = p_driver_gender,
        driver_mobile = p_driver_mobile,
        driver_address = p_driver_address,
        driver_licence = p_driver_licence
    WHERE driver_id = p_driver_id;
END //

DELIMITER ;




--  procedure for insert data into vehicle table

DELIMITER //

CREATE PROCEDURE InsertVehicle(
    IN p_DriverId INT,
    IN p_Company VARCHAR(255),
    IN p_Type VARCHAR(255),
    IN p_Description TEXT,
    IN p_LicensePlate VARCHAR(15)
)
BEGIN
    -- Insert into Vehicles table
    INSERT INTO Vehicles (car_DriverId, car_company, car_type, car_description, LicensePlate)
    VALUES (p_DriverId, p_Company, p_Type, p_Description, p_LicensePlate);
END //

DELIMITER ;




-- Trigger  call after insert on Vehicles it check driver id of vehicle table and driver id of driver table

DELIMITER //
CREATE TRIGGER check_driver_id
AFTER INSERT ON Vehicles
FOR EACH ROW
BEGIN
    DECLARE driverCount INT;

    SELECT COUNT(*) INTO driverCount
    FROM Driver
    WHERE driver_id = NEW.car_DriverId;

    IF driverCount = 0 THEN
        DELETE FROM Vehicles
	WHERE car_DriverId = NEW.car_DriverId;
    END IF;
END;
//
DELIMITER ;






--  procedure for insert data into trip table

DELIMITER //

CREATE PROCEDURE InsertTrip(
    IN p_driver_id INT,
    IN p_departure VARCHAR(255),
    IN p_destination VARCHAR(255),
    IN p_departure_time DATETIME,
    IN p_amount_per_seat DECIMAL(7, 2),
    IN p_available_seats INT
)
BEGIN
    INSERT INTO Trip (driver_id, departure, destination, departure_time, amount_per_seat, available_seats)
    VALUES (p_driver_id, p_departure, p_destination, p_departure_time, p_amount_per_seat, p_available_seats);
END //

DELIMITER ;


-- Trigger  call after insert on trip it check driver id of trip table and driver id of driver table

DELIMITER //
CREATE TRIGGER tr_check_trip_driver
AFTER INSERT ON Trip
FOR EACH ROW
BEGIN
    DECLARE driver_count INT;

    -- Check if the driver_id exists in the Driver table
    SELECT COUNT(*) INTO driver_count
    FROM Driver
    WHERE driver_id = NEW.driver_id;

    -- If the driver_id doesn't exist, delete the newly inserted row in the Trip table
    IF driver_count = 0 THEN
        DELETE FROM Trip WHERE trip_id = NEW.trip_id;
    END IF;
END;
//
DELIMITER ;




--  procedure for insert data into booking table

DELIMITER //
CREATE PROCEDURE InsertBooking(
    IN p_trip_id INT,
    IN p_passenger_id INT,
    IN p_number_of_passenger INT
)
BEGIN
    DECLARE p_amount_per_seat DECIMAL(7, 2);
    DECLARE t_amount DECIMAL(7, 2);

    -- Get the amount_per_seat from the Trip table
    SELECT amount_per_seat INTO p_amount_per_seat
    FROM Trip
    WHERE trip_id = p_trip_id;

    -- Calculate total amount using the function
    SET t_amount = CalculateTotalAmountForTrip(p_amount_per_seat, p_number_of_passenger);

    -- Insert into Booking table with calculated total_amount
    INSERT INTO Booking (trip_id, passenger_id, number_of_passenger, book_time, total_amount)
    VALUES (p_trip_id, p_passenger_id, p_number_of_passenger, NOW(), t_amount);
END //
DELIMITER ;



-- this function calculate total amount


DELIMITER //
CREATE FUNCTION CalculateTotalAmountForTrip(amount INT, passengers INT)
RETURNS DECIMAL(7, 2)
DETERMINISTIC
BEGIN
    DECLARE total_amount DECIMAL(7, 2);

    SET total_amount = amount * passengers;

    RETURN total_amount;
END //
DELIMITER ;




-- using trigger for checking before updating into Booking table if trip_id exist and passenger_id exist
DELIMITER //

CREATE TRIGGER tr_check_trip_booking_data
BEFORE INSERT ON Booking
FOR EACH ROW
BEGIN
    DECLARE v_trip_exists INT;
    DECLARE v_passenger_exists INT;

    SELECT COUNT(*) INTO v_trip_exists
    FROM Trip
    WHERE trip_id = NEW.trip_id;

    SELECT COUNT(*) INTO v_passenger_exists
    FROM Passenger
    WHERE passenger_id = NEW.passenger_id;

    IF v_trip_exists = 0 OR v_passenger_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid trip_id or passenger_id';
    ELSE
        UPDATE Trip
        SET available_seats = available_seats - NEW.number_of_passenger
        WHERE trip_id = NEW.trip_id;
    END IF;
END //

DELIMITER ;




DELIMITER //

CREATE PROCEDURE cancel_booking(IN in_booking_id INT)
BEGIN
    DELETE FROM Booking WHERE booking_id = in_booking_id;
END //

DELIMITER ;





-- trigger used before deletion into booking table and updatation in trip table according to avaiable_seats which is calculated with available_seats and seats_to_release
DELIMITER //

CREATE TRIGGER update_available_seats_trigger
BEFORE DELETE ON Booking
FOR EACH ROW
BEGIN
    DECLARE seats_to_release INT;
    
    -- Get the number of seats to release based on the canceled booking
    SELECT number_of_passenger INTO seats_to_release
    FROM Booking
    WHERE booking_id = OLD.booking_id;
    
    -- Update available_seats in Trip table
    UPDATE Trip
    SET available_seats = available_seats + seats_to_release
    WHERE trip_id = (SELECT trip_id FROM Booking WHERE booking_id = OLD.booking_id);
END //

DELIMITER ;





DELIMITER //

CREATE PROCEDURE InsertFeedback(
    IN in_passenger_id INT,
    IN in_trip_id INT,
    IN in_driver_id INT,
    IN in_feedback VARCHAR(255),
    IN in_rating INT
)
BEGIN
    INSERT INTO Feedback (
        passenger_id,
        trip_id,
        driver_id,
        feedback,
        rating
    ) VALUES (
        in_passenger_id,
        in_trip_id,
        in_driver_id,
        in_feedback,
        in_rating
    );
END //

DELIMITER ;








