
drop procedure if exists bill;
delimiter //
CREATE PROCEDURE bill(IN x INT)
BEGIN
drop table if exists billing;
drop view if exists bill;
    CREATE TABLE billing AS
    SELECT
        b.trip_id,
        b.passenger_id,
        p.passenger_username,
        p. passenger_name,
        b.number_of_passenger,
        b.book_time,
        t.departure_time,
        t.departure,
        t.destination,
        b.total_amount
    FROM
        Booking b
    JOIN Trip t ON b.trip_id = t.trip_id
    JOIN Passenger p ON b.passenger_id = p.passenger_id
    WHERE b.passenger_id = x;
    
CREATE VIEW bill AS SELECT * from billing ;
 SELECT
        CASE
            WHEN COUNT(*) > 0 THEN 'Bill found'
            ELSE 'No such passenger'
        END AS status
    FROM bill
    WHERE passenger_id = x;
    SELECT * FROM bill WHERE passenger_id = x;
END//
delimiter ;

