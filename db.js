var sqlite3 = require('sqlite3').verbose()
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