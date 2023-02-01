const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const convertParams = (req, res, next) => {
  const { id } = req.params;
  req.params.id = parseInt(id);
  next();
};

app.get("/", (req, res) => {
  res.send("Success!");
});

let blogs = [];

app.get("/blogs", (req, res) => {
  res.json(blogs);
});

app.post("/blogs", (req, res) => {
  blogs.push({ id: blogs.length + 1, ...req.body });
  res.status(201).send({ message: "OK!" });
});

app.put("/blogs/:id", convertParams, (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex((item) => item.id === id);
  blogs[index] = req.body;
  res.send(blogs[index]);
});

app.get("/blogs/:id", convertParams, (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex((item) => item.id === id);
  res.send(blogs[index]);
});

app.delete("/blogs/:id", convertParams, (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Not Found!" });
  }

  blogs.splice(index, 1);
  res.send({ message: "Deleted!" });
});

app.listen(PORT, () => console.log(`App is lisning on PORT: ${PORT}`));
