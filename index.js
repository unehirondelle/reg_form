const express = require('express'); //create a function and store it in the const;
const app = express(); //call the function and store the result in the const;
const port = process.env.PORT || 3000; //set the environment variable
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/reg_form_db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the reg_form_db database.');
});

/*enable parsing of json objects in a body of a request to execute the POST method
(it's disabled by default):*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //use the part of middleware in the app


app.set("views", "./views");
app.set("view engine", "pug");
app.post('/search', (req, res) => {
    let criterion = req.body.criterion;
    criterion = ('%' + criterion + '%').toUpperCase();
    let sqlResults = [];
    db.all("select * from users where upper(firstName) like ? " +
        "UNION ALL select * from users where upper(lastName) like ?", [criterion, criterion], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        for (k in rows){
            var row = rows[k];
            sqlResults.push(row);
        }
        res.render('index', {rows: sqlResults,
            criterion: req.body.criterion,
            error: err});
    });
});

app.get('/search', function (req, res) {
    res.render('index', {});
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');});//make the default page
/*app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname + "/public/"});
});*/ //make the default page; this piece of code with (!) piece of code doesn't allow to get the local links for js and css



app.get('/', (req, res) => res.send('Hello World!!'));
/*get the data (incoming request to the server) from root ('/');
req (request) and res (result) are arguments of a callback function;*/

/*app.use('/static', express.static('public'));*/ //(!) wrong code, doesn't allow to get local links for js and css0=
app.use(express.static(__dirname + "/public"));

app.post('/saveResults', function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    console.log(firstName, lastName);
    db.run('INSERT INTO users(firstName, lastName) VALUES(?, ?)', [firstName, lastName], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log('A row has been inserted with rowid ${this.lastID}');
    });
    db.all("select * from users", (err, results)=>{
console.log(results);

    });

    res.send("The new user has been registered!");
});

app.get('/getResults', (req, res) => {
    var _output = [];
    db.serialize(() => {
        db.all(`SELECT firstName as id,
                  lastName as name
           FROM users`, (err, rows) => {
            if (err) {
                console.error(err.message);
            }

            for (k in rows){
                var row = rows[k];
                console.log('>>' + row.id + "\t" + row.name);
                _output.push(row);
            }
            //res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(_output));
            res.send();
        });
    });
});

console.log('started @' + new Date());



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });



