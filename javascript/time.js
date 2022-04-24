let timestamp = Date.now();
let count = 0;

setInterval(() => {
  timeFunc();
}, 1000);

function timeFunc() {
  const dateVal = new Date(timestamp).toLocaleTimeString();
  timestamp = timestamp + 1000;
  count++;
  console.log(`Time Passed: ${count}s`);
  console.log(`Current Time: ${dateVal}\n`);
}
