

const unsendMessage = async (api,event)=>{
      let {messageID} = event;

      console.log("this is from Message Unsend Event");
      let msg = await api.unsendMessage(messageID,(err)=>{
            if(err) return console.log(err);
            console.log("api.unsendMessage(messageID");
      });
      console.log("this is unsend by",msg);
}


export default unsendMessage;