```js 
// https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal
// /https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal
// https://stackoverflow.com/questions/61440104/killing-a-child-process-after-10-seconds-nodejs
setTimeout(() => {
  wc.kill("SIGINFO")
}, 10*1000, 0)
```