function debounce(fn, delay) {
    let timerId = null;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function a() {
    console.log("a");
}

const test = debounce(a, 3000)



for(var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100)
}