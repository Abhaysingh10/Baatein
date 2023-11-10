import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./Login.scss";
import Banner from "./../../Assest/Image/banner.jpg";
import DarkBanner from "./../../Assest/Image/dark-banner.jpg";
import Logo from "./../../Assest/Image/Logo.png";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUsername} from './loginReducer'
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm({})

  const enableRegister = () => {
    setRegisterEnabled(true);
  };

  const enableLogin = () => {
    setRegisterEnabled(false);
  };
  const dispatch = useDispatch()
  const handleSubmit = () =>{
    dispatch(setUsername(getValues('username')))
    navigate('/chat')
  }


  window.addEventListener('unload', function () {
    console.log("unload")
    // socket.disconnect()
  });
  window.addEventListener('beforeunload', function (e) {
    console.log("before unload")
    // socket.disconnect()
  });
 
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
                <Controller
                      control={control}
                      name="username"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input className="input-field" onChange={onChange} type="text" placeholder="Your username" />
                      )}
                    />
              
              </div>
              {/* <div class="input-icons">
                <i class="bi bi-key"></i>
                <input className="input-field" type="text" placeholder="Password" />
              </div> */}

              {/* <div class=" position-relative d-inline-flex align-items-center">
                <input class="" formControlName="textInput" type="text" />
                <i
                  class="bi bi-x-circle position-absolute"
                  style={{
                    right: "10px",
                    cursor: "pointer",
                    zIndex: "100",
                  }}
                ></i>
              </div> */}

              <div>
                <div className="submit-row" style={{}}>
                  <Row>
                    {/* <Col className="register-forgot-parent" md={8} style={{}}>
                      <span className="register-text" onClick={registerEnabled ? enableLogin : enableRegister}>
                        {registerEnabled ? "Login" : "Register"}
                      </span>
                      <span className="forgot-text">Forgot Password</span>
                    </Col> */}
                    <Col className="submit-text" md={4}>
                      <button className="btn btn-primary" onClick={handleSubmit}>{registerEnabled ? "Register" : "Submit"}</button>
                    </Col>
                  </Row>
                  <Row></Row>
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
