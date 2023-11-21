import "./Chatpage.scss";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./../../Assest/Image/man.png";
import User from "./../../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import socket from "../Socket.js/index.js";
import 'react-perfect-scrollbar/dist/css/styles.css';
import AddFriend from "../Modal/AddFriend/index.js";
import axios from "axios";
import { setFriendList } from "../../OwnerReducer.js";
import { fetchMessages, getFriendsList } from "./ChatpageAction.js";
import Loader from "../Loader/Loader.js";
import { setLoginLoader } from "../Login/loginReducer.js";
import { addMessages, setMessages } from "./ChatpageReducers.js";



const Chatpage = () => {

  const [selectedSocketId, setselectedSocketId] = useState(null)
  const { ownerInfo, friendList } = useSelector(state => state.ownerInfo)
  const { loginLoading } = useSelector((state) => state.login);

  const { messages } = useSelector(state => state.chat)

  const { userName } = useSelector(state => state.login)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [showModal, setshowModal] = useState(false)
  const dispatch = useDispatch()
  const [messageLog, setMessageLog] = useState([{
    sender: 'Bhoop',
    recipient: 'Abhay',
    lastMsg: 'Hi',
    msgDateTime: '2023-11-13T08:30:12.789Z'
  }])
  const scrollContainerRef = useRef(null);

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({})
  const [data] = useState([
    { id: 1, name: "Vally", chatDetails: "", dsateTime: "Today" }
  ]);


  

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {

    if (ownerInfo != null) {
      getFriendsList(ownerInfo?.id, dispatch)
    }
    return () => {
    }
  }, [ownerInfo])


  socket.on('online', (data) => {
    let newArray = [];
    newArray = data?.filter(obj => obj?.user?.first_name?.toLowerCase() !== userName?.toLowerCase())
    setOnlineUsers(newArray)
  })
  
  useEffect(() => {

    socket.on('private-message-received', ({ message }) => {
      dispatch(addMessages(message))
    })    
  
    return () => {
      
    }
  }, [socket])
  


  React.useEffect(() => {
    socket.emit('abhay', { "name": userName })
  }, [])

  useEffect(() => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef?.current?.scrollHeight
    }
    
  }, [messages]);


  useEffect(() => {
    
    console.log("messages", messages)
  
    return () => {
      
    }
  }, [messages])
  
  


  const onMessageSent = (name) => {
    console.log("called", selectedSocketId)
    socket.emit('private-message', { socketId: selectedSocketId?.socketId, message: { senderId: ownerInfo?.id, receiverId: selectedSocketId?.user?.id, content: getValues('messageBox') } })
    setValue('messageBox', '')
  }

  React.useEffect(() => {
    return () => {
    }
  }, [selectedSocketId])

  React.useEffect(() => {
    // console.log(onlineUsers)
    return () => {
    }
  }, [onlineUsers])

  const selectSocketId = (ele) => {
    dispatch(setLoginLoader(true))
    setselectedSocketId(ele)
    console.log(ownerInfo?.id, ele?.user?.id)
    fetchMessages(ownerInfo?.id, ele?.user?.id, dispatch)
  }

  const addFriend = (ele) => {
    // console.log("ele",ele)
    setshowModal(true)
  }

  window.addEventListener('unload', function () {
    // console.log("unload")
    socket.disconnect()
  });
  window.addEventListener('beforeunload', function (e) {
    // console.log("before unload")
    socket.disconnect()
  });


  return (
    <div className="main">
      <Container className="container-div" key={1} >
        <Row className="my-2" key={1}>
          <Col lg={4} className="chat-list ">
            <Row>
              <Col className="logo">
                <img className="rounded-circle" src={Logo} width={"80px"} height={"80px"} alt="profile" />
              </Col>
            </Row>
            <Row>
              <Col className="name-title">{ownerInfo?.first_name}</Col>
            </Row>
            <Row>
              <Col className="search-chat">
                <input type="text" placeholder="Search chat " />
              </Col>
            </Row>
            <div className="infinite-scroll">
              <InfiniteScroll dataLength={data?.length} height={"calc(100vh - 300px)"} style={{ scrollbarWidth: "none" }}>
                {onlineUsers?.map((ele, i) => {
                  return (
                    <Col className="chat-list-item" key={ele?.id}>
                      <div className="item-content">
                        <Row>
                          <Col xs={2} sm={2} md="auto" lg={2} style={{ backgroundColor: "" }}>
                            <img src={User} className="rounded-circle" alt="..." />
                          </Col>
                          <Col xs={7} sm={8} md={7} lg={8} style={{ backgroundColor: "" }} onClick={() => selectSocketId(ele)}>
                            <Row style={{ backgroundColor: "" }}>
                              <span className="chat-item-username">{ele?.user?.first_name}</span>
                            </Row>
                            <Row style={{ backgroundColor: "" }}>
                              <span className="chat-details font-weight-light"> {messages && messages[messages?.length-1]?.content}</span>
                            </Row>
                          </Col>
                          <Col xs={3} sm={2} md={2} lg={2} style={{ backgroundColor: "" }}>
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
          {selectedSocketId && <Col lg={8}>
            <div className="chat-window">
              <div className="header">
                <Row className="header-row">
                  <Col md={10} lg={10} className="chat-window-header">
                    {selectedSocketId?.user?.first_name} {  !friendList?.some(item => item.friend_id === selectedSocketId?.user?.id) &&  <span
                      className="mx-2"
                      onClick={addFriend}
                      style={{ cursor: "pointer" }}>
                      <i className="bi bi-person-plus">
                      </i>
                    </span> } <span> </span>
                    
                  </Col>
                  <Col className="option-icon" md={2} lg={2}>
                    <i className="bi bi-three-dots-vertical mx-4"></i>
                    <i className="bi bi-camera-video"></i>
                  </Col>
                </Row>
              </div>
              <div ref={scrollContainerRef} style={{ overflowY: "auto", height: "calc(100vh - 180px)", marginBottom: "5px" }}>

                <InfiniteScroll
                  className="infinte-scroll"
                  dataLength={data?.length}
                >
                  <Row className="chat-box" style={{ backgroundColor: "", overflow: "" }}>
                    {messages?.map((ele, i) => {
                      if (ele?.senderId === ownerInfo?.id) {
                        return <div className="message-sent" key={i}>
                          <span>{ele?.content}</span>
                        </div>
                      }

                      else {
                        return <div className="message-received">
                          <span>
                            {ele?.content}
                          </span>
                        </div>
                      }
                    })}

                  </Row>
                </InfiniteScroll>
              </div>
              <Row className="message-box" style={{ backgroundColor: "" }}>
                <Col lg={11}>
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
                          if (e.key === 'Enter') {
                            onMessageSent()
                          }
                        }}
                      />
                    )}
                  />
                </Col>

                <Col lg={1} ><i className="bi bi-send" style={{ cursor: "pointer", color: "white" }} onClick={onMessageSent} ></i></Col>

              </Row>
            </div>
          </Col>}

        </Row>
        <AddFriend showModal={showModal} setshowModal={setshowModal} friend_id={selectedSocketId?.user?.id} />
      </Container>
      {loginLoading && <Loader/>}

    </div>
  );
};

export default Chatpage;
