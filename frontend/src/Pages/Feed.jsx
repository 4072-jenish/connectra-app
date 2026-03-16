import { useEffect, useState } from "react";
import API from "../Services/axios";
import PostCard from "../Components/PostCard";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import { Icons } from "../utils/icons";
import "../styles/feed.css";
import "../styles/globle.css";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/feed/posts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Close sidebars when clicking overlay
  const closeSidebars = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  return (
    <div className="instagram-feed">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-btn" onClick={() => setLeftSidebarOpen(true)}>
          <Icons.Menu />
        </button>
        <Link to="/feed" className="mobile-logo">
          <Icons.Instagram />
          <span>Connectra</span>
        </Link>
        <button className="mobile-profile-icon" onClick={() => setRightSidebarOpen(true)}>
          <Icons.User />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div className="sidebar-overlay active" onClick={closeSidebars}></div>
      )}

      {/* Left Sidebar with props */}
      <LeftSidebar 
        isOpen={leftSidebarOpen} 
        onClose={() => setLeftSidebarOpen(false)} 
      />

      <main className="feed-main">
        <div className="feed-center">
          {loading ? (
            <div className="feed-loading">
              {[1, 2, 3].map((n) => (
                <div key={n} className="post-skeleton">
                  <div className="skeleton-header"></div>
                  <div className="skeleton-image"></div>
                  <div className="skeleton-actions"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="posts-feed">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar with props */}
      <RightSidebar 
        isOpen={rightSidebarOpen} 
        onClose={() => setRightSidebarOpen(false)} 
      />
    </div>
  );
}

export default Feed;