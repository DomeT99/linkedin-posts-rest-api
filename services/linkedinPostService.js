const { isBlankArray, isUndefined } = require("../utils/utility");
const {
  sendResponseMessage,
  sendNotFoundMessage,
  sendErrorMessage,
} = require("../utils/handleMessages");
const { handleFileSystem } = require("../utils/fileSystem");
const posts = require("../data/linkedin-posts.json");

//GET
const tryGetAllPosts = (res) => {
  try {
    if (isBlankArray(posts)) {
      sendNotFoundMessage(res, "No posts found");
      return;
    }
    res.send(posts);
  } catch (err) {
    sendErrorMessage(res, err.message);
  }
};
const tryGetFilteredPosts = (filter, req, res) => {
  try {
    let filteredPosts = posts.filter(
      (post) => post[filter] === req.params[filter]
    );

    if (isBlankArray(filteredPosts)) {
      sendNotFoundMessage(res, "No posts found");
      return;
    }

    res.send(filteredPosts);
  } catch (err) {
    sendErrorMessage(res, err.message);
  }
};

//POST
const tryInsertPost = (req, res) => {
  try {
    req.body.forEach((post) => posts.push(post));

    handleFileSystem(posts, "./data/linkedin-posts.json");

    sendResponseMessage(res, "Posts created successfully");
  } catch (err) {
    res.send({ message: err.message });
  }
};

//PUT
const tryEditPost = (req, res) => {
  try {
    let { id, url, title, category } = req.body;
    let foundPost = posts.find((post) => post.id === req.params.id);
    let index = posts.indexOf(foundPost);

    if (isUndefined(foundPost)) {
      sendNotFoundMessage(res, "Post not found");
      return;
    }

    let updatePost = {
      id: id ?? foundPost.id,
      url: url ?? foundPost.url,
      title: title ?? foundPost.title,
      category: category ?? foundPost.category,
    };
    posts[index] = updatePost;

    handleFileSystem(posts, "./data/linkedin-posts.json");

    sendResponseMessage(res, "Posts updated successfully");
  } catch (err) {
    res.send({ message: err.message });
  }
};

//DELETE
const tryDeletePost = (req, res) => {
  try {
    let filteredPosts = posts.filter((x) => x.id !== req.params.id);

    handleFileSystem(filteredPosts, "./data/linkedin-posts.json");

    sendResponseMessage(res, "Posts deleted successfully");
  } catch (err) {
    res.send({ message: err.message });
  }
};

module.exports = {
  tryGetAllPosts,
  tryGetFilteredPosts,
  tryInsertPost,
  tryEditPost,
  tryDeletePost,
};
