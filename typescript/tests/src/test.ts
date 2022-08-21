const test = (str: string) => {
  console.log(str)
}

const log = console.log

// setInterval(() => test('hi'), 1000)

const values = {
  a: 1,
  b: 2,
  c: 3,
  sum: function () {
    return this.a + this.b + this.c
  }
}

const arr = [1, 1, 1, 1, 1]

for await (const i of arr) {
  log(i)
}

// Anonymous function
(function () {
  log('hi')
})()

log(arr)

export { }
// log('end')

// log(values.sum())
