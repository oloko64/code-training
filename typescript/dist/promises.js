"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
// Promises are a way to handle asynchronous code.
function promises() {
    return new Promise((resolve) => {
        const n1 = 6;
        const n2 = 4;
        if (n1 > n2) {
            setTimeout(() => {
                resolve(n1 + n2);
            }, 1000);
        }
        else {
            throw new Error('Error');
        }
    });
}
// Async/Await
async function asyncAwait() {
    try {
        const result = await promises();
        console.log(`Async/Await ----> ${result}`);
    }
    catch (error) {
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
async function getData() {
    try {
        const result = await axios_1.default.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log(`Async/Await ----> ${result.data.title}`);
    }
    catch (error) {
        console.log(`Async/Await ----> ${error}`);
    }
}
getData();
// #################################################################
// Same code synchronous and asynchronous
// #################################################################
function sleepSync(ms, index) {
    // If you want to return a value
    // const test = Promise.resolve(Math.random());
    const promise = new Promise((resolve) => {
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
// waitFiveSync();
function sleep(ms, index) {
    setTimeout(() => {
        console.log(index);
    }, ms);
}
async function waitFive() {
    for (let i = 0; i < 5; i++) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(3000, i);
    }
}
// This will be asynchronous
waitFive();
function readFileTest() {
    return new Promise((resolve, reject) => {
        node_fs_1.default.readFile('./package.json', 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            else {
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
    }
    catch (error) {
        console.log(error);
    }
};
// test();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitLoops = async () => {
    await Promise.resolve();
    for (let i = 0; i <= 1000000000; i++) {
        if (i === 1000000000) {
            console.log(`Loops: ${i}`);
        }
    }
};
const waitLoopsThen = () => Promise.resolve().then(() => {
    for (let i = 0; i <= 1000000000; i++) {
        if (i === 1000000000) {
            console.log(`Loops: ${i}`);
        }
    }
});
// async function waitLoops2() {
//     for (let i = 0; i <= 1000000000; i++) {
//         if (i === 1000000000) {
//         console.log("Loops: " + i);
//         }
//     }
// }
// const waitLoops2 = async () => {
//   for (let i = 0; i <= 100000000; i++) {
//     if (i === 100000000) {
//       console.log("Loops: " + i);
//     }
//   }
// };
// console.log("Iniciando...");
// await delay(5000);
// waitLoops();
// console.log("Aguardando...");
