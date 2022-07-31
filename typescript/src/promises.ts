import axios from 'axios';
import fs from 'node:fs';

// Promises are a way to handle asynchronous code.
function promises(): Promise<string | number> {
  return new Promise((resolve) => {
    const n1 = 6;
    const n2 = 4;
    if (n1 > n2) {
      setTimeout(() => {
        resolve(n1 + n2);
      }, 1000);
    } else {
      throw new Error('Error');
    }
  });
}

// Async/Await
async function asyncAwait(): Promise<void> {
  try {
    const result = await promises();
    console.log(`Async/Await ----> ${result}`);
  } catch (error) {
    console.log(`Async/Await ----> ${error}`);
  }
}

console.log('Start Promise');
promises()
  .then((result) => {
    console.log(`Promise -----> ${result}`);
  })
  .catch((error) => {
    console.log(`Promise -----> ${error}`);
  });
console.log('End Promise');

console.log('Start Async/Await');
asyncAwait();
console.log('End Async/Await');

// #############################################################################
// #############################################################################

async function getData(): Promise<void> {
  try {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    console.log(`Async/Await ----> ${result.data.title}`);
  } catch (error) {
    console.log(`Async/Await ----> ${error}`);
  }
}

getData();

// #################################################################
// Same code synchronous and asynchronous
// #################################################################

function sleepSync(ms: number, index: number): Promise<void> {
  // If you want to return a value
  // const test = Promise.resolve(Math.random());
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(index);
      return resolve();
    }, ms);
  });
  return promise;
}

async function waitFiveSync() {
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    await sleepSync(1000, i);
  }
}

// This will be synchronous
waitFiveSync();

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
waitFive();

function readFileTest(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile('./package.json', 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  // const file = Promise.resolve(
  //   fs.readFileSync('.eslintignore'),
  // );
  // return file;
}

const test = async () => {
  try {
    const result = await readFileTest();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

test();
