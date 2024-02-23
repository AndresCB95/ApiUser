const conn = require("./Conexion")
const dotenv = require('dotenv');
const mongoService = require("./mongoDbService")

// get config vars
dotenv.config();


async function validation_user(username, password){
    var user = {}
    const {client, collection} = await get_conexion()
        await mongoService.find_one(collection, {username: username, password:password}).then(
            (respuesta) =>{
                user = respuesta
            }
        )
        await mongoService.close_client(client)
    return user
}


async function registre_user(username, password){
    var user = {}
    var resp = ""
    const {client, collection} = await get_conexion()
    const save_objetc = [{"username": username, "password":password}]
        await mongoService.insert(collection, save_objetc).then(
            (respuesta) =>{
                resp = respuesta
            }
        )
        const filtro = {"username":username,"password":password}
        user = await mongoService.find_one(collection,filtro)
        await mongoService.close_client(client)
    return user
}

async function get_conexion(){
    const client = await conn.get_client()
    const collection = await conn.get_collection(client)
    return {client, collection}
}


module.exports.validation_user = validation_user;
module.exports.registre_user = registre_user;