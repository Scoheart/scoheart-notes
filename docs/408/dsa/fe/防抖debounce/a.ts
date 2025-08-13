function debounce(fn, delay) {
    let timerId;
    return function (fn, delay) {
        clearTimeout(timerId);
        setTimeout(fn, delay);
    }
}