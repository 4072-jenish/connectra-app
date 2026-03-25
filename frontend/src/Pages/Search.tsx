import { useState, useEffect } from "react";
import API from "../Services/axios";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import { Icons } from "../utils/icons";
import "../styles/search.css";
import "../styles/globle.css";

function Search() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    saveSearch(query);


    try {
      setLoading(true);
      const { data } = await API.get(`/user/search?search=${query}`);
      console.log(data);
      
      setUsers(data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentClick = (searchTerm: string) => {
    setQuery(searchTerm);

    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    setTimeout(() => {
      handleSearch(fakeEvent);
    }, 100);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const followUser = async (id: number) => {
    try {
      await API.post(`/follow/followUser/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  return (
    <div className="search-page">
      <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)}/>

      <main className="search-main">
        <div className="search-container">
          <div className="search-header">
            <h2>
              <Icons.Search /> Search People
            </h2>
            <p>Find and connect with amazing people</p>
          </div>

          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search by name or username..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? <Icons.Refresh className="spinning" /> : <Icons.Search />}
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-header">
                <h4>
                  <Icons.Clock /> Recent Searches
                </h4>
                <button className="clear-btn" onClick={clearRecent}>
                  <Icons.Close /> Clear
                </button>
              </div>
              <div className="recent-list">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    className="recent-item"
                    onClick={() => handleRecentClick(term)}
                  >
                    <span>🔍</span> {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching for "{query}"...</p>
            </div>
          ) : (
            <div className="search-results">
              {query && users.length > 0 && (
                <div className="results-header">
                  <h3>
                    <Icons.Users /> Search Results
                  </h3>
                  <span className="results-count">{users.length} found</span>
                </div>
              )}

              {users.length === 0 && query ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No users found</h3>
                  <p>Try searching with a different name</p>
                </div>
              ) : (
                users.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="search-user-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="user-info">
                      <h4>
                        {user.name}
                        {user.username && <span>@{user.username}</span>}
                      </h4>
                      <p>{user.bio || "No bio yet"}</p>
                      <div className="user-meta">
                        <span>
                          <Icons.Users /> {user.followersCount || 0} followers
                        </span>
                        <span>
                          <Icons.Image /> {user.postsCount || 0} posts
                        </span>
                      </div>
                    </div>

                    <button
                      className="follow-btn"
                      onClick={() => followUser(user.id)}
                    >
                      <Icons.Follow /> Follow
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <RightSidebar isOpen={rightOpen} onClose={() => setRightOpen(false)}/>
    </div>  
  );
}

export default Search;