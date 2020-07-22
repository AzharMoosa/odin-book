const express = require("express");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome To Odin Book API",
  });
});

// Define Routes

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
