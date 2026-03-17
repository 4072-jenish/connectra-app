import { useState, useRef, useCallback } from "react";
import API from "../Services/axios";
import { useNavigate } from "react-router-dom";
import { Icons } from "../utils/icons";
import "../styles/creatPost.css";
import "../styles/globle.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePost() {
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const createPost = useMutation({
    mutationFn: async (formData) => {
      return await API.post("/post/addPost", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/feed");
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    createPost.mutate(formData);
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="create-post-header">
          <Icons.Create className="header-icon" />
          <h2>Share Your Moment</h2>
          <p>What's on your mind today?</p>
        </div>
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="content-input">
            <textarea
              placeholder="Write something amazing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="post-textarea"
              maxLength="500"
            />
            <span className="char-count">{content.length}/500</span>
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <button type="button" onClick={removeImage}>
                <Icons.Close />
              </button>
            </div>
          )}

          <div className="post-actions">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              hidden
              id="image-upload"
            />

            <label htmlFor="image-upload" className="upload-btn">
              <Icons.Image /> Add Photo
            </label>

            <button
              type="submit"
              disabled={createPost.isPending || !content.trim()}
            >
              {createPost.isPending ? (
                <Icons.Refresh className="spinning" />
              ) : (
                <>
                  <Icons.Send className="btn-icon" />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;