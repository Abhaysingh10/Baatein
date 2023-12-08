import "./Chatpage.scss";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, OverlayTrigger, Popover, Row } from "react-bootstrap";
import Logo from "./../../Assest/Image/man.png";
import User from "./../../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import AddFriend from "../Modal/AddFriend/index.js";
import { fetchMessages } from "./ChatpageAction.js";
import Loader from "../Loader/Loader.js";
import { setLoginLoader } from "../Login/loginReducer.js";
import socket from "../Socket.js/index.js";
import { addMessages, setMessages } from "./ChatpageReducers.js";
import { useNavigate } from "react-router-dom";
import demoImage from "../../Assest/Image/_5ee00a37-e8c5-43ef-87cc-266c898af5f9.jpg";
import EmojiPicker from "emoji-picker-react";
import { setOwnerInfo } from "../../OwnerReducer.js";
import { now } from "moment/moment.js";
import MediaUpload from "../MediaUpload.js/index.js";
import { chat_limit, offset } from "../Misc/Constant.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Chatpage = () => {
  const [selectedSocketId, setselectedSocketId] = useState(null);
  const [selectedIndex, setselectedIndex] = useState()
  const { ownerInfo, friendList } = useSelector((state) => state.ownerInfo);
  const { loginLoading, userName } = useSelector((state) => state.login);
  const { messages, totalCount } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [userInfo, setuserInfo] = useState();
  const [showModal, setshowModal] = useState(false);
  const [messageType, setmessageType] = useState("text");
  const hiddenFileInput = useRef(null);
  const [show, setShow] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [fileDetails, setfileDetails] = useState();
  const [chatIndex, setchatIndex] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeOptions = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };

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
    const chat_index = localStorage.getItem("chat_index");
    const owner_info = localStorage.getItem("owner_info")
    chat_index && setOnlineUsers(JSON.parse(chat_index))
    owner_info && dispatch(setOwnerInfo(JSON.parse(owner_info)))

    return () => {};
  }, []);

  useEffect(() => {
    // console.log("Owner Info", ownerInfo);

    const sessionID = localStorage.getItem("sessionID");
    if (!socket.connected) {
      if (!sessionID) {
        socket.auth = { ownerInfo };
        socket.connect();
      }
      if (sessionID) {
        socket.auth = { sessionID };
        socket.connect();
      }
    }
    return () => {};
  }, [ownerInfo]);

  useEffect(() => {
    socket.on("private-message-received", (message) => {
      console.log("private-message-received", message)
      console.log("nbhgfcvbn", selectedSocketId)
      if (selectedSocketId?.user?.id == message?.senderId) {
        dispatch(addMessages(message));
      }
      toast.success(message?.content)
    });
    return () => {
      socket.off("private-message-received");
    };
  }, [socket]);

  useEffect(() => {
    if (scrollContainerRef?.current) {
      // scrollContainerRef.current.scrollTop =
      //   scrollContainerRef?.current?.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // console.log("Online users", onlineUsers);
    return () => {};
  }, [onlineUsers]);

  socket.on("session", ({ sessionID, userID, username, ownerInfo }) => {
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);
    socket.userID = userID;
    setuserInfo({ userID, username });
    console.log("ownerInfo", ownerInfo);
    dispatch(setOwnerInfo(ownerInfo));
  });

  socket.on("connected-users", (data) => {
    let newArray = [];
    if (userName) {
      newArray = data?.filter(
        (obj) =>
          obj?.user?.first_name?.toLowerCase() !== userName?.toLowerCase()
      );
      
    } else {
      newArray = data?.filter(
        (obj) =>
          obj?.user?.first_name?.toLowerCase() !==
          localStorage?.getItem("first_name")?.toLowerCase()
      );
    }
    setOnlineUsers(newArray);
    // console.log("new Array", newArray)
    // console.log("new Array", data)
    newArray?.length > 0 && localStorage.setItem("chat_index",JSON.stringify(newArray))
    
  });

  socket.on("connect_error", (err) => {
    if (err.message === "Invalid owner information.") {
      // console.log("Invalid username");
    }
  });

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log("fileUploaded", fileUploaded);
    fileUploaded && setfileDetails(fileUploaded);
    fileUploaded && setimgUrl(URL.createObjectURL(fileUploaded));
    fileUploaded && setShow(true);
    // handleFile(fileUploaded);
  };

  const onMessageSent = () => {
    const content = getValues("messageBox");
    const recepientSocketId = selectedSocketId?.userID;
    socket.emit("private message", {
      content: content,
      to: recepientSocketId,
      senderId: ownerInfo?.id,
      receiverId: selectedSocketId?.user?.id,
      messageType: messageType,
      timestamp: Date.now(),
    });
    dispatch(
      addMessages({
        content: content,
        senderId: ownerInfo?.id,
        messageType: messageType,
        timestamp: Date.now(),
      })
    );
    setValue("messageBox", "");
    moveItemToStart(onlineUsers, chatIndex);

  };

  function moveItemToStart(array, n) {
    // Check if the provided index is within the array bounds
    if (n < 0 || n >= array.length) {
      console.error("Invalid index provided for moving.");
      return array;
    }
  
    // Remove the nth item and store it
    const removedItem = array.splice(n, 1)[0];
  
    // Add the removed item to the beginning of the array
    array.unshift(removedItem);
  
    setOnlineUsers(array)
    localStorage.setItem('chat_index', JSON.stringify(array))
  };

  const selectSocketId = (ele, i) => {
    setchatIndex(i)
    dispatch(setLoginLoader(true));
    setselectedSocketId(ele);
    fetchMessages(ownerInfo?.id, ele?.user?.id, chat_limit, offset , dispatch);
    
  };

  const addFriend = (ele) => {
    // console.log("ele",ele)
    setshowModal(true);
  };

  const logout = () => {
    socket.disconnect()
    console.log("called")
    localStorage.clear();
    navigate("/");
  };

  const handleButtonClick = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const getEmoji = (data) => {
    console.log("data", data);
    // setValue('messageBox', data?.emoji)
  };

  const popoverTop = (
    <Popover id="popover-positioned-top" title="Popover top">
      <Controller
        control={control}
        name="messageBox"
        render={({ field: { onChange, onBlur, value } }) => (
          <EmojiPicker
            searchDisabled={true}
            onEmojiClick={(data) =>
              onChange(getValues("messageBox") + data.emoji)
            }
          />
        )}
      />
    </Popover>
  );

  window.addEventListener("unload", function () {
    socket.disconnect();
  });

  const fetchMoreData = () => { 
    console.log("fetched more triggered")
    fetchMessages(ownerInfo?.id, selectedSocketId?.user?.id, chat_limit, messages?.length , dispatch, true);
   }

   useEffect(() => {

    console.log(selectedSocketId)
   
     return () => {
       
     }
   }, [selectedSocketId])
   


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
              <Col className="name-title">
                {ownerInfo?.first_name}
                <i
                  className="bi bi-box-arrow-left mx-2"
                  onClick={logout}
                  title="Logout"
                  style={{ cursor: "pointer" }}
                ></i>
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
                          <Col
                            xs={2}
                            sm={2}
                            md="auto"
                            lg={2}
                            style={{ backgroundColor: "" }}
                          >
                            <img
                              src="https://api.dicebear.com/7.x/pixel-art/svg"
                              className="rounded-circle"
                              alt="..."
                            />
                          </Col>
                          <Col
                            xs={7}
                            sm={8}
                            md={7}
                            lg={8}
                            style={{ backgroundColor: "" }}
                            onClick={() => selectSocketId(ele, i)}>
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
                    inverse={true}
                    dataLength={messages && messages?.length}
                    hasMore={!(totalCount == messages?.length)}
                    next={fetchMoreData}
                    height="calc(100vh - 180px)"
                    className="infinte-scroll"
                    loader={<span className=""> Loading... </span>}
                    style={{display:"flex", flexDirection:"column-reverse"}}
                  >
                    <Row
                      className="chat-box"
                      style={{ backgroundColor: "", overflow: "" }}
                    >
                      {messages?.map((ele, i) => {
                        if (ele?.senderId === ownerInfo?.id) {
                          return (
                            <div className="message-sent" key={i}>
                              {ele?.messageType === "text" && (
                                <div className="message-content-parent">
                                  <span className="text-message position-relative">
                                    {ele?.content}
                                    <div
                                      className="timestamp-parent"
                                      style={{ backgroundColor: "red" }}
                                    >
                                      <span className="timestamp position-absolute top-100 start-100 translate-middle">
                                        {new Date(ele?.timestamp)
                                          .toLocaleString("en-US", timeOptions)
                                          .replace(/\s/g, "")}
                                      </span>
                                    </div>
                                  </span>
                                </div>
                              )}
                              {ele?.messageType === "image" && (
                                <div className="message-content-parent">
                                  <span className="text-message position-relative">
                                    <img
                                      src={ele?.content}
                                      style={{ width: "100%", borderRadius:"10px 10px 0px 10px", cursor:"pointer" }}
                                      alt="img"

                                    />
                                    <div
                                      className="timestamp-parent"
                                      style={{ backgroundColor: "red" }}
                                    >
                                      <span className="timestamp position-absolute top-100 start-100 translate-middle">
                                        {new Date(ele?.timestamp)
                                          .toLocaleString("en-US", timeOptions)
                                          .replace(/\s/g, "")}
                                      </span>
                                    </div>
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <div className="message-received" key={i}>
                              {ele?.messageType === "text" && (
                                <div className="message-content-parent">
                                  <span className="text-message position-relative">
                                    {ele?.content}
                                    <div
                                      className="timestamp-parent"
                                      style={{ backgroundColor: "red" }}
                                    >
                                      <span className="timestamp position-absolute top-100 start-100 translate-middle">
                                        {new Date(ele?.timestamp)
                                          .toLocaleString("en-US", timeOptions)
                                          .replace(/\s/g, "")}
                                      </span>
                                    </div>
                                  </span>
                                </div>
                              )}
                              {ele?.messageType === "image" && (
                                <div className="message-content-parent">
                                <span className="text-message position-relative" style={{}}>
                                  <img
                                    src={window.URL.createObjectURL(new Blob([ele?.content]))}
                                    style={{ width: "100%", borderRadius:"10px 15px 15px 0px", cursor:"pointer" }}
                                    alt="img"
                                  />
                                  <div
                                    className="timestamp-parent"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <span className="timestamp position-absolute top-100 start-100 translate-middle">
                                      {new Date(ele?.timestamp)
                                        .toLocaleString("en-US", timeOptions)
                                        .replace(/\s/g, "")}
                                    </span>
                                  </div>
                                </span>
                              </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </Row>
                  </InfiniteScroll>
                </div>
                <Row className="message-box" style={{ backgroundColor: "" }}>
                  <Col lg={1} style={{ width: "" }}>
                    {/* <ButtonToolbar> */}
                    <div>
                      <span style={{ marginRight: "0px" }}>
                        <i
                          className="bi bi-upload"
                          style={{ cursor: "pointer" }}
                          onClick={handleClick}
                        >
                          {" "}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            ref={hiddenFileInput}
                            style={{ display: "none" }} // Make the file input element invisible
                          />{" "}
                        </i>
                      </span>
                      <span className="" style={{ marginLeft: "2px" }}>
                        <OverlayTrigger
                          trigger="click"
                          placement="top"
                          overlay={popoverTop}
                        >
                          <i
                            className="bi bi-emoji-smile"
                            style={{ cursor: "pointer" }}
                          />
                        </OverlayTrigger>
                      </span>
                    </div>
                  </Col>
                  <Col lg={10}>
                    <Controller
                      control={control}
                      name="messageBox"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          color="white"
                          type="text"
                          placeholder="Type a message"
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
      <MediaUpload
        setShow={setShow}
        show={show}
        imgUrl={imgUrl}
        socket={socket}
        fileDetails={fileDetails}
        selectedSocketId={selectedSocketId}
      />
      <ToastContainer/>
    </div>
  );
};

export default Chatpage;
