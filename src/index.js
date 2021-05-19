const fs = require('fs');
const parse = require('csv-parse');

const INPUT_FILE = 'input.csv';

const output = [];
// Create the parser
const parser = parse({
    columns: true,
});

// Use the readable stream api
parser.on('readable', function () {
    let record;
    while ((record = parser.read())) {
        // output.push(record)
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

// Write data to the stream
const inputStream = fs.createReadStream(INPUT_FILE);
inputStream.pipe(parser);
// Close the readable stream
