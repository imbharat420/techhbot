let count = 1;
let running = false;

let loopMsg = (api,event) => {
  let txt = event.body.split(" ");
  let tId = txt[1]
  let time = parseInt(txt[2])
  let total = parseInt(txt[3])
  let inter = setInterval(() => {  
      running = true
      api.sendMessage(`count: ${count}`, tId)
      console.log(count,txt)
      count++
      if (count == parseInt(total)) {
            clearTimeout(inter)
            running = false
      } 
  }, time*1000)
}

export default loopMsg;