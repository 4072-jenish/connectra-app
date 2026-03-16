import { useEffect, useState } from "react";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/commentsSection.css";
import "../styles/globle.css";

function CommentSection({ postId }) {
  const userId = Number(localStorage.getItem("userId"));

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comment/allComment-post/${postId}`);
      setComments(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // 🔹 Add Comment
  const addComment = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const { data } = await API.post(`/comment/addComment/${postId}`, {
        comment: text
      });

      // instant UI update
      setComments((prev) => [data, ...prev]);

      setText("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Comment
  const deleteComment = async (id) => {
    try {
      await API.delete(`/comment/deleteComment/${id}`);

      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async (id) => {
    if (!editText.trim()) return;
  
    try {
      await API.put(`/comment/editComment/${id}`, {
        comment: editText
      });
  
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, text: editText } : c
        )
      );
  
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-section">

      {/* Header */}
      <div className="comment-header">
        <Icons.Comment />
        <h4>Comments</h4>
        <span className="comment-count">{comments.length}</span>
      </div>

      {/* Comments List */}
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
              style={{ animationDelay: `${index * 0.05}s` }}
            >

              {/* Avatar */}
              <div className="comment-avatar">
                {comment.user?.avatar ? (
                  <img src={comment.user.avatar} alt={comment.user?.name} />
                ) : (
                  <div className="comment-avatar-placeholder">
                    <Icons.User />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="comment-content">

                <div className="comment-info">
                  <span className="comment-author">
                    {comment.user?.name || "Anonymous"}
                  </span>

                  <span className="comment-time">
                    <Icons.Clock />{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>

                  {/* Delete Button */}
                  {comment.userId === userId && (
                    <div className="comment-actions">
                      <button
                        className="comment-edit"
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditText(comment.text);
                        }}
                      >
                        <Icons.Edit />
                      </button>
                  
                      <button
                        className="comment-delete"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <Icons.Delete />
                      </button>
                    </div>
                  )}
                </div>

                {editingId === comment.id ? (
                  <div className="comment-edit-box">
                
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="comment-input"
                    />
                
                    <button
                      className="comment-save"
                      onClick={() => editComment(comment.id)}
                    >
                      <Icons.Check />
                    </button>
                
                    <button
                      className="comment-cancel"
                      onClick={() => setEditingId(null)}
                    >
                      <Icons.Close />
                    </button>
                
                  </div>
                ) : (
                  <p className="comment-text">{comment.text}</p>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment */}
      <div className="comment-input-wrapper">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
          onKeyDown={(e) => e.key === "Enter" && addComment()}
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