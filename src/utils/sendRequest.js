const axios = require('axios')

const sendRequest = async(options) =>{
    const result = await axios(options)
    console.log(result)
}


module.exports = sendRequest