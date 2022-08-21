const test = (str) => {
    console.log(str);
};
const log = console.log;
const values = {
    a: 1,
    b: 2,
    c: 3,
    sum: function () {
        return this.a + this.b + this.c;
    }
};
const arr = [1, 1, 1, 1, 1];
for await (const i of arr) {
    log(i);
}
(function () {
    log('hi');
})();
log(arr);
export {};
//# sourceMappingURL=test.js.map