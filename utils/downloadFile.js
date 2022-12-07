const Path = require('path')
const  fs = require("fs")
const Axios = require("axios")

const downloadFile = async (currentReturnUrl, name, isLast = false)=> {
    console.log(currentReturnUrl,name);
    let dirpos = __dirname + '/imgs'
    let path = Path.join(dirpos, name);
    Axios({
        method: 'GET',
        url: currentReturnUrl,
        responseType: 'stream'
    }).then(async function(response){ 
        let f = await fs.createWriteStream(path);
        response.data.pipe(f);
        return true;
    }).catch(err=>{
        console.log(err)
        return false;
    });
}

module.exports = downloadFile