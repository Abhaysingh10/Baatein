import React, { useEffect, useRef, useState } from "react";
import "./Chatpage.scss";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./../Assest/Image/man.png";
import User from "./../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import socket from "./Socket.js";
import ScrollToBottom from "react-scroll-to-bottom";
// var socket;
const Chatpage = () => {

  const [message, setMessage] = useState()
  const [selectedSocketId, setselectedSocketId] = useState()
  const { userName } = useSelector(state => state.login)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [messageLog, setMessageLog] = useState([])
  const scrollContainerRef = useRef(null);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({})
  const [data, setData] = useState([
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
  
  

  socket.on('online', (data) => {
    let newArray = [];
    newArray = data?.filter(obj=> obj?.user !== userName)
    setOnlineUsers(newArray)
  })

  socket.on('private-message', ({message})=>{
    console.log("received message", message)
    setMessageLog(message)
  })

  React.useEffect(() => { 
    socket.emit('abhay', { "name": userName })
  }, [])

  useEffect(() => {
    // Scroll to the bottom when data changes
    // alert('recevied')
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, [messageLog]);
  

  const onChange = () => {}


  const onMessageSent = (name) => {

    socket.emit('private-message', {socketId:selectedSocketId?.socketId, message:{ sender: userName, recipient:selectedSocketId?.user , msgBody: getValues('messageBox'), msgDateTime: new Date() }})
    setValue('messageBox', '')
  }

  React.useEffect(() => {
    console.log(selectedSocketId)
    return () => {
    }
  }, [selectedSocketId])
  
  const selectSocketId = (ele) => { 
    setselectedSocketId(ele)
    console.log("ele",ele)
   }
 
  window.addEventListener('unload', function () {
    console.log("unload")
    socket.disconnect()
  });
  window.addEventListener('beforeunload', function (e) {
    console.log("before unload")
    socket.disconnect()
  });


  return (
    <>
      <div className="main">
        <Container className="container" key={1}>
          <Row className="my-4" key={1}>
            <Col lg={4} className="chat-list ">
              <Row>
                <Col className="logo">
                  <img className="rounded-circle" src={Logo} width={"80px"} height={"80px"} />
                </Col>
              </Row>
              <Row>
                <Col className="name-title">{userName}</Col>  
              </Row>
              <Row>
                <Col className="search-chat">
                  <input type="text" placeholder="Search chat " />
                </Col>
              </Row>
              <div className="infinite-scroll">
                <InfiniteScroll  dataLength={data?.length} height={"calc(100vh - 300px)"} style={{ scrollbarWidth: "none" }}>
                  {onlineUsers.map((ele, i) => {
                    console.log(ele)
                    return (
                      <>
                        <Col className="chat-list-item">
                          <div className="item-content">
                            <Row>
                              <Col xs={2} sm={2} md="auto" lg={2} style={{ backgroundColor: "" }}>
                                <img src={User} class="rounded-circle" alt="..." />
                              </Col>
                              <Col xs={7} sm={8} md={7} lg={8} style={{ backgroundColor: "" }} onClick={()=>selectSocketId(ele)}>
                                <Row style={{ backgroundColor: "" }}>
                                  <span className="chat-item-username">{ele?.user}</span>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                  <span className="chat-details">{ele?.socketId}</span>
                                </Row>
                              </Col>
                              <Col xs={3} sm={2} md={2} lg={2} style={{ backgroundColor: "" }}>
                                <span className="date-time">ele.dateTime</span>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </>
                    );
                  })}
                </InfiniteScroll>
              </div>
            </Col>
            <Col lg={8} style={{ backgroundColor: " ", backdropFilter: "blur(5px)" }}>
              <div className="chat-window">
                <div className="header">
                  <Row className="header-row">
                    <Col md={10} lg={10} className="chat-window-header">
                      {selectedSocketId?.user}
                    </Col>
                    <Col className="option-icon" md={2} lg={2}>
                      <i className="bi bi-three-dots-vertical mx-4"></i>
                      <i className="bi bi-camera-video"></i>
                    </Col>
                  </Row>
                </div>
                <Container>
                  <InfiniteScroll 
                  inverse={false} 
                  ref={scrollContainerRef}  
                  className="infinte-scroll" 
                  dataLength={data?.length} 
                  height={"calc(100vh - 230px)"} 
                  style={{ scrollbarWidth: "none", scrollbarColor: "rgb(52, 88, 87) rgb(27, 60, 78)", 
                }}>
                    
                     <ScrollToBottom>
                    <Row className="chat-box" style={{ backgroundColor: " ", overflow:"" }}>
                      {messageLog?.map((ele)=>{
                        if (ele?.sender === userName) {
                          return <div className="message-sent">
                           <span>{(ele?.msgBody).trim()}</span>
                         </div>
                         }
                         else{
                          return <div className="message-received">
                          <span>
                            {(ele?.msgBody).trim()}
                          </span>
                        </div>  
                         }
                      })}
                      
                    </Row>
                  </ScrollToBottom>
                  </InfiniteScroll>
                </Container>
                <Row className="message-box" style={{ backgroundColor: "" }}>
            
               
                <Col lg={11}>
                  <Controller
                    control={control}
                    name="messageBox"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        type="text"
                        placeholder="Type your message here !"
                        onChange={onChange}
                        value={value}
                        onKeyDown={(e)=>{
                          if (e.key === 'Enter') {
                            console.log("Enter tapped")
                            onMessageSent()
                          }
                        }}
                      />
                    )}
                  />
                </Col>
                <Col lg={1} ><i class="bi bi-send"  style={{ cursor: "pointer" }} onClick={onMessageSent} ></i></Col>
        
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chatpage;
