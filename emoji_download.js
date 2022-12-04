const getEmojis = () =>{
      // const CONTAINER = document.querySelector(".EMOJI-CONTAINER");
      const ROWS =  document.querySelectorAll("div[role=rowgroup]");
      const DATA = [...new Array(ROWS.length)].map((_,i)=>{
            const elem = ROWS[i]
            const label = elem.getAttribute("aria-label");
            const emojis = elem.querySelectorAll("div[role=gridcell]");
            return [...new Array(emojis.length)].map((_,ii)=>{
                  const img = emojis[ii].querySelector("img");
                  return {
                        label,
                        alt: img.getAttribute("alt"),
                        src: img.getAttribute("src")
                  }
            })
      })

      const OBJDATA = {}

      for(const group of DATA){
            for(const obj of group){
                  const {label,src,alt} = obj;
                  if(OBJDATA[obj.label] && Array.isArray(OBJDATA[label])){
                        OBJDATA[label].push({src,alt});
                  }else{
                        OBJDATA[label] = [{src,alt}]
                  }
            }
      }
      return OBJDATA; //this return ObjData 
};

const EMO = getEmojis();
const EMOTICONS = getEmojis();

const getSrc = (arr) =>{
      return JSON.stringify(arr.map((src)=>src));
}
for(const pair of Object.entries(EMO)){
      console.assert(pair[0]+":");
      console.log(getSrc(pair[1]))
}

for(const pair of Object.entries(EMOTICONS)){
      pair[1] = pair[1].map(obj=>{
            obj["src"] = obj["src"].slice(obj["src"].lastIndexOf("/")+1)
            return obj;
      })
}

 