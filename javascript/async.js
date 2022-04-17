const interval = setInterval(intervalFunc, 1000)
setTimeout(timeoutFunc, 5000)

let time = 1

function intervalFunc() {
    console.log(`Time passed ${time++} sec`)
    if (time > 5) {
        clearInterval(interval)
    }
}

function timeoutFunc() {
    console.log('5 sec timeout')
}
