const threadInfo = async (api,event)=>{
      let object;
      object = await api.getThreadInfo(event?.threadID, (err, ret) => {
            if(err) return console.error(err);
            object = ret;
            return object;  
      });
      return object;
}

export default threadInfo;




