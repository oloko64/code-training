import axios from 'axios';
import fs from 'node:fs';
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
async function getData() {
    try {
        const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log(`Async/Await ----> ${result.data.title}`);
    }
    catch (error) {
        console.log(`Async/Await ----> ${error}`);
    }
}
getData();
function sleepSync(ms, index) {
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
        await sleepSync(1000, i);
    }
}
function sleep(ms, index) {
    setTimeout(() => {
        console.log(index);
    }, ms);
}
async function waitFive() {
    for (let i = 0; i < 5; i++) {
        await sleep(3000, i);
    }
}
waitFive();
function readFileTest() {
    return new Promise((resolve, reject) => {
        fs.readFile('./package.json', 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
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
//# sourceMappingURL=promises.js.map