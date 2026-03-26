import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../utils/icons";
import CommentSection from "./CommentSection";
import { RootState, AppDispatch } from "../store";
import { getLikes, toggleLike } from "../Services/Actions/likeAction";
import "../styles/postcard.css";

interface Post {
  id: number;
  content: string;
  image?: string;
  createdAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  comments?: any[];
}

interface Props {
  post: any;
  index: number;
}

function PostCard({ post, index }: Props) {
  const userId = Number(localStorage.getItem("userId"));

  const dispatch = useDispatch<AppDispatch>();
  const { likesByPost } = useSelector((state: RootState) => state.likes);
  const postLikeData = likesByPost[post.id] || {
    count: 0,
    isLiked: false,
  };
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    dispatch(toggleLike(post.id) as any);
    setIsLiking(false);
  };

  useEffect(() => {
    dispatch(getLikes(post.id, userId));
  }, [post.id, dispatch, userId]);

  return (
    <div className="post-card" style={{ animationDelay: `${index * 0.1}s` }}>

      {/* Post Header */}
      <div className="post-header">
        <div className="post-user"> 
          <div className="post-avatar">
            {post.author?.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} />
            ) : (
              <div className="avatar-placeholder">
                <Icons.User />
              </div>
            )}
          </div>

          <div className="post-user-info">
            <span className="post-username">{post.author?.name}</span>

            <span className="post-time">
              <Icons.Clock /> {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button className="post-options">
          <Icons.More />
        </button>
      </div>

      {/* Post Image */}
      {post.image && (
        <div
          className="post-image-container"
          onDoubleClick={handleLike}
        >
          <img src={post.image} alt="Post content" />
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions">

        <div className="actions-left">

          {/* Like */}
          <button
            className={`action-btn like-btn ${postLikeData.isLiked ? "liked" : ""}`}
            onClick={handleLike}
            disabled={isLiking}
          >
            {postLikeData.isLiked ? <Icons.Liked /> : <Icons.Like />}
          </button>

          {/* Comment */}
          <button
            className="action-btn comment-btn"
            onClick={() => setShowComments(!showComments)}
          >
            <Icons.Comment />
          </button>

          {/* Share */}
          <button className="action-btn share-btn">
            <Icons.Share />
          </button>

        </div>

        {/* Save */}
        <button
          className={`action-btn save-btn ${isSaved ? "saved" : ""}`}
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? <Icons.Saved /> : <Icons.Save />}
        </button>

      </div>

      <div className="post-stats">
        <span className="likes-count">
          <Icons.Heart /> {postLikeData.count} likes
        </span>
      </div>

      <div className="post-content">
        <span className="content-username">{post.author?.name}</span>
        <p className="content-text">{post.content}</p>
      </div>

      {post.comments?.length > 0 && (
        <button
          className="view-comments"
          onClick={() => setShowComments(!showComments)}
        >
          <Icons.Comment /> View all {post.comments.length} comments
        </button>
      )}

      {showComments && (
        <div className="comment-section">
          <CommentSection postId={post.id} />
        </div>
      )}  

    </div>
  );
}

export default PostCard;