var express = require("express");
var router = express.Router();
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
router.post("/");
router.put("/");
router.delete("/");

module.exports = router;
