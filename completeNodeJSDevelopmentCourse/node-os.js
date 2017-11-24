console.log("Opened File!");

const os = require('os');

var user = os.userInfo();

console.log("Hello " + user.username);