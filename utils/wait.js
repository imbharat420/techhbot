const wait = (ms,api,event) =>{   
      // let indicators = api.sendTypingIndicator(event.threadID,(err)=>{
      //       if(err) return console.log(err);
      // });
      new Promise((r) => setTimeout(r, ms))
};
export default wait;