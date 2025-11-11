# Async/Await

> ECMAScript 2017 (ES8)

## 概述

`async/await` 是基于 Promise 的语法糖,使异步代码看起来像同步代码。

## 基本语法

```javascript
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

## 示例

```javascript
// 使用 async/await
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
  }
}

// 等价的 Promise 代码
function getUserData(id) {
  return fetchUser(id)
    .then(user => fetchUserPosts(user.id)
      .then(posts => ({ user, posts })))
    .catch(error => console.error('Error:', error));
}
```

## 参考资料

- [MDN - async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
