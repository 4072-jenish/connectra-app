const prisma = require("../../prisma");
const cloudinary = require("../Utils/cloudinary");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      likes: true,
      comments: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const createPost = async (userId, content, file) => {
  let imageUrl = null;
  let publicId = null;

  if (file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    imageUrl = result.secure_url;
    publicId = result.public_id;
  }

  return await prisma.post.create({
    data: {
      content,
      image: imageUrl,
      publicId,
      authorId: userId
    }
  });
};

const getPostsByUser = async (userIds) => {

  if (!Array.isArray(userIds)) {
    userIds = [userIds];
  }

  return await prisma.post.findMany({
    where: {
      authorId: {
        in: userIds 
      }
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      likes: true,
      comments: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
const updatePost = async (postId, userId, content, file) => {

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) }
  });

  if (!post) throw new Error("POST_NOT_FOUND");
  if (post.authorId !== userId) throw new Error("UNAUTHORIZED");

  let imageUrl = post.image;
  let publicId = post.publicId;

  if (file) {

    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    imageUrl = result.secure_url;
    publicId = result.public_id;
  }

  return await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      content,
      image: imageUrl,
      publicId
    }
  });
};

const deletePostWithRelations = async (postId, userId) => {

  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
      authorId: Number(userId)
    }
  });

  if (!post) throw new Error("UNAUTHORIZED");

  return await prisma.$transaction(async (tx) => {

    await tx.like.deleteMany({
      where: { postId: Number(postId) }
    });

    await tx.comment.deleteMany({
      where: { postId: Number(postId) }
    });

    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }

    await tx.post.delete({
      where: { id: Number(postId) }
    });

    return true;
  });
};

module.exports = {
  getAllPosts,
  createPost,
  getPostsByUser,
  updatePost,
  deletePostWithRelations
};