import { useEffect, useState } from "react";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/commentSection.css";
import "../styles/globle.css"

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comment/allComment-post/${postId}`);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      await API.post(`/comment/addComment/${postId}`, {
        comment: text
      });
      setText("");
      fetchComments();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <Icons.Comment />
        <h4>Comments</h4>
        <span className="comment-count">{comments.length}</span>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <Icons.Comment className="no-comments-icon" />
            <p>No comments yet. Be the first!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className="comment-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="comment-avatar">
                {comment.user?.avatar ? (
                  <img src={comment.user.avatar} alt={comment.user.name} />
                ) : (
                  <div className="comment-avatar-placeholder">
                    <Icons.User />
                  </div>
                )}
              </div>
              <div className="comment-content">
                <div className="comment-info">
                  <span className="comment-author">{comment.user?.name || 'User'}</span>
                  <span className="comment-time">
                    <Icons.Clock /> {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="comment-input-wrapper">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
          onKeyPress={(e) => e.key === 'Enter' && addComment()}
        />
        <button 
          onClick={addComment} 
          className="comment-submit"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <Icons.Refresh className="spinning" />
          ) : (
            <Icons.Send />
          )}
        </button>
      </div>
    </div>
  );
}

export default CommentSection;