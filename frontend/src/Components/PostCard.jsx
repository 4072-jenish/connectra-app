import { useState, useEffect } from "react";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/postcard.css";
import "../styles/globle.css";
import CommentSection from "./CommentSection";

function PostCard({ post, index }) {
  const userId = Number(localStorage.getItem("userId"));

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // 🔹 Toggle Like
  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);

    try {
      console.log(post.id);
      
      await API.post(`/like/toggleLike/${post.id}`);

      setIsLiked((prevLiked) => {
        const newLiked = !prevLiked;

        setLikes((prevLikes) =>
          newLiked ? prevLikes + 1 : prevLikes - 1
        );

        return newLiked;
      });

    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
          try {
            const res = await API.get(`/like/allLike-post/${post.id}`);
              console.log(res);
              
            const allLikes = res.data.allLike || [];
    
            setLikes(allLikes.length);
    
            const likedByUser = allLikes.some(
              (like) => like.userId === userId
            );
    
            setIsLiked(likedByUser);
    
          } catch (error) {
            console.error("Error fetching likes:", error);
          }
        };
    
        fetchLikes();
      }, [post.id, userId]);

      const fetchComments = async () => {
        try {
          const res = await API.get(`/comment/allComment-post/${post.id}`);
          setComments(res.data || []);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      const handleAddComment = async () => {
        console.log("handleAddComment called");
        
        if (!commentText.trim()) return;
      
        try {
          const res = await API.post(`/comment/addComment/${post.id}`, {
            comment: commentText
          });
      
          setComments((prev) => [...prev, res.data]);
          setCommentText("");
      
        } catch (error) {
          console.error("Error adding comment:", error);
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
            className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
            disabled={isLiking}
          >
            {isLiked ? <Icons.Liked /> : <Icons.Like />}
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

      {/* Post Stats */}
      <div className="post-stats">
        <span className="likes-count">
          <Icons.Heart /> {likes} likes
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
          <CommentSection postId={post.id} />
        </div>
      )}  

    </div>
  );
}

export default PostCard;