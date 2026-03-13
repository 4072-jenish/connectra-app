import { useState } from "react";
import API from "../Services/axios";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import "../styles/search.css";
import "../styles/globle.css";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    try {
      setLoading(true);

      const { data } = await API.get(`/user/search?q=${query}`);

      setUsers(data.users || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (id) => {
    try {
      await API.get(`/follow/followUser/${id}`);

      alert("Followed!");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  return (
    <div className="search-page">
      <LeftSidebar />

      <main className="search-main">
        <div className="search-container">

          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {loading ? (
            <p>Searching...</p>
          ) : (
            <div className="search-results">
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="search-user-card">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p>{user.bio}</p>
                    </div>

                    <button
                      className="follow-btn"
                      onClick={() => followUser(user.id)}
                    >
                      Follow
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}

export default Search;