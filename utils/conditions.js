
let badWords = ["sex","boobs","nude","vagina"];
let check = (type,event)=> {
      let checked = {
          hasAttachment: event?.attachment !== undefined && event?.attachment.length !==0,
          body: typeof(event?.body) === 'string',
          bigBody: event?.body.length > 10,
                  isBad: badWords.some((word)=> event?.body.indexOf(word) >= 0) 
      }
      return checked[type];
} 

let bodyCheck = (arr,event)=>{
      return arr.filter(type =>check(type,event));
}



export {
      check,
      bodyCheck,
}