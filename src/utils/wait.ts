const wait = (ms:number):void =>{   
    new Promise((r) => setTimeout(r, ms))
};
export default wait;  