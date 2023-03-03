import download from "../utils/download"

export default function  Music(api:any,event:any){
    const {body,threadID,messageID,attachments} = event

    if(attachments.length == 0) return api.sendMessage("Vui lòng gửi file nhạc",threadID,messageID)
    const type = attachments[0].type == "audio" ? "audio" : "video"
    const url = attachments[0].url
}

