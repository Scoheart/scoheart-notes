# Parameter Passing Methods Comparison

| Passing Method          | What is passed to the function      | Can modify original value? | Can rebind original variable? | Example Languages         |
|-------------------------|--------------------------------------|-----------------------------|-------------------------------|----------------------------|
| Pass by Value           | A copy of the value                 | ❌ No                      | ❌ No                        | C, Java (primitives), Go   |
| Pass by Reference       | An alias to the original variable   | ✅ Yes                     | ✅ Yes                       | C++ (int&), Rust (&mut)    |
| Pass by Value of Reference | A copy of the reference (address) | ✅ Yes (object content)    | ❌ No                        | Java, Python, JavaScript   |
| Pass by Pointer         | A memory address (explicit pointer) | ✅ Yes                     | ✅ Yes (with double pointer) | C, C++, Go (with `*`)      |

## 📌 Example: Pass by Value of Reference (JavaScript)
```javascript
function update(obj) {
    obj.value = 42;           // ✅ modifies original object
    obj = { value: 99 };      // ❌ rebinding does NOT affect original
}
let x = { value: 1 };
update(x);
console.log(x.value);  // Output: 42