// const {filter} = require('./test/photomania');
// const filterFunc = (api:any,event:any)=>{
//         let {
//             attachments,
//             body,
//             threadID
//         } = event.body;
//         let effectId = body.split(' ')[1];
//         let filepath = `./src/images/${threadID}`;
//         let url = event.attachments[0].url;
//         filter({
//             url: attachments[0].url,
//             filepath: filepath,
//             fileName: 'test.png',
//             effectId: '520fdb6592237be077cf99eb',
//         }).then((location:string)=>{
//             api.sendMessage({
//                 body:"",
//                 attachment:fs.createReadStream(location)
//             },event.threadID,event.messageID)
//         });
// }
// module.exports = filterFunc
