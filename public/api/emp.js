const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

const Pool = require('pg').Pool;
const { response } = require("express");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'kttelematic',
    port: 5432,
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

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
        console.log(JSON.stringify(obj));
    } catch (err) {
        res.status(200).send(err);
    }
});
