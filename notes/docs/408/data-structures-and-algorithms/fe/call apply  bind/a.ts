Function.prototype.myCall = function (context, ...args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context, args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myBind = function (context, ...args) {
    const self = this
    return function (...newArgs) {
        return self.apply(context, args.concat(newArgs))
    }
}

function test() {
    console.log(this.name)
}

test.myCall({ name: 'sdfdsfdsf' }, 'a', 'b', 'c')