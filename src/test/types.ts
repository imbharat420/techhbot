export interface ERROR {
    response: {
        data: string;
        status: number;
    };
    request: string;
    message: string;
}


export  interface PM_RESPONSE {
    id:string,
    url:string,
    url_secure:string,
    width:number,
    height:number,
    expires_at:string
} 
  

export interface DOWNLOAD_ARG {
    location?: string;
    url?: string;
    filepath?: string;
    fileName?: string;
    effectId?: string;
}
