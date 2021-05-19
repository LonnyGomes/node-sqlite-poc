const fs = require('fs');

const cols = 'c,m,y,k,r,g,b\n';
const COUNT = 10_000_000;

const stream = fs.createWriteStream(`input.csv`);

const rand = (max) => {
    return Math.round(Math.random() * max);
};
stream.write(cols);

for (let idx = 0; idx < COUNT; idx += 1) {
    stream.write(
        `${rand(100)},${rand(100)},${rand(100)},${rand(100)},${rand(
            255
        )},${rand(255)},${rand(255)}\n`
    );
}

stream.end();
