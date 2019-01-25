const express = require('express'); //create a function and store it in the const;
const app = express() //call the function and store the result in the const;
const port = process.env.PORT || 3010;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!')); //get the data (incoming request to the server) from root ('/'); req (request) and res (result) are arguments of a callback function;
app.use('/static', express.static('public'));

app.post('/results', (req, res) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    console.log(firstName, lastName);
    for (k in request.headers){
        console.log(k, request.headers[k])
    }
});

console.log('started @' + new Date())
console.log(module)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


