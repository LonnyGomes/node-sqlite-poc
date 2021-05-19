const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const parse = require('csv-parse');

const INPUT_FILE = 'input.csv';

const db = new sqlite3.Database('colors.db');

const initDb = (dbRef) => {
    dbRef.serialize(function () {
        dbRef.run(`CREATE TABLE IF NOT EXISTS colors (
      c INT,
      m INT,
      y INT,
      k INT,
      r INT,
      g INT,
      b INT)`);
          //PRIMARY KEY(c,m,y,k))`);
    });
};

// Create the parser
const parser = parse({
    columns: false,
    cast: true,
});

// Use the readable stream api
parser.on('readable', function () {
    let record;
    while ((record = parser.read())) {
        db.run('INSERT INTO colors VALUES (?, ?, ?, ?, ?, ?, ?)', record);
    }
});
// Catch any error
parser.on('error', function (err) {
    console.error(err.message);
});
// When we are done, close out connection
parser.on('end', function () {
    //parser.end();
    console.log('finished');
});

// initialize db
initDb(db);

// Write data to the stream
const inputStream = fs.createReadStream(INPUT_FILE);
inputStream.pipe(parser);

