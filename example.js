const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

// const fileContent = fs.readFileSync(__filename);
// console.log('fileContent', fileContent);

// fs.readFile(__filename, (err, data) => {
  // console.log('async fileContent', data);
// })

readFilePromise(__filename)
  .then((fileData) => {
    console.log(fileData);
  });

console.log('test2');