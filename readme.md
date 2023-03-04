```js 
// https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal
// /https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal
// https://stackoverflow.com/questions/61440104/killing-a-child-process-after-10-seconds-nodejs
setTimeout(() => {
  wc.kill("SIGINFO")
}, 10*1000, 0)
```


```js
//send by link


  const url = 'https://preview.redd.it/jcqql8h8x1351.jpg?width=640&crop=smart&auto=webp&s=61148c911a1d5155e7d1451105d18241671cf5f0';

https.get(url).on('response', (stream) => {
  api.sendMessage({ attachment: [stream] }, event.threadID);
});
```