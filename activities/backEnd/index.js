import express from "express";

const app = express();
const PORT = 2999;

app.get("/getName", (res, req) => {
  var name = "Abelardo";
  res.status(200).json(name);
});

app.listen(PORT, () => {
  // GET -> fetch, name var name = "Abelardo"

  // POST -> logic, if username = "Abelardo", password = "123" alert login success

  console.log(`Server is Running on PORT: ${PORT}`);
});
