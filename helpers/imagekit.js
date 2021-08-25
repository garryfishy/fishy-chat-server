const axios = require('axios')
const FormData = require('form-data')
const baseUrl = "https://upload.imagekit.io/api/v1/files/upload"

async function getUrl(imageName, buffer){
    const dataApiKey = new Buffer.from(process.env.codeimagekit +":").toString('base64')
    const formData = new FormData()
    formData.append("file", buffer)
    formData.append("fileName", `${imageName}`)
    const response = await axios.post(baseUrl, formData, {headers: {
        ...formData.getHeaders(),
        "Authorization": `Basic ${dataApiKey}`
    }})
    return response.data
}

module.exports = getUrl