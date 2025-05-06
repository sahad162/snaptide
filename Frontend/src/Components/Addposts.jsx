import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Carousel } from "react-bootstrap";
import { addPost } from "../services/allAPI";

function Addposts({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [postdetails, setpostdetails] = useState({
    postMedia: [],
    postContent: "",
    userTag: "",
    visibility: "public"
  });

  const [preview, setpreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


//to enhance button
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  //preview image
  useEffect(() => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
    const validPreviews = [];

    postdetails.postMedia.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        const url = URL.createObjectURL(file);
        validPreviews.push(url);
      } else {
        console.warn("Unsupported file type:", file.type);
      }
    });

    setpreview(validPreviews);

    return () => {
      validPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [postdetails.postMedia]);

  //getting input files
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setpostdetails({ ...postdetails, postMedia: files });
  };

//getting content
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpostdetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };


//submiting the add post
  const handleSubmit = async () => {
    setErrorMsg("");
    console.log("handle submit");
    

    if (
      !postdetails.postContent.trim() ||
      postdetails.postMedia.length === 0
    ) {
      setErrorMsg("Please fill in all required fields and upload at least one file.");
      return;
    }
    
    const formdata = new FormData();
    postdetails.postMedia.forEach((file) => {
      formdata.append("postMedia", file);
    });
    formdata.append("postContent", postdetails.postContent);
    formdata.append("userTag", JSON.stringify(postdetails.userTag.split(",").map(tag => tag.trim())));
    formdata.append("visibility", postdetails.visibility);

    

    if (localStorage.getItem("token")) {
      const requestHeader = {
        authorization: `Bearer ${localStorage.getItem("token")}`
      };

      setLoading(true);
      try {
        const response = await addPost(formdata, requestHeader);
        if (response.status === 200) {
          handleClose();
          setpostdetails({
            postMedia: [],
            postContent: "",
            userTag: "",
            visibility: "public"
          });
          setpreview([]);
        } else {
          setErrorMsg("Issue while posting. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Something went wrong during the upload.");
      } finally {
        setLoading(false);
      }
    }
    else{
      console.log("no token there");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className="text-center mb-3">
            <span className="fw-semibold">Create new post</span>
            <hr />
          </div>

          {preview.length > 0 ? (
            <Carousel>
              {preview.map((url, index) => (
                <Carousel.Item key={index}>
                  {url.includes("video") ? (
                    <video
                      src={url}
                      width="100%"
                      controls
                      style={{ maxHeight: "500px" }}
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="d-block w-100"
                      style={{ maxHeight: "500px", objectFit: "contain" }}
                    />
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="image text-center">
              <i className="fa-regular fa-image" style={{ fontSize: "100px" }}></i>
              <div className="fs-5">Upload photos or videos</div>
            </div>
          )}

          <div className="text-center mt-3">
            <button onClick={handleButtonClick} className="btn btn-primary">
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

          {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Submit Post"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addposts;
