// Auth.js
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import snaplogo from "../assets/snap.png";
import logosnap from "../assets/logosnap.png";
import "../App.css";
import CustomAuthModal from "../Components/CustomAuthModal"; // Import the CustomAuthModal component

function Auth() {
  const [show, setShow] = useState(false);
  const [isloginpage, setIsLoginPage] = useState(false);

  const userCreation = () => {
    setIsLoginPage(false);
    setShow(true);
  };

  const loginUser = () => {
    setIsLoginPage(true);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "#157EC6", minWidth: "100vw" }}
      >
        <Row className="w-75">
          <Col md={6}>
            <img src={snaplogo} alt="" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div className="headingfont text-light">
              <div
                style={{
                  fontSize: "64px",
                  letterSpacing: "0.8px",
                  fontWeight: "700",
                }}
              >
                Tide’s In.
              </div>
              <div
                style={{
                  fontSize: "31px",
                  letterSpacing: "0.8px",
                  fontWeight: "700",
                  lineHeight: "84px",
                }}
              >
                Dive In.
              </div>
              <div>
                <button
                  className="btn btn-light mt-5"
                  style={{ width: "300px", borderRadius: "15px" }}
                  onClick={userCreation}
                >
                  <span className="writefont" style={{ fontWeight: "500" }}>
                    Create account
                  </span>
                </button>
                <div className="mt-2 ms-5">Don't you have an account?</div>
                <div className="d-flex align-items-center mt-4">
                  <hr className="w-25" />
                  <div className="px-2">OR</div>
                  <hr className="w-25" />
                </div>

                <div
                  className="d-flex flex-column mt-4"
                  style={{ width: "300px" }}
                >
                  <span className="mt-2 ms-5">Already have an account?</span>
                  <button
                    className="btn btn-outline-light mt-3"
                    style={{ borderRadius: "15px" }}
                    onClick={loginUser}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <CustomAuthModal
        show={show}
        handleClose={handleClose}
        isloginpage={isloginpage}
        logosnap={logosnap}
        title={isloginpage ? (
          <span>
            Sign into <span className="fw-bold fs-3">Snaptide</span>
          </span>
        ) : (
          "Create your account"
        )}
      />
    </>
  );
}

export default Auth;
