const dotenv = require('dotenv');
const user_repository = require("../../repository/security/UserRepository")
const encryptar = require("../security/JwtService")

process.env.TOKEN_SECRET_USER;

async function authenticateUser(user) {
    var {username , password } = get_user_encript(user);

    user = await user_repository.validation_user(username, password)
    
    return user
}

async function registre_user(user) {
    var {username , password } = get_user_encript(user);
    
    user = await user_repository.registre_user(username, password)
    
    return user
}


function get_user_encript(user) {
    const username = encryptar.encriptar(user.password, user.username);
    const password = encryptar.encriptar(user.username, user.password);
    return {username, password}
}

module.exports.authenticateUser = authenticateUser;
module.exports.registre_user = registre_user;
