import "./Chatpage.scss";
import React, { useEffect, useRef, useState } from "react";
import {Col, Container, Row } from "react-bootstrap";
import Logo from "./../../Assest/Image/man.png";
import User from "./../../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import AddFriend from "../Modal/AddFriend/index.js";
import { fetchMessages, getFriendsList } from "./ChatpageAction.js";
import Loader from "../Loader/Loader.js";
import { setLoginLoader, setUserInfo } from "../Login/loginReducer.js";
import socket from "../Socket.js/index.js";
import { addMessages, setMessages } from "./ChatpageReducers.js";
import { useNavigate } from "react-router-dom";
import data from '@emoji-mart/data'
import { Picker } from "emoji-mart";
import EmojiPicker from "emoji-picker-react";


const Chatpage = () => {
  const [selectedSocketId, setselectedSocketId] = useState(null);
  const { ownerInfo, friendList } = useSelector((state) => state.ownerInfo);
  const { loginLoading, userName } = useSelector((state) => state.login);
  const { messages } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [userInfo, setuserInfo] = useState({})
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const scrollContainerRef = useRef(null);

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  const [data] = useState([
    { id: 1, name: "Vally", chatDetails: "", dsateTime: "Today" },
  ]);

  useEffect(() => {

    console.log("localstorage", localStorage.getItem('first_name'))

    return () => {

    }
  }, [])

  useEffect(() => {
    // if (ownerInfo != null) {
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      socket.auth = { ownerInfo }
      socket.connect();
    }
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }
    // }
    return () => { };
  }, [ownerInfo]);

  useEffect(() => {
    socket.on("private-message-received", (message) => {
      console.log("private-message received", message);
      dispatch(addMessages(message));
    });
    return () => { };
  }, [socket]);

  useEffect(() => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef?.current?.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("Online users", onlineUsers);
    return () => { };
  }, [onlineUsers]);
  


  socket.on("session", ({ sessionID, userID, username }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
    setuserInfo({ userID, username })
  });

  socket.on("connected-users", (data) => {
    let newArray = [];
    console.log("data", data);
    if (userName) {
      newArray = data?.filter(
        (obj) => obj?.user?.first_name?.toLowerCase() !== userName?.toLowerCase()
      );
    } else {
      newArray = data?.filter(
        (obj) => obj?.user?.first_name?.toLowerCase() !== localStorage?.getItem('first_name')?.toLowerCase()
      );
    }
    setOnlineUsers(newArray);
  });

  socket.on("connect_error", (err) => {
    if (err.message === "Invalid owner information.") {
      console.log("Invalid username");
    }
  });


  const onMessageSent = () => {
    const content = getValues("messageBox");
    const recepientSocketId = selectedSocketId?.userID;
    socket.emit("private message", {
      content: content,
      to: recepientSocketId,
      senderId: ownerInfo?.id,
      receiverId: selectedSocketId?.user?.id,
    });
    dispatch(addMessages({ content: content, senderId: ownerInfo?.id }));
    setValue("messageBox", "");
  };

  const selectSocketId = (ele) => {
    dispatch(setLoginLoader(true));
    setselectedSocketId(ele);
    fetchMessages(ownerInfo?.id, ele?.user?.id, dispatch);
  };

  const addFriend = (ele) => {
    // console.log("ele",ele)
    setshowModal(true);
  };

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const handleButtonClick = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const getEmoji = (data) => { 
    console.log("data", data)
    // setValue('messageBox', data?.emoji)
   }

  window.addEventListener("unload", function () {
    socket.disconnect();
  });



  return (
    <div className="main">
      <Container className="container-div" key={1}>
        <Row className="my-2" key={1}>
          <Col lg={4} className="chat-list ">
            <Row>
              <Col className="logo">
                <img
                  className="rounded-circle"
                  src={Logo}
                  width={"80px"}
                  height={"80px"}
                  alt="profile"
                />
              </Col>
            </Row>
            <Row>
              <Col className="name-title">{userInfo?.username}
                <i class="bi bi-box-arrow-left mx-2" onClick={logout} title="Logout" style={{ cursor: "pointer" }}>
                </i>
              </Col>
            </Row>
            <Row>
              <Col className="search-chat">
                <input type="text" placeholder="Search chat " />
              </Col>
            </Row>
            <div className="infinite-scroll">
              <InfiniteScroll
                dataLength={data?.length}
                height={"calc(100vh - 300px)"}
                style={{ scrollbarWidth: "none" }}
              >
                {onlineUsers?.map((ele, i) => {
                  return (
                    <Col className="chat-list-item" key={ele?.id}>
                      <div className="item-content">
                        <Row>
                          <Col xs={2} sm={2} md="auto" lg={2} style={{ backgroundColor: "" }}>
                            <img
                              src={User}
                              className="rounded-circle"
                              alt="..."
                            />
                          </Col>
                          <Col xs={7} sm={8} md={7} lg={8} style={{ backgroundColor: "" }}
                            onClick={() => selectSocketId(ele)}>
                            <Row style={{ backgroundColor: "" }}>
                              <span className="chat-item-username">
                                {ele?.user?.first_name}
                              </span>
                            </Row>
                            {/* <Row style={{ backgroundColor: "" }}>
                              <span className="chat-details font-weight-light"> {messages && messages[messages?.length-1]?.content}</span>
                            </Row> */}
                          </Col>
                          <Col
                            xs={3}
                            sm={2}
                            md={2}
                            lg={2}
                            style={{ backgroundColor: "" }}
                          >
                            {/* <span className="date-time">{new Date(messageLog[messageLog?.length-1]?.msgDateTime).toLocaleTimeString()}</span> */}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
              </InfiniteScroll>
            </div>
          </Col>
          {selectedSocketId && (
            <Col lg={8}>
              <div className="chat-window">
                <div className="header">
                  <Row className="header-row">
                    <Col md={10} lg={10} className="chat-window-header">
                      {selectedSocketId?.user?.first_name}{" "}
                      {!friendList?.some(
                        (item) => item.friend_id === selectedSocketId?.user?.id
                      ) && (
                          <span
                            className="mx-2"
                            onClick={addFriend}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="bi bi-person-plus"></i>
                          </span>
                        )}{" "}
                      <span> </span>
                    </Col>
                    <Col className="option-icon" md={2} lg={2}>
                      <i className="bi bi-three-dots-vertical mx-4"></i>
                      <i className="bi bi-camera-video"></i>
                    </Col>
                  </Row>
                </div>
                <div
                  ref={scrollContainerRef}
                  style={{
                    overflowY: "auto",
                    height: "calc(100vh - 180px)",
                    marginBottom: "5px",
                  }}
                >
                  <InfiniteScroll
                    className="infinte-scroll"
                    dataLength={data?.length}
                    >
                    <Row
                      className="chat-box"
                      style={{ backgroundColor: "", overflow: "" }}
                      >
                      {isPickerVisible && <EmojiPicker searchDisabled={true} 
                      onEmojiClick={(data)=>console.log(data)}/>}
                      {messages?.map((ele, i) => {
                        if (ele?.senderId === ownerInfo?.id) {
                          return (
                            <div className="message-sent" key={i}>
                              <span>{ele?.content}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div className="message-received">
                              <span>{ele?.content}</span>
                            </div>
                          );
                        }
                      })}
                    </Row>
                  </InfiniteScroll>
                </div>
                <Row className="message-box" style={{ backgroundColor: "" }}>
                  <Col lg={0} style={{ width: "fit-content" }}>
                    <i className="bi bi-emoji-smile" 
                    style={{cursor:"pointer"}} 
                    onClick={handleButtonClick}  />
                  </Col>
                  <Col lg={10}>
                    <Controller
                      control={control}
                      name="messageBox"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          color="white"
                          type="text"
                          placeholder="Type your message here !"
                          onChange={onChange}
                          value={value}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onMessageSent();
                            }
                          }}
                        />
                      )}
                    />
                  </Col>

                  <Col lg={1}>
                    <i
                      className="bi bi-send"
                      style={{ cursor: "pointer", color: "white" }}
                      onClick={onMessageSent}
                    ></i>
                  </Col>
                </Row>
              </div>
            </Col>
          )}
        </Row>
        <AddFriend
          showModal={showModal}
          setshowModal={setshowModal}
          friend_id={selectedSocketId?.user?.id}
        />
      </Container>
      {loginLoading && <Loader />}
    </div>
  );
};

export default Chatpage;
