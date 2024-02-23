
const insert = async (collection,documentolist)=>{
    console.log(documentolist)

    await collection.insertMany(documentolist)
    .then(
        (respuesta)=>{
            console.log("Inserto los documentos")
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            throw error
        }
    )

    return "Documento insertados"
}


async function find_one(collection,filtro){

    let resultado = {}

    await collection.findOne(filtro)
    .then(
        (respuesta)=>{
            resultado = respuesta
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            throw error
        }
    )

    return resultado
}

const close_client = async (client)=>{

    await client.close()

}


module.exports.insert = insert;
module.exports.find_one = find_one;
module.exports.close_client = close_client;
