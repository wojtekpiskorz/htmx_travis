import express from "express";
import fetch from "node-fetch";


const app = express();

// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Parse JSON bodies (as sent by API clients)

app.use(express.json());

// Handle GET request to fetch users

app.get("/users", async (req, res) => {
  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Smith" },
  //   { id: 3, name: "Josh Adult" },
  // ];

  setTimeout(async () => {

    const limit = req.query.limit || 10;


    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    const users = await response.json();

    res.send(`
    <h1 class="text-2xl text-center">Users</h1>
    <ul>
    ${users.map((user) => `<li>${user.name}</li>`).join("")}
    </ul>
    `)
  }, 1000);
});

// Handle POST request for temp conversion 

app.post("/convert", (req, res) => {
  setTimeout(() => {

    const fahrenheit = parseFloat(req.body.fahrenheit);

    const celsius = (fahrenheit - 32) * (5 / 9);

    res.send(`
    <p>
    ${fahrenheit}°F = ${celsius.toFixed(2)}°C
    </p>
    `)

  }, 1500);
});

// start the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});