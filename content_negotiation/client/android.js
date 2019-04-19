const http = require('http');

const bufferedResult = [];

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'post',
  headers: {
    // accept: 'text/html',
    accept: 'application/json',
    'Content-type': 'application/json',
  }
};

/*
http.get(options, (res) => {
  res.on('data', (chunk) => {
    bufferedResult.push(chunk);
  });

  res.on('end', () => {
    console.log(
      Buffer.concat(bufferedResult).toString()
    );
  });
});
*/

const html = 'nome=Luis'; //x-www-form-urlencoded
const json = {nome: 'Luis'};
const string_json = JSON.stringify(json);

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    bufferedResult.push(chunk);
  });

  res.on('end', () => {
    console.log(
      Buffer.concat(bufferedResult).toString()
    );
  });
});

req.write(string_json);
req.end();