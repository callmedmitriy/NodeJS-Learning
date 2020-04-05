/*
  TASK 1.1
  Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.
    •The program should be started from npmscript via nodemon(i.e. npm run task1).
    •The program should be running in a stand-by mode and should not be terminated after the first-stringprocessing.
*/


/* const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  console.log(input.split("").reverse().join(""));
});*/


/*
  TASK 1.2 
  Write a program which should do the following:
    •Read the content of csvfile from./csvdirectory. Example: https://epa.ms/nodejs19-hw1-ex1
    •Use the csvtojsonpackage (https://github.com/Keyang/node-csvtojson) to convert csvfile to jsonobject.
    •Write the csvfile content to a new txtfile.Use the following format: https://epa.ms/nodejs19-hw1-ex2.
    •Do not load all the content of the csvfile into RAM via stream (read/write file content line by line).
    •In case of read/write errors, log them in the console.
*/

const fs = require('fs');
const filePath = './csv/data.csv';
const csvtojson = require('csvtojson');

// Example one 
/* 
csvtojson({
  trim: true,
  delimiter: ';',
})
  .fromFile(filePath)
  .then((jsonObj) => fs.writeFileSync("./data.json",JSON.stringify(jsonObj)))
  .catch((error) => console.log(error.message));
 */

// Example two
/* fs.readFile(filePath,'utf8',(error,data) => {
  if (error) throw error.message;
  fs.writeFileSync("./data.json",data);
}) */

// Example three 
/* const readline = require('readline');
async function processLineByLine() {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const writable = fs.createWriteStream('./data.json','utf8');
  for await (const line of rl) {
    writable.write(`${line}\n`);
  }
  writable.end();
}
processLineByLine(); */

// Example four


const rStream = fs.createReadStream(filePath, {
  highWaterMark: 10
});

let data = '';

rStream.on('data', (chunk) => {
  data = data + chunk.toString();
})

rStream.on('close', () => {
  csvtojson({
    delimiter: ';',
  })
    .fromString(data)
    .then((jsonObj) => fs.writeFileSync("./data.json",JSON.stringify(jsonObj, null, ' ')))
    .catch((error) => console.log(error.message));
});