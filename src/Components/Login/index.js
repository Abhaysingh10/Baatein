import "./Login.scss";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Banner from "./../../Assest/Image/banner.jpg";
import Logo from "./../../Assest/Image/Logo.png";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoginLoader, setUserInfo, setUsername } from "./loginReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setOwnerInfo } from "../../OwnerReducer";
export const Login = () => {
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const { loginLoading } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const enableRegister = () => {
    setRegisterEnabled(true);
  };

  const enableLogin = () => {
    setRegisterEnabled(false);
  };
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setLoginLoader(true));
    axios
      .post("http://localhost:3000/login", {
        params: {
          first_name: getValues("first_name"),
        },
      })
      .then((response) => {
        dispatch(setLoginLoader(false));
        if (response.status == 200) {
          dispatch(setOwnerInfo(response?.data))
          dispatch(setUsername(getValues("first_name")));
          navigate("/chat");
        }
      })
      .catch((err) => {
        console.log("err", err)
        if (err?.response?.status == 401) {
          toast.error(err?.response?.data);
          enableRegister();
        }
        dispatch(setLoginLoader(false));
      });
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:3000/add-user", {
        params: {
          first_name: getValues("first_name"),
          password: getValues("password"),
        },
      })
      .then((data) => {
        console.log("data",data)
        if (data?.status ==  204) {
          toast.error("User already exit !")
        }
      })
      .catch((ex) => {
        toast.error(ex);
      });
  };

  window.addEventListener("unload", function () {
    console.log("unload");
    // socket.disconnect()
  });
  window.addEventListener("beforeunload", function (e) {
    console.log("before unload");
    // socket.disconnect()
  });

  return (
    <div className="main">
      <div className="main-container container">
        <Row>
          <Col className="login-page-form" xs={12} sm={12} md={6} lg={6} style={{backgroundColor:""}}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div> */}
              <div className="credential-box">
                <div className="logo">
                  <Image src={Logo}></Image>
                </div>
                <div className="input-icons">
                  <i className="bi bi-person"></i>
                  <Controller
                    control={control}
                    name="first_name"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        className="input-field"
                        onChange={onChange}
                        type="text"
                        placeholder="Username"
                      />
                    )}
                  />
                  {errors.first_name && (
                    <div className="error-msg">
                      <span className="mx-2" role="alert">
                        First name is required
                      </span>
                    </div>
                  )}
                </div>
                <div className="input-icons">
                  <i className="bi bi-lock"></i>
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        className="input-field"
                        onChange={onChange}
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  />
                  {errors.password && (
                    <div className="error-msg">
                      <span className="mx-2" role="alert">
                        Password is required
                      </span>
                    </div>
                  )}
                </div>
                {/* <div className="input-icons">
                <i className="bi bi-key"></i>
                <input className="input-field" type="text" placeholder="Password" />
              </div> */}

                {/* <div className=" position-relative d-inline-flex align-items-center">
                <input className="" formControlName="textInput" type="text" />
                <i
                  className="bi bi-x-circle position-absolute"
                  style={{
                    right: "10px",
                    cursor: "pointer",
                    zIndex: "100",
                  }}
                ></i>
              </div> */}

                <div className="submit-row" style={{}}>
                  <Row>
                    <Col className="register-forgot-parent" md={8} sm={8} xs={8} style={{}}>
                      <span className="register-text" onClick={handleRegister}>
                        Register
                      </span>
                      <span className="forgot-text">Forgot Password</span>
                    </Col>
                    <Col
                      className="submit-text"
                      md={4}
                      sm={4}
                      xs={4}
                      style={{  }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                  <Row></Row>
                </div>
                {/* </div> */}
              </div>
            </form>
          </Col>
          <Col className="login-page-banner" xs={1} sm={1} md={6} lg={6}>
            <Image
              src={Banner}
              style={{ objectFit: "cover", borderRadius: "0px 10px 10px 0px" }}
              width="100%"
              height="100%"
            />
          </Col>
        </Row>
      </div>

      {loginLoading && <Loader />}
      <ToastContainer />
    </div>
  );
};
