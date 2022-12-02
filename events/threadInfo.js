let getData = (api,event)=>{
      return new Promise((resolve, reject) => {
            api.getThreadInfo(event?.threadID, (err, ret) => {
                  if(err) reject(err);
                  resolve(ret)
            });
      });
}

const threadInfo = async (api,event)=>{
      let data = await getData(api,event)
      return data;
}

export default threadInfo;




