import prisma from "../prisma";
import cloudinary from "../Utils/cloudinary";

 const getAllPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

 const createPost = async (
  userId: number,
  content: string,
  file?: Express.Multer.File
) => {
  let imageUrl: string | null = null;
  let publicId: string | null = null;

  if (file) {
    const result: any = await new Promise((resolve, reject) => {
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

  return prisma.post.create({
    data: { content, image: imageUrl, publicId, authorId: userId },
  });
};

 const getPostsByUser = async (userIds: number | number[]) => {
  const ids = Array.isArray(userIds) ? userIds : [userIds];

  return prisma.post.findMany({
    where: { authorId: { in: ids } },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

 const updatePost = async (
  postId: number,
  userId: number,
  content: string,
  file?: Express.Multer.File
) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) throw new Error("POST_NOT_FOUND");
  if (post.authorId !== userId) throw new Error("UNAUTHORIZED");

  let imageUrl = post.image;
  let publicId = post.publicId;

  if (file) {
    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }

    const result: any = await new Promise((resolve, reject) => {
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

  return prisma.post.update({
    where: { id: postId },
    data: { content, image: imageUrl, publicId },
  });
};

 const deletePostWithRelations = async (
  postId: number,
  userId: number
) => {
  const post = await prisma.post.findFirst({
    where: { id: postId, authorId: userId },
  });

  if (!post) throw new Error("UNAUTHORIZED");

  return prisma.$transaction(async (tx) => {
    await tx.like.deleteMany({ where: { postId } });
    await tx.comment.deleteMany({ where: { postId } });

    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }

    await tx.post.delete({ where: { id: postId } });

    return true;
  });
};

export default {
  getAllPosts,
  createPost,
  getPostsByUser,
  updatePost,
  deletePostWithRelations,
}