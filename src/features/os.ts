import os from 'os';
import process from 'process';
import request from 'request';
import v8 from 'v8';
const OSInfo = () => {
  const uptime = os.uptime();
  const processUptime = process.uptime();
  const totalmem = os.totalmem();
  const freemem = os.freemem();

  const cpuCount = os.cpus().length;
  const cpuModel = os.cpus()[0].model;
  const cpuSpeed = os.cpus()[0].speed;

  let message = '';
  message += '◆ Process: ' + secondsToTime(processUptime) + '\n';
  message += '◆ CPU: ' + cpuCount + 'x ' + cpuModel + ' @ ' + cpuSpeed + 'MHz' + '\n';

  message += '◆ OS: ' + os.type() + ' ' + os.release() + ' ' + os.arch() + '\n';

  message += '◆ CPU Speed: ' + os.cpus()[0].speed + 'MHz' + '\n';

  message += '◆ Total Memory: ' + formatBytes(os.totalmem()) + '\n';
  message += '◆ Free Memory: ' + formatBytes(os.freemem() / (1024 * 1024)) + '\n';

  message += '◆ CPU Count: ' + os.cpus().length + '\n';
  message += '◆ CPU Model: ' + os.cpus()[0].model + '\n';

  message += '◆ ROM Memory: ' + formatBytes(os.totalmem()) + '\n';
  message += '◆ Total Available RAM: ' + formatBytes(os.freemem() / (1024 * 1024)) + '\n';
  message += '◆ Total Heap Size(V8) ' + formatBytes(v8.getHeapStatistics().total_heap_size) + '\n';
  message += '◆ Total Available Size(V8) ' + formatBytes(v8.getHeapStatistics().total_available_size) + '\n';
  message += '◆ Used Heap Size(V8) ' + formatBytes(v8.getHeapStatistics().used_heap_size) + '\n';
  return message;
};

export default OSInfo;

/*
  const usedmem = totalmem - freemem;
  const cpuUsage = os.loadavg()[0] * 100;
const cpuTimes = os.cpus()[0].times;
  const cpuUser = cpuTimes.user;
  const cpuNice = cpuTimes.nice;
  const cpuSys = cpuTimes.sys;
  const cpuIdle = cpuTimes.idle;
  const cpuIrq = cpuTimes.irq;
  const cpuLoad = os.loadavg();
  const cpuLoad1 = cpuLoad[0];
  const cpuLoad5 = cpuLoad[1];
  const cpuLoad15 = cpuLoad[2];
  const cpuLoadUser = cpuLoad[3];
  const cpuLoadSystem = cpuLoad[4];
  const cpuLoadNice = cpuLoad[5];
  const cpuLoadIdle = cpuLoad[6];
  const cpuLoadIrq = cpuLoad[7];

  message += '◆ Type: ' + os.type() + '\n';
  message += '◆ Uptime: ' + os.uptime() + '\n';
  message += '◆ Release: ' + os.release() + '\n';
  message += '◆ CPU Usage: ' + cpuUsage + '%' + '\n';
  message += '◆ CPU Load: ' + cpuLoad1 + ' ' + cpuLoad5 + ' ' + cpuLoad15 + '\n';
  message += '◆ Load Average: ' + os.loadavg().join(', ') + '\n';
 message += '◆ Total Memory: ' + Math.round((os.totalmem() / 1024 / 1024) * 100) / 100 + 'MB' + '\n';
  message += '◆ Platform: ' + os.platform() + '\n';
  message += '◆ Load Average: ' + os.loadavg().join(', ') + '\n';
  message += '◆ CPU Speed: ' + os.cpus()[0].speed + 'MHz' + '\n';
  message += '◆ Hostname: ' + os.hostname() + '\n';
  message += '◆ Platform: ' + os.platform() + '\n';
  message += '◆ CPU Times: ' + JSON.stringify(os.cpus()[0].times) + '\n';
  message += '◆ Home Directory: ' + os.homedir() + '\n';
  message += '◆ Temp Directory: ' + os.tmpdir() + '\n';
    message += '◆ CPU Model: ' + os.cpus()[0].model + '\n';
  message += '◆ Network Interfaces: ' + JSON.stringify(os.networkInterfaces()) + '\n';
  message += '◆ EOL: ' + os.EOL + '\n';
  message += '◆ Arch: ' + os.arch() + '\n';
    message += '◆ CPU Times: ' + JSON.stringify(os.cpus()[0].times) + '\n';
      message += '◆ Endianness: ' + os.endianness() + '\n';


    message +=
    '◆ CPU Load (User/System/Nice/Idle/Irq): ' +
    cpuLoadUser +
    ' ' +
    cpuLoadSystem +
    ' ' +
    cpuLoadNice +
    ' ' +
    cpuLoadIdle +
    ' ' +
    cpuLoadIrq +
    '\n';
  message += '◆ Hostname: ' + os.hostname() + '\n';
    message +=
    '◆ CPU Times (User/Nice/Sys/Idle/Irq): ' +
    cpuUser +
    ' ' +
    cpuNice +
    ' ' +
    cpuSys +
    ' ' +
    cpuIdle +
    ' ' +
    cpuIrq +
    '\n';
  message +=
    '◆ Memory: ' +
    Math.round((usedmem / 1024 / 1024) * 100) / 100 +
    'MB / ' +
    Math.round((totalmem / 1024 / 1024) * 100) / 100 +
    'MB' +
    '\n';
*/
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const secondsToTime1 = (seconds: any) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  return hours + 'h ' + minutes + 'm ' + remainingSeconds + 's';
};
function formatUptime(uptime: number): string {
  const seconds = Math.floor(uptime);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}, ${hours % 24} hour${hours % 24 > 1 ? 's' : ''}, ${minutes % 60} minute${
      minutes % 60 > 1 ? 's' : ''
    }, ${seconds % 60} second${seconds % 60 > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 > 1 ? 's' : ''}, ${
      seconds % 60
    } second${seconds % 60 > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}, ${seconds % 60} second${seconds % 60 > 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
}

function secondsToTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  const remainingSeconds = Math.floor(((seconds % 86400) % 3600) % 60);

  let timeString = '';
  if (days > 0) {
    timeString += `${days} day${days > 1 ? 's' : ''}, `;
  }
  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? 's' : ''}, `;
  }
  if (minutes > 0) {
    timeString += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
  }
  timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;

  return timeString;
}

/*

    if (isGoingToFast(event)) {
            return;
        }
        let serverAverage = 0;
        let osAverage = 0;
        for (time in settings.uptime.server) {
            serverAverage += settings.uptime.server[time];
        }
        osAverage = settings.uptime.os;
        if (osAverage > os.uptime()) {
            osAverage += os.uptime();
        } else {
            osAverage = os.uptime();
        }
        serverAverage += process.uptime();
        let message =
            `
_____  Uptime  _____

   ⦿ Server: ` +
            secondsToTime(process.uptime()) +
            `
   ⦿ Server (Average): ` +
            secondsToTime(serverAverage / 7) +
            `
   ⦿ OS: ` +
            secondsToTime(os.uptime()) +
            `
   ⦿ OS (Average): ` +
            secondsToTime(osAverage / 7) +
            `
_____________________
`;

_____  Uptime  _____

   ⦿ Server: 57 minutes and 31 seconds.
   ⦿ Server (Average): 9 hours, 46 minutes and 54 seconds.
   ⦿ OS: 22 hours, 13 minutes and 25 seconds.
   ⦿ OS (Average): 1131 hours, 50 minutes and 51 seconds.
_____________________



_____  System Info  _____

   ⦿ Server Date: 3/14/2023, 7:41:19 PM
   ⦿ Server Protocol: http(s) with SSL
   ⦿ Server Uptime: 3 minutes and 11 seconds.
   ⦿ Server Location: The Philippines
   ⦿ CPU: Intel(R) Celeron(R) N4000 CPU @ 1.10GHz x2
   ⦿ CPU Usage: 20%
   ⦿ OS: Linux x64 v5.19.0-32-generic
   ⦿ OS Uptime: 22 hours, 38 minutes and 40 seconds.
   ⦿ RAM: 2.0 GB/3.7 GB
   ⦿ ROM: 385.1 MB/32GB
   ⦿ RSS: 223.5 MB
   ⦿ Heap: 149.7 MB/154.1 MB
   ⦿ External: 6.4 MB
   ⦿ Array Buffers: 5.5 MB
   ⦿ Average Load: 3%
   ⦿ Save State: No data
   ⦿ Fb State: No data
   ⦿ Ping State: No data
   ⦿ Git State: No data
   ⦿ Blocked: False
   ⦿ Crash: 0 crash caught
___________________________
*/
