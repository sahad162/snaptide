import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/snap.png";

function Posts({ activeTab }) {
  const [haveImage, setHaveImage] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(10);
  const [isFollow, setIsFollow] = useState(false);

  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleSave = () => setIsSaved(!isSaved);
  const handleFollow = () => setIsFollow(!isFollow);

  return (
    <Container
    className="border rounded p-3 mb-4 text-dark"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.4)",  // White background with transparency
      backdropFilter: "blur(10px)",  // Blur effect behind the container
      border: "1px solid rgba(255, 255, 255, 0.2)",  // Subtle white border
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  // Soft shadow for depth
    }}
  >
    
      <Row>
        {/* Avatar */}
        <Col md={1}>
          <img
            src={logo}
            alt="Avatar"
            className="img-fluid rounded-circle"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
        </Col>

        {/* Post Content */}
        <Col md={11}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span className="text-dark fw-semibold">Narendra Modi</span>{" "}
              <span className="text-muted">@narendramodi · Apr 28</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {activeTab === "forYou" && (
                <button
                className={`btn btn-sm px-3 rounded-pill ${isFollow ? "btn-outline-dark" : "text-light"}`}
                style={{
                  backgroundColor: isFollow ? "transparent" : "#157EC6",
                }}
                onClick={handleFollow}
              >
                {isFollow ? "Following" : "+ Follow"}
              </button>
              
              )}
              <button className="btn text-light p-0">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
          </div>

          {/* Body Text */}
          <p className="mt-2" style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium harum nisi quia totam deserunt, mollitia earum...
          </p>

          {/* Optional Image */}
          {haveImage && (
            <div className="my-3">
              <img
                src={logo}
                alt="Post visual"
                className="img-fluid rounded border"
                style={{ maxHeight: "300px", maxWidth: "100%" }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex gap-4">
              {/* Comment */}
              <div className="d-flex align-items-center gap-2">
                <i className="fa-regular fa-comment fs-5"></i>
                <span>5</span>
              </div>

              {/* Like */}
              <div
                className={`d-flex align-items-center gap-2 cursor-pointer ${
                  isLiked ? "text-danger" : ""
                }`}
                onClick={handleLike}
              >
                <i
                  className={`${
                    isLiked ? "fa-solid" : "fa-regular"
                  } fa-heart fs-5`}
                ></i>
                <span>{likeCount}</span>
              </div>

              {/* Share */}
              <div className="d-flex align-items-center gap-2">
                <i className="fa-regular fa-share-from-square fs-5"></i>
              </div>
            </div>

            {/* Save */}
            <div onClick={handleSave} className="cursor-pointer">
              <i
                className={`${
                  isSaved ? "fa-solid" : "fa-regular"
                } fa-bookmark fs-5`}
              ></i>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Posts;
