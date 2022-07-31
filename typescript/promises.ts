import axios from "axios";

// Promises are a way to handle asynchronous code.
function promises(): Promise<string | number> {
  return new Promise((resolve, reject) => {
    let n1 = 6;
    let n2 = 4;
    if (n1 > n2) {
      setTimeout(() => {
        resolve(n1 + n2);
      }, 1000);
    } else {
      reject("Fails");
    }
  });
}

// Async/Await
async function asyncAwait(): Promise<void> {
  try {
    let result = await promises();
    console.log("Async/Await ----> " + result);
  } catch (error) {
    console.log("Async/Await ----> " + error);
  }
}

console.log("Start Promise");
promises()
  .then((result) => {
    console.log("Promise -----> " + result);
  })
  .catch((error) => {
    console.log("Promise -----> " + error);
  });
console.log("End Promise");

console.log("Start Async/Await");
asyncAwait();
console.log("End Async/Await");

// #############################################################################
// #############################################################################

async function getData(): Promise<void> {
  try {
    let result = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log("Async/Await ----> " + result.data.title);
  } catch (error) {
    console.log("Async/Await ----> " + error);
  }
}

getData();

// #################################################################
// Same code synchronous and asynchronous
// #################################################################

function sleepSync(ms: number, index: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(index);
      return resolve();
    }, ms)
  );
};

async function waitFiveSync() {
  for (let i = 0; i < 5; i++) {
    await sleepSync(1000, i);
  }
}

// This will be synchronous
// waitFiveSync();

function sleep(ms: number, index: number): void {
  setTimeout(() => {
    console.log(index);
  }, ms);
}

function waitFive() {
  for (let i = 0; i < 5; i++) {
    sleep(3000, i);
  }
}

// This will be asynchronous
// waitFive();
