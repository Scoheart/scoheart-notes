const req = new Request("https://postman-echo.com/get");
const res = await fetch(req);
const data = await res.json();
console.log(data);
