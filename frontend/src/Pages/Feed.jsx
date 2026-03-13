import { useEffect, useState } from "react";
import API from "../Services/axios";
import PostCard from "../Components/PostCard";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import "../styles/feed.css";
import "../styles/globle.css";


function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="instagram-feed">
      <LeftSidebar />

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

      <RightSidebar />
    </div>
  );
}

export default Feed;