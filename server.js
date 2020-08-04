const express = require("express");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const connectDB = require("./config/db");
const app = express();

// Connect DB
connectDB();

// Inititalize Middleware
app.use(
  express.json({ extended: true, parameterLimit: 100000, limit: "50MB" })
);

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome To Odin Book API",
  });
});

// Define Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
