const http = require('http');

const bufferedResult = [];

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  headers: {
    // accept: 'text/html',
    accept: 'application/json',
  }
};

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