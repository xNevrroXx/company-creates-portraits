const fs = require("fs");

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, bufferedData) => {
      if(error)
        reject(error);

      resolve(bufferedData);
    })
  })
}

function writeFileAsync(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, () => {
      resolve();
    })
  })
}

module.exports = {readFileAsync, writeFileAsync};