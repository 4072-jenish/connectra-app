const prisma = require("../../prisma");

const allFollowers = async (req, res) => {
  try {

    const userId = req.user.id;

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      } 
    });

    if (followers.length === 0) {
      return res.status(404).json({
        message: "No followers found"
      });
    }

   return res.status(200).json({
      followers
    });

  } catch (error) {
    console.log(error);
   return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const allFollowing = async (req, res) => {
  try {

    const userId = req.user.id;

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      } 
    });

    if (following.length === 0) {
      return res.status(404).json({
        message: "No following found"
      });
    }

   return res.status(200).json({
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

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    // If already following → unfollow
    if (existingFollow) {

      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId
          }
        }
      });
        console.log("unfollowed");
        
      return res.json({
        followed: false,
        message: "Unfollowed successfully"
      });

    }

    // If not following → follow
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId
      }
    });
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
    allFollowers,
    allFollowing,
    toggleFollow
}