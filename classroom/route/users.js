const express = require("express");
const router = express.Router();

//users
// Index – Get all users
router.get("/", (req, res) => {
    res.send("GET for users");
});

// Show – Get a specific user
router.get("/:id", (req, res) => {
    res.send("GET for user id");
});

// Create – Add a new user
router.post("/", (req, res) => {
    res.send("POST for users");
});

// Delete – Remove a user
router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router; 