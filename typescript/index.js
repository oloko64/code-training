"use strict";
// Promises are a way to handle asynchronous code.
function promises() {
    return new Promise((resolve, reject) => {
        let n1 = 6;
        let n2 = 4;
        if (n1 > n2) {
            setTimeout(() => {
                resolve(n1 + n2);
            }, 1000);
        }
        else {
            reject("Fails");
        }
    });
}
// Async/Await
async function asyncAwait() {
    try {
        let result = await promises();
        console.log("Async/Await ----> " + result);
    }
    catch (error) {
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
