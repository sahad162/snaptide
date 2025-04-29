// CustomAuthModal.js
import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import DateOfBirthSelect from "./DateOfBirthSelect";
import { userRegistration } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const CustomAuthModal = ({ show, handleClose, isloginpage, logosnap, title }) => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    userName: "",
    email: "",
    password: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (dobValue) => {
    setUserdata((prev) => ({ ...prev, dob: dobValue }));
  };

  const validateInputs = () => {
    const { userName, email, password, dob } = userdata;
    if (!email || !password || (!isloginpage && (!userName || !dob))) {
      return "Please fill in all required fields.";
    }
    // Add more advanced validation here if needed
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);

      if (isloginpage) {
        console.log("Logging in with", userdata);
      } else {
        const response = await userRegistration(userdata);
        if (response?.status === 201) {
          setUserdata({
            userName: "",
            email: "",
            password: "",
            dob: "",
          });
          handleClose();
        } else {
          console.log()
          setError(response.response.data.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered size="md">
      <Modal.Body className="p-4" style={{ background: "#157EC6", position: "relative" }}>
        <button
          type="button"
          className="close text-white"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "none",
            border: "none",
            fontSize: "2rem",
          }}
        >
          &times;
        </button>

        <div className="text-center mb-4">
          <img
            src={logosnap}
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
          <Modal.Title className="text-white mt-2">{title}</Modal.Title>
        </div>

        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              value={userdata.email}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {!isloginpage && (
            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
              <Form.Control
                type="text"
                name="userName"
                placeholder="Username"
                value={userdata.userName}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          )}

          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={userdata.password}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {!isloginpage && <DateOfBirthSelect onChange={handleDobChange} />}

          {error && <div className="text-light text-center mt-2">{error}</div>}

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-light"
              className="w-75 p-2"
              type="submit"
              disabled={loading}
              style={{ borderRadius: "15px" }}
            >
              {loading ? "Please wait..." : isloginpage ? "Sign In" : "Submit"}
            </Button>
          </div>

          {isloginpage && (
            <div className="d-flex justify-content-center mt-3">
              <Button variant="link" className="text-white p-0" style={{ fontSize: "0.9rem" }}>
                Forgot Password?
              </Button>
            </div>
          )}

          <div className="text-center text-light mt-3">
            {isloginpage ? "Don't have an account?" : "Already have an account?"}{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              {isloginpage ? "Sign Up" : "Sign In"}
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomAuthModal;
