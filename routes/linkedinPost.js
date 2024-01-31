const express = require("express");
const router = express.Router();
const { checkFile, deleteFile, writeFile } = require("../utils/utility");
const posts = require("../data/linkedin-posts.json");

//GET
router.get("/", (req, res) => {
  res.send(posts);
});
router.get("/:category", (req, res) => {
  let filteredPosts = posts.filter(
    (post) => post.category === req.params.category
  );

  res.send(filteredPosts);
});

//POST
router.post("/", (req, res) => {
  try {
    posts.push(req.body);

    if (checkFile("./data/linkedin-posts.json")) {
      deleteFile("./data/linkedin-posts.json", "File deleted!");
      writeFile("./data/linkedin-posts.json", JSON.stringify(posts));
    }

    res.send({ message: "Post created successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});
router.put("/");
router.delete("/");

module.exports = router;
