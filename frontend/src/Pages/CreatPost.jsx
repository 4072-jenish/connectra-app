import { useState, useRef } from "react";
import API from "../Services/axios";
import { useNavigate } from "react-router-dom";
import { Icons } from "../utils/icons";
import "../styles/creatPost.css";
import "../styles/globle.css"


function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post("/post/addPost", formData);
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
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
              <button type="button" onClick={removeImage} className="remove-image">
                <Icons.Close />
              </button>
            </div>
          )}

          <div className="post-actions">
            <div className="upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                id="image-upload"
                hidden
              />
              <label htmlFor="image-upload" className="upload-btn">
                <Icons.Image className="btn-icon" />
                Add Photo
              </label>
            </div>

            <button 
              type="submit" 
              className="submit-post"
              disabled={loading || !content.trim()}
            >
              {loading ? (
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