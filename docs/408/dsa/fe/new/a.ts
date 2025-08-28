function myNew(Constructor, ...args) {
    const obj = Object.create(Constructor.prototype)
    const result = Constructor.apply(obj, args)
    return result !== null && (typeof result === 'object' || typeof result === 'function') ? result : obj
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const person = myNew(Person, 'John', 20)
const person2 = new Person('John', 20)
console.log(person)
console.log(person2)