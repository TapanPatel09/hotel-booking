const express = require("express");
const app = express();


//users
// Index – Get all users
app.get("/users", (req, res) => {
  res.send("GET for users");
});

// Show – Get a specific user
app.get("/users/:id", (req, res) => {
  res.send("GET for user id");
});

// Create – Add a new user
app.post("/users", (req, res) => {
  res.send("POST for users");
});

// Delete – Remove a user
app.delete("/users/:id", (req, res) => {
  res.send("DELETE for user id");
});

// post
// Index – Get all users
app.get("/post", (req, res) => {
  res.send("GET for post");
});

// Show – Get a specific user
app.get("/post/:id", (req, res) => {
  res.send("GET for user id");
});

// Create – Add a new user
app.post("/post", (req, res) => {
  res.send("POST for post");
});

// Delete – Remove a user
app.delete("/post/:id", (req, res) => {
  res.send("DELETE for user id");
});



app.listen(3030,()=>{
    console.log("server 3030 start");
});