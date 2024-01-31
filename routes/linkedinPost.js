const express = require("express");
const router = express.Router();
const { checkFile, deleteFile, writeFile } = require("../utils/utility");
const posts = require("../data/linkedin-posts.json");

//GET
router.get("/", (req, res) => {
  try {
    if (posts.length === 0) {
      res.send({ message: "No posts found" });
    }
    res.send(posts);
  } catch (err) {
    res.send({ message: err.message });
  }
});
router.get("/:category", (req, res) => {
  try {
    let filteredPosts = posts.filter(
      (post) => post.category === req.params.category
    );

    if (filteredPosts.length === 0) {
      res.send({ message: "No posts found" });
    }

    res.send(filteredPosts);
  } catch (err) {
    res.send({ message: err.message });
  }
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
router.post("/multipleinsert", (req, res) => {
  try {

    req.body.forEach((post) => posts.push(post));

    if (checkFile("./data/linkedin-posts.json")) {
      deleteFile("./data/linkedin-posts.json", "File deleted!");
      writeFile("./data/linkedin-posts.json", JSON.stringify(posts));
    }

    res.send({ message: "Posts created successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

//PUT
router.put("/");

//DELETE
router.delete("/");

module.exports = router;
