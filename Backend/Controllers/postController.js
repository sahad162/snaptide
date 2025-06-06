const Post = require('../database/models/postModel');

exports.addPost = async (req, res) => {
  const userId = req.user.id;
  const { postContent, userTags, visibility } = req.body;

  // Handle multiple files
  const postMedia = req.files?.map(file => file.filename) || [];

  try {
    const newPost = new Post({
      postMedia,
      postContent,
      userTags ,
      visibility,
      userId
    });

    await newPost.save();
    res.status(200).json({ message: "Post saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error while adding post" });
  }
};
