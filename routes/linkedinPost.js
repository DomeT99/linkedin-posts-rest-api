const express = require("express");
const router = express.Router(); 
const {
  tryGetAllPosts,
  tryGetFilteredPosts,
  tryInsertPost,
  tryEditPost,
  tryDeletePost,
} = require("../services/linkedinPostService"); 

//GET
router.get("/", (req, res) => tryGetAllPosts(res));
router.get("/category/:category", (req, res) =>
  tryGetFilteredPosts("category", req, res)
);
router.get("/id/:id", (req, res) => tryGetFilteredPosts("id", req, res));

//POST
router.post("/", (req, res) => tryInsertPost(req, res));
router.post("/multipleinsert", (req, res) => tryInsertPost(req, res));

//PUT
router.put("/:id", (req, res) => tryEditPost(req, res));

//DELETE
router.delete("/:id", (req, res) => tryDeletePost(req, res));

module.exports = router;
