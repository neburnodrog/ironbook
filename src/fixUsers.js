const users = require('./users.json');
const { v4: uuidv4 } = require('uuid');
users.map(user => (user.id = uuidv4()));
console.log(JSON.stringify(users));
