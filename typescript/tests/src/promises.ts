import axios from 'axios'
import fs from 'node:fs'

// Promises are a way to handle asynchronous code.
async function promises (): Promise<string | number> {
  return await new Promise((resolve) => {
    const n1 = 6
    const n2 = 4
    if (n1 > n2) {
      setTimeout(() => {
        resolve(n1 + n2)
      }, 1000)
    } else {
      throw new Error('Error')
    }
  })
}

// Async/Await
async function asyncAwait (): Promise<void> {
  try {
    const result = await promises()
    console.log(`Async/Await ----> ${result}`)
  } catch (error) {
    console.log(`Async/Await ----> ${error}`)
  }
}

console.log('Start Promise')
promises()
  .then((result) => {
    console.log(`Promise -----> ${result}`)
  })
  .catch((error) => {
    console.log(`Promise -----> ${error}`)
  })
console.log('End Promise')

console.log('Start Async/Await')
asyncAwait()
console.log('End Async/Await')

// #############################################################################
// #############################################################################

async function getData (): Promise<void> {
  try {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    console.log(`Async/Await ----> ${result.data.title}`)
  } catch (error) {
    console.log(`Async/Await ----> ${error}`)
  }
}

getData()

// #################################################################
// Same code synchronous and asynchronous
// #################################################################

async function sleepSync (ms: number, index: number): Promise<void> {
  // If you want to return a value
  // const test = Promise.resolve(Math.random());
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(index)
      return resolve()
    }, ms)
  })
  return await promise
}

async function waitFiveSync () {
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    await sleepSync(1000, i)
  }
}

// This will be synchronous
// waitFiveSync();

function sleep (ms: number, index: number): void {
  setTimeout(() => {
    console.log(index)
  }, ms)
}

async function waitFive () {
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(3000, i)
  }
}

// This will be asynchronous
waitFive()

async function readFileTest (): Promise<string> {
  return await new Promise((resolve, reject) => {
    fs.readFile('./package.json', 'utf8', (error, data) => {
      if (error != null) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })

  // const file = Promise.resolve(
  //   fs.readFileSync('.eslintignore'),
  // );
  // return file;
}

const test = async () => {
  try {
    const result = await readFileTest()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

// test();

const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const waitLoops = async () => {
  await Promise.resolve()
  for (let i = 0; i <= 1000000000; i++) {
    if (i === 1000000000) {
      console.log(`Loops: ${i}`)
    }
  }
}

const waitLoopsThen = async () => await Promise.resolve().then(() => {
  for (let i = 0; i <= 1000000000; i++) {
    if (i === 1000000000) {
      console.log(`Loops: ${i}`)
    }
  }
})

const arr = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

const test1 = async () => {
  await Promise.resolve()
  for (let i = 0; i < 100_000_000_0; i++) {
    if (i === 100_000_000_0 - 1) {
      console.log('loop')
      return 3
    }
  }
}

const test2 = async () => {
  return await Promise.resolve().then(() => {
    for (let i = 0; i < 100_000_000_0; i++) {
      if (i === 100_000_000_0 - 1) {
        console.log('loop')
        return 3
      }
    }
  }).catch(() => {
    console.log('error')
    return null
  })
}

console.log('start')
const v = test2()
console.log('end')
console.log(await v)

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
