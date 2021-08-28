const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'kttelematic',
  port: 5432,
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.set('view engine', 'jade') // sets the view engine 
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'))// sets the view directory

app.get('/', (req, res) => {
  res.render('index', { title: "Home" }) // render view file on this endpoint
});

app.get('/emp_entry', function (req, res) {
  res.render('emp_entry', { title: "Emp Entry" });
});

app.get('/about', function (req, res) {
  res.render('about', { title: "About" });
});

app.get('/contact', function (req, res) {
  res.render('contact', { title: "Contact" });
});

app.post('/addEmp', urlencodedParser, async function (req, res) {
  let empid = req.body.empid;
  let fname = req.body.fname;
  let username = req.body.username;
  let place = req.body.place;

  var query = "INSERT INTO emp VALUES (" + empid;
  query += ", '" + fname + "', ";
  query += "'" + username + "', ";
  query += "'" + place + "') ";

  pool.query(query), (error, results) => {
    if (error) {
      throw error
    }
  }
  res.render('emp_entry', { title: "Emp Entry" });
});

app.get('/getEmpList', async (req, res) => {
  try {
    let resp = await pool.query('SELECT * FROM emp');
    res.setHeader('Content-Type', 'application/json');
    var obj = { "response": resp.rows };
    res.end(JSON.stringify(obj));
  } catch (err) {
    res.status(200).send(err);
  }
});

app.get('/getEmpDet/:emp_id', async (req, res) => {
  try {
    const emp_id = req.params.emp_id;

    let resp = await pool.query('SELECT * FROM emp WHERE emp_id = ' + emp_id);
    res.setHeader('Content-Type', 'application/json');
    var obj = { "emp": resp.rows[0], "success": true };
    res.end(JSON.stringify(obj));

  } catch (err) {
    res.status(200).send(err);
  }
});

app.put('/updateEmp', urlencodedParser, async function (req, res) {
  let empid = req.body.empid;
  let fname = req.body.fname;
  let username = req.body.username;
  let place = req.body.place;

  var query = "UPDATE emp SET ";
  query += "emp_name = '" + fname + "', ";
  query += "user_name = '" + username + "', ";
  query += "place = '" + place + "' ";
  query += "WHERE emp_id = " + empid;

  pool.query(query), (error, results) => {
    if (error) {
      throw error
    }
  }
  res.render('emp_entry', { title: "Emp Entry" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});