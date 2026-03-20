
const followService = require("../Services/followService");

const getFollowData = async (req, res) => {
  try {
    const userId = req.user.id;

    const { followers, following } = await followService.getFollowData(userId);

    return res.status(200).json({
      followers,
      following
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const toggleFollow = async (req, res) => {
  
  try {
    
    const followerId = req.user.id;
    const followingId = Number(req.params.id);
    console.log("toggle follow called", followingId);
    
    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself"
      });
    }

    const existingFollow = await followService.findFollow(followerId, followingId);

    if (existingFollow) {

      await followService.deleteFollow(followerId, followingId);
        console.log("unfollowed");
        
      return res.json({
        followed: false,
        message: "Unfollowed successfully"
      });

    }

    const follow = await followService.addFollow(followerId, followingId);
       console.log("Followed");
       
    return res.json({
      followed: true,
      message: "Followed successfully",
      follow
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};



module.exports= {
    getFollowData,
    toggleFollow
}