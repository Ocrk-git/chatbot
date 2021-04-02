const redis = require('redis');

const client = redis.createClient();

// // Print redis errors to the console
// client.on('error', (err) => {
//     console.log("Error " + err);
// });

module.exports = client