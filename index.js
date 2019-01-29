const express = require('express'); //create a function and store it in the const;
const app = express(); //call the function and store the result in the const;
const port = process.env.PORT || 3000; //set the environment variable
const sqlite3 = require('sqlite3').verbose()

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/public/" } );
}); //make the default page

/*enable parsing of json objects in a body of a request to execute the POST method
(it's disabled by default):*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //use the part of middleware in the app


app.get('/', (req, res) => res.send('Hello World!!'));
/*get the data (incoming request to the server) from root ('/');
req (request) and res (result) are arguments of a callback function;*/

app.use ('/static', express.static('public'));

app.post('/results', function (request, response) {
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    console.log(firstName, lastName);
    for (k in request.headers){
        console.log(k, request.headers[k]);
    }
});

console.log('started @' + new Date())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var db = new sqlite3.Database('./db/reg_form_db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the reg_form_db database.');
});

db.serialize(() => {
    db.each(`SELECT firstName as id,
                  lastName as name
           FROM users`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.name);
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});

