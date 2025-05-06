import React, { useEffect, useState } from "react";
import { getusers, togglefollow } from "../services/allAPI";
import defaultAvatar from "../assets/logosnap.png"; 

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [followState, setFollowState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    try {
      let reqHeader={
        "authorization":`Bearer ${localStorage.getItem('token')}`
      }
      const response = await getusers(reqHeader);
      if (response?.status === 200) {
        setUsers(response.data.users);
        const initialState = {};
        response.data.users.forEach(user => {
          initialState[user._id] = false;
        });
        setFollowState(initialState);
      } else {
        setError("Unable to fetch user suggestions");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();    
  }, []);

  const toggleFollow = async (userId) => {
    const prevState = followState[userId];
  
    // Optimistic update
    setFollowState((prev) => ({
      ...prev,
      [userId]: !prevState
    }));
  
    try {
      const reqBody = { userId }; // wrap in object
      const requestHeader = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
  
      const response = await togglefollow(reqBody, requestHeader);
  
      if (response?.status !== 200) {
        // If toggle failed, revert UI
        setFollowState((prev) => ({
          ...prev,
          [userId]: prevState,
        }));
      }
    } catch (err) {
      console.error(err);
      // Revert state on error
      setFollowState((prev) => ({
        ...prev,
        [userId]: prevState,
      }));
    }
  };
  

  return (
    <div
      className="container mt-5 p-3 rounded text-dark shadow-sm"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-semibold">Suggested for you</span>
        <button
          className="btn btn-sm"
          style={{ background: "none", border: "none", color: "#157EC6" }}
        >
          See All
        </button>
      </div>

      {loading && <div className="text-muted text-center">Loading...</div>}
      {error && <div className="text-danger text-center">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="text-muted text-center">No suggestions available</div>
      )}

      {!loading && users.map((user) => (
        <div
          key={user._id}
          className="d-flex justify-content-between align-items-center p-2 rounded mb-2 bg-secondary bg-opacity-25"
        >
          <div className="d-flex align-items-center">
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold">{user.name || "Unnamed"}</span>
              <small className="text-muted">@{user.userName || "user"}</small>
            </div>
          </div>
          <button
            className={`btn btn-sm ${
              followState[user._id]
                ? "btn-outline-light btn-text-dark"
                : "btn-light btn-text-dark"
            } px-3 rounded-pill`}
            onClick={() => toggleFollow(user._id)}
          >
            {followState[user._id] ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
