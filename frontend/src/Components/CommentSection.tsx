import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../utils/icons";
import { RootState, AppDispatch } from "../Services/store";
import { addComment, deleteComment, editComment, getComments } from "../Services/Actions/commnetAction";
import "../styles/commentsSection.css";

interface CommentType {
  id: number;
  text: string;
  createdAt: string;
  userId: number;
  user?: {
    name?: string;
    avatar?: string;
  };
}

interface Props {
  postId: number;
}

function CommentSection({ postId }: Props) {
  const userId = Number(localStorage.getItem("userId"));

  const dispatch = useDispatch<AppDispatch>();
  const { comments } = useSelector(
    (state: RootState) => state.comments
  );

  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [postId, dispatch]);

  const addCommentHandler = async () => {
    if (!text.trim()) return;

    setLoading(true);
    await dispatch(addComment(postId, text));
    setText("");
    setLoading(false);
  };

  const deleteCommentHandler = async (id: number) => {
    await dispatch(deleteComment(id));
  };

  const editCommentHandler = async (id: number) => {
    if (!editText.trim()) return;

    await dispatch(editComment(id, editText));
    setEditingId(null);
    setEditText("");
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
              style={{ animationDelay: `${index * 0.05}s` }}
            >

              <div className="comment-avatar">
                {comment.user?.avatar ? (
                  <img src={comment.user.avatar} alt={comment.user?.name} />
                ) : (
                  <div className="comment-avatar-placeholder">
                    <Icons.User />
                  </div>
                )}
              </div>

              <div className="comment-content">

                <div className="comment-info">
                  <span className="comment-author">
                    {comment.user?.name || "Anonymous"}
                  </span>

                  <span className="comment-time">
                    <Icons.Clock />{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>

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
                        onClick={() => deleteCommentHandler(comment.id)}
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
                      onClick={() => editCommentHandler(comment.id)}
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

      <div className="comment-input-wrapper">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
          onKeyDown={(e) => e.key === "Enter" && addCommentHandler()}
        />

        <button
          onClick={addCommentHandler}
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