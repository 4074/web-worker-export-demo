// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;
console.log(2222)
// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    console.log(event)
    ctx.postMessage({ foo: "foo" });
});

export {}