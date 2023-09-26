import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./Login.scss";
import Banner from "./../../Assest/Image/banner.jpg";
import DarkBanner from "./../../Assest/Image/dark-banner.jpg";
import Logo from "./../../Assest/Image/Logo.png";
export const Login = () => {
  const [registerEnabled, setRegisterEnabled] = useState(false);

  const enableRegister = () => {
    setRegisterEnabled(true);
  };

  const enableLogin = () => { 
    setRegisterEnabled(false)
   }

  return (
    <div className="main">
      <Container className="main-container">
        <Row>
          <Col className="login-page-form">
            {/* <div> */}
            <div className="credential-box">
              <div className="logo">
                <Image src={Logo}></Image>
              </div>
              <div class="input-icons">
                <i class="bi bi-person"></i>
                <input className="input-field" type="text" placeholder="Your login or e-mail" />
              </div>
              <div class="input-icons">
                <i class="bi bi-key"></i>
                <input className="input-field" type="text" placeholder="Password" />
              </div>
              <div>
                <div className="submit-row" style={{}}>
                  <Row>
                    <Col className="register-forgot-parent" md={8} style={{}}>
                      <span className="register-text" onClick={ registerEnabled ? enableLogin : enableRegister}>
                      {registerEnabled ? "Login" : "Register"}
                      </span>
                      <span className="forgot-text">Forgot Password</span>
                    </Col>
                    <Col className="submit-text" md={4}>
                      <button className="btn btn-primary">{registerEnabled ? "Register" : "Submit"}</button>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col>Google login</Col> */}
                  </Row> 
                </div>
              </div>
              {/* </div> */}
            </div>
          </Col>
          <Col className="login-page-banner">
            <Image src={Banner} style={{ objectFit: "cover", borderRadius: "0px 10px 10px 0px" }} width="100%" height="100%" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
