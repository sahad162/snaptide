import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Carousel } from "react-bootstrap";

function Addposts({ show, setShow }) {
  const handleClose = () => setShow(false);

  // State to store the post details including media, content, tags, and visibility
  const [postdetails, setpostdetails] = useState({
    postMedia: [],
    postContent: '',
    userTag: [],
    visibility: 'public'
  });

  const [preview, setpreview] = useState([]);
  const fileInputRef = useRef(null); // create useref

  // Handle the file input button click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Update the preview whenever files are changed
  useEffect(() => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
    const validPreviews = [];

    postdetails.postMedia.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        const url = URL.createObjectURL(file);
        validPreviews.push(url);
      } else {
        console.warn('Unsupported file type:', file.type);
      }
    });

    if (validPreviews.length > 0) {
      setpreview(validPreviews);
    }

    // Cleanup function to revoke object URLs
    return () => {
      validPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [postdetails.postMedia]);

  // Handle file selection and updating the state
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setpostdetails({ ...postdetails, postMedia: files });
  };

  // Handle input changes for post content, user tags, and visibility
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpostdetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you can add logic to submit the form data
    console.log("Post Submitted:", postdetails);
    handleClose(); // Close the modal after submission
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="text-center">
            <span className="fw-semibold">Create new post</span>
            <hr />
          </div>

          {/* If there are previews, show them */}
          {preview.length > 0 ? (
            <div className="text-center ">
              <Carousel>
                {preview.map((url, index) => (
                  <Carousel.Item key={index}>
                    {url.includes('video') ? (
                      <video
                        src={url}
                        width="100%"
                        controls
                        style={{ maxHeight: '500px' }}
                      />
                    ) : (
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="d-block w-100"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                      />
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>

              <button
                onClick={handleButtonClick}
                className="mt-4 btn btn-primary"
              >
                Upload File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
              />
            </div>
          ) : (
           
            <div className="image text-center">
              <i
                className="fa-regular fa-image"
                style={{ fontSize: "100px" }}
              ></i>
              <div className="fs-5">Upload photos here</div>
              <button
            onClick={handleButtonClick}
            className="mt-4 btn btn-primary"
          >
            Upload File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
          />
            </div>
           
          )}

          {/* Input fields for post content, tags, and visibility */}
          <div className="mt-3">
            <textarea
              name="postContent"
              value={postdetails.postContent}
              onChange={handleInputChange}
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              name="userTag"
              value={postdetails.userTag}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Tag users (comma separated)"
            />
          </div>

          <div className="mt-3">
            <select
              name="visibility"
              value={postdetails.visibility}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addposts;
