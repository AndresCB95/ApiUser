const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto')

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(token, username) {
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      return !err && username == user
    })
}

function encriptar(user, pass) {
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac
 }

module.exports.generateAccessToken = generateAccessToken;
module.exports.authenticateToken = authenticateToken;
module.exports.encriptar = encriptar;