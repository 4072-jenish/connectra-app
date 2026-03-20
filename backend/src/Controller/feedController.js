const followService = require("../Services/followService");
const postService = require("../Services/postService");

const feedContent = async (req, res) => {
  try {
    const userId = req.user.id;

    const { following } = await followService.getFollowData(userId);

    const followingIds = following.map(f => f.followingId);

    const posts = await postService.getPostsByUser(followingIds);

    if (!posts.length) {
      return res.status(404).json({
        message: "No posts from followers"
      });
    }

    return res.json(posts);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



module.exports = {
    feedContent
}