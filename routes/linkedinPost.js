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
router.put("/:id", (req, res) => {
  try {
    let { id, url, title, category } = req.body;
    let foundPost = posts.find((post) => post.id === req.params.id);
    let index = posts.indexOf(foundPost);

    if (foundPost == undefined) {
      res.send({ message: "Post not found" });
      return;
    }

    let updatePost = {
      id: id ?? foundPost.id,
      url: url ?? foundPost.url,
      title: title ?? foundPost.title,
      category: category ?? foundPost.category,
    };
    posts[index] = updatePost;

    if (checkFile("./data/linkedin-posts.json")) {
      deleteFile("./data/linkedin-posts.json", "File deleted!");
      writeFile("./data/linkedin-posts.json", JSON.stringify(posts));
    }

    res.send({ message: "Posts updated successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

//DELETE
router.delete("/:id", (req, res) => {
  try {
    let filteredPosts = posts.filter((x) => x.id !== req.params.id);

    if (checkFile("./data/linkedin-posts.json")) {
      deleteFile("./data/linkedin-posts.json", "File deleted!");
      writeFile("./data/linkedin-posts.json", JSON.stringify(filteredPosts));
    }

    res.send({ message: "Posts deleted successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = router;
