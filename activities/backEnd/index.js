import express from "express";

const app = express();
const PORT = 2999;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});