import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/getName", (req, res) => {
  var name = "Abelardo";
  res.status(200).json(name);
});

app.post("/login", (req, res) => {
  var {username, password} = req.body;
  if (username == "Abelardo" && password == "123") {
    res.status(200).json({
      message: "Login successful.",
      status: "Success"
    })
  } else {
    res.status(403).json({
      message: "Invalid username or password.",
      status: "Failed"
    })
  }
});

app.listen(PORT, () => {
  // GET -> fetch, name var name = "Abelardo"

  // POST -> logic, if username = "Abelardo", password = "123" alert login success

  console.log(`Server is Running on PORT: ${PORT}`);
});
