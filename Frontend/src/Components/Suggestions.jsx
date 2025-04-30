import React, { useState } from "react";
import logo from "../assets/logosnap.png";

function Suggestions() {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => setIsFollow(!isFollow);

  return (
    <div
      className="container mt-5 p-3 rounded text-dark shadow-sm"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)", // White background with transparency
        backdropFilter: "blur(10px)", // Blur effect behind the div
        border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle white border
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-semibold">Suggested for you</span>
        <button
          className="btn btn-sm "
          style={{ background: "none", border: "none",color:'#157EC6' }}
        >
          See All
        </button>
      </div>

      {/* Suggestion Row */}
      <div className="d-flex justify-content-between align-items-center p-2 rounded bg-secondary bg-opacity-25">
        {/* User info */}
        <div className="d-flex align-items-center">
          <div className="suggestimg me-2">
            <img
              src={logo}
              alt="avatar"
              className="img-fluid rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className="d-flex flex-column">
            <span className="fw-semibold">Username</span>
            <small className="text-muted">@username</small>
          </div>
        </div>

        {/* Follow button */}
        <button
          className={`btn btn-sm ${
            isFollow
              ? "btn-outline-light btn-text-dark"
              : "btn-light btn-text-dark"
          } px-3 rounded-pill`}
          onClick={handleFollow}
        >
          {isFollow ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default Suggestions;
