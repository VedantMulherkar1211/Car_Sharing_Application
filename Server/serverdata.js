const ex = require('express');
const sql = require('mysql2');
var cor = require('cors');
var bdp = require('body-parser');


var app = ex();

app.use(cor());
app.use(bdp.json());

var con = sql.createConnection(
  {

    host: "localhost",
    user: "root",
    password: "root",
    database: "car_pooling"
  }
)

con.connect(function (err) {
  if (!err)
    console.log("connected")
  else
    console.log("Fail")
});


app.listen(9000, function () {

  console.log(" 9000 Server Start")

})

app.post('/registerPassenger', function (req, res) {

  var username = req.body.pusername;
  var name = req.body.pname;
  var password = req.body.ppassword;
  var email = req.body.pemail;
  var dateOfBirth = req.body.pdateOfBirth;
  var gender = req.body.pgender;
  var phoneNumber = req.body.pphoneNumber;
  var address = req.body.paddress;



  var query = "CALL InsertPassenger(?, ?, ?, ?, ?, ?, ?, ?)";

  con.query(query, [username, name, password, email, dateOfBirth, gender, address, phoneNumber], function (err) {

    if (!err) {
      res.send('Passenger inserted successfully');
    } else {
      console.error('Error:', err);
      res.status(500).send('Internal server error');
    }

  });

});



app.post('/insertLogin', function (req, res) {


  var email = req.body.pemail;
  var password = req.body.passw;

  var qu = "SELECT * FROM passenger WHERE passenger_email = ? AND passenger_password = ?"

  con.query(qu, [email, password], function (err, result) {

    if (!err) {
      if (result.length > 0) {
        // Valid credentials
        res.send('Login successful');
      } else {
        // Invalid credentials
        res.send('Invalid email or password');
      }
    }
    else {
      console.error('Error:', err);
      res.status(500).send('Internal server error');
    }

  })


})

app.post('/updatePassword', function (req, res) {

  var password = req.body.passw;
  var email = req.body.pemail;

  var qu = "UPDATE Passenger SET passenger_password = ? WHERE passenger_email = ?"

  con.query(qu, [password, email], function (err, result) {

    if (!err) {
      if (result.affectedRows > 0) {
        // Valid credentials
        res.send('password change successful');
      } else {
        // Invalid credentials
        res.send('Invalid email id');
      }
    }
    else {
      console.error('Error:', err);
      res.status(500).send('Internal server error');
    }

  })


})


app.get('/tripDetails', function (req, res) {

  con.query("select * from trip", function (err, result) {

    if (!err) {
      res.json(result);
    }

  })

})


//--------------------------------------------------------------------------------------

app.get('/review', function (req, res) {
  var qu = "SELECT * FROM review";

  con.query(qu, function (err, results) {
    if (!err) {
      res.json(results);
    } else {
      console.error('Error fetching reviews:', err);
      res.status(500).send("Failed to fetch reviews");
    }
  });
});

app.all('*', function (req, res) {
  res.send("Wrong URL");
});



