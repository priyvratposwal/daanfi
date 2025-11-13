console.log("hi");
console.log("hi");
console.log("hi");
console.log("hi");
console.log("hi");
setTimeout(() => {
    console.log("hi")
    Math.floor(Math.random() * 10);
}, 1000);
console.log("hi");


//callbaack

function callback(func: () => void) {
    setTimeout(() => {
        func();
    }, 1000);
}

callback(() => {
    console.log("hi");
});