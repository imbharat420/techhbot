"use strict";
exports.__esModule = true;
// config();
// import * as download from './test/photomania.js'
//  async function a(){
//       var {location} = await download({
//         url:"http://api.photomania.net/photos/39904107619fd239e58c7a51b2e09533.jpg", 
//         filepath:"img", 
//         fileName:"me.png"
//       }) 
//       var loc = await filter({
//             location,
//             effectId: '520fdb6592237be077cf99eb',
//       })   
//       console.log(loc) 
// } 
// a()  
// console.log("Hello World")
// let configListener = {
//    listenEvents: true,
//    autoMarkDelivery: false,
//    selfListen: true,
// };
// let login = { appState: JSON.parse(fs.readFileSync('./src/login/bhaon', 'utf8')) };
// let ulogin = { email: process.env.USERNAME, password: process.env.PASSWORD };
// fca(login, async (err:any, api:any) => {
//    if (err) return console.error(err);
//    await api.setOptions(configListener);
//    const listenEmitter = api.listen(async (err:any, event:any) => {
//       if (err) return console.log(err);
//       switch(event.type) {
//          case 'message':
//             if(event.body !== '' && event.attachments !== [].length) {
//                if(event.body.startsWith ('!filter')) {
//                    filterFunc(api,event);
//                }
//             }
//             if (event.body === 'ping') {
//                api.sendMessage('pong', event.threadID);
//             }
//             break;
//          case 'event':
//             console.log(event);
//             break;
//       }
//    });
// });
