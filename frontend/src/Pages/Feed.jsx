import API from "../Services/axios";
import PostCard from "../Components/PostCard";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import { Icons } from "../utils/icons";
import "../styles/feed.css";
import "../styles/globle.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Feed() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  // ✅ PURE FETCH FUNCTION (NO setState here)
  const fetchFeed = async () => {
    const { data } = await API.get("/feed/posts");
    return data;
  };

  // ✅ TANSTACK QUERY
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchFeed, // ✅ pass function reference
    staleTime: 1000 * 60 * 2, // 🔥 2 min cache
  });

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

      {(leftSidebarOpen || rightSidebarOpen) && (
        <div className="sidebar-overlay active" onClick={closeSidebars}></div>
      )}

      <LeftSidebar 
        isOpen={leftSidebarOpen} 
        onClose={() => setLeftSidebarOpen(false)} 
      />

      <main className="feed-main">
        <div className="feed-center">

          {/* ✅ USE TANSTACK LOADING */}
          {isLoading ? (
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

      <RightSidebar 
        isOpen={rightSidebarOpen} 
        onClose={() => setRightSidebarOpen(false)} 
      />
    </div>
  );
}

export default Feed;