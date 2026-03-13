import { useState } from "react";
import API from "../Services/axios";
import { Icons, PostIcons } from "../utils/icons";
import "../styles/postcard.css";
import "../styles/globle.css"


function PostCard({ post, index }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await API.get(`/like/toggleLike/${post.id}`);
      if (!isLiked) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

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
        <div className="post-image-container">
          <img src={post.image} alt="Post content" />
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions">
        <div className="actions-left">
          <button 
            className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={isLiking}
          >
            {isLiked ? <Icons.Liked /> : <Icons.Like />}
          </button>
          <button 
            className="action-btn comment-btn"
            onClick={() => setShowComments(!showComments)}
          >
            <Icons.Comment />
          </button>
          <button className="action-btn share-btn">
            <Icons.Share />
          </button>
        </div>
        <button 
          className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? <Icons.Saved /> : <Icons.Save />}
        </button>
      </div>

      {/* Post Stats */}
      <div className="post-stats">
        <span className="likes-count">
          <Icons.Heart /> {likes.toLocaleString()} likes
        </span>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <span className="content-username">{post.author?.name}</span>
        <p className="content-text">{post.content}</p>
      </div>

      {/* View Comments */}
      {post.comments?.length > 0 && (
        <button 
          className="view-comments"
          onClick={() => setShowComments(!showComments)}
        >
          <Icons.Comment /> View all {post.comments.length} comments
        </button>
      )}

      {/* Comment Section */}
      {showComments && (
        <div className="comment-section">
          {/* Your CommentSection component */}
        </div>
      )}

      {/* Add Comment */}
      <div className="add-comment">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="comment-input"
        />
        <button className="post-comment-btn">
          <Icons.Send />
        </button>
      </div>
    </div>
  );
}

export default PostCard;