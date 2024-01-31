const { isBlankArray } = require("../utils/utility");
const posts = require("../data/linkedin-posts.json");

const getAllPosts = (req, res) => {
  try {
    if (isBlankArray(posts)) {
      res.send({ message: "No posts found" });
    }
    res.send(posts);
  } catch (err) {
    res.send({ message: err.message });
  }
};

const getFilteredPosts = (filter,req, res) => {
  try {
    let filteredPosts = posts.filter(
      (post) => post[filter] === req.params[filter]
    );

    if (isBlankArray(filteredPosts)) {
      res.send({ message: "No posts found" });
      return;
    }

    res.send(filteredPosts);
  } catch (err) {
    res.send({ message: err.message });
  }
};

module.exports = {
  getAllPosts,
  getFilteredPosts,
};
