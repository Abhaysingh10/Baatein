import React, { useState } from "react";
import "./Chatpage.scss";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./../Assest/Image/man.png";
import User from "./../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";
import io from 'socket.io-client'
const socket = io('http://localhost:3000') 
const Chatpage = () => {
  const [data, setData] = useState([
    { id: 1, name: "Vally", chatDetails: "", dsateTime: "Today" },
    { id: 2, name: "Ludvig", chatDetails: "", dateTime: "Today" },
    { id: 3, name: "Krishnah", chatDetails: "", dateTime: "Yesterday" },
    { id: 4, name: "Vivian", chatDetails: "", dateTime: "15/09/2023" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 4, name: "Vivian", chatDetails: "", dateTime: "15/09/2023" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 4, name: "Vivian", chatDetails: "", dateTime: "15/09/2023" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
  ]);


  React.useEffect(() => {
  console.log("effect called")
    socket.on('connect', (message)=>{
      alert('connected')
    })
    return () => {
      
    }
  }, [])
  

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
                <Col className="name-title">Abhay Singh</Col>
              </Row>
              <Row>
                <Col className="search-chat">
                  <input type="text" placeholder="    Search chat " />
                </Col>
              </Row>
              <div className="infinite-scroll">
                <InfiniteScroll dataLength={data?.length} height={"calc(100vh - 300px)"} style={{scrollbarWidth:"none"}}>
                  {data.map((ele, i) => {
                    return (
                      <>
                        <Col className="chat-list-item">
                          <div className="item-content">
                            <Row>
                              <Col xs={2} sm={2} md="auto" lg={2} style={{ backgroundColor: "" }}>
                                <img src={User} class="rounded-circle" alt="..." />
                              </Col>
                              <Col xs={7} sm={8} md={7} lg={8} style={{ backgroundColor: "" }}>
                                <Row style={{ backgroundColor: "" }}>
                                  <span className="chat-item-username">{ele?.name}</span>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                  <span className="chat-details">Lorem ipsum dolor sit amet consectetur adipisicing</span>
                                </Row>
                              </Col>
                              <Col xs={3} sm={2} md={2} lg={2} style={{ backgroundColor: "" }}>
                                <span className="date-time">{ele.dateTime}</span>
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
                      Vally
                    </Col>
                    <Col className="option-icon" md={2} lg={2}>
                      <i className="bi bi-three-dots-vertical mx-4"></i>
                      <i className="bi bi-camera-video"></i>
                    </Col>
                  </Row>
                </div>
                <Container>
                  <InfiniteScroll className="infinte-scroll" dataLength={data?.length} height={"calc(100vh - 230px)"} style={{ scrollbarWidth:"none", scrollbarColor: "rgb(52, 88, 87) rgb(27, 60, 78)" }}>
                    <Row className="chat-box" style={{ backgroundColor: "" }}>
                      <div className="message-received">
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quibusdam veritatis libero inventore beatae impedit sapiente delectus deserunt doloribus corrupti,
                          laboriosam, obcaecati, deleniti accusantium repellendus eligendi reprehenderit. Praesentium, tenetur provident.
                        </span>
                      </div>
                      <div className="message-received">
                        <span>there ?</span>
                      </div>
                      <div className="message-sent">
                        <span>Hi when can we meet ?</span>
                      </div>
                      <div className="message-received">
                        <span>CCD at 3pm ?</span>
                      </div>
                      <div className="message-sent">
                        <span>Done</span>
                      </div>
                      <div className="message-received">
                        <span>See you then !</span>
                      </div>
                      <div className="message-sent">
                        <span>Done</span>
                      </div>
                      <div className="message-received">
                        <span>See you then !</span>
                      </div>
                      <div className="message-sent">
                        <span>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime obcaecati fugit sit natus at vero quia illum tempore odio exercitationem modi, doloribus veritatis nulla quam
                          quisquam sequi ullam molestiae soluta?
                        </span>
                      </div>
                      <div className="message-received">
                        <span>See you then !</span>
                      </div>
                      
                    </Row>
                  </InfiniteScroll>
                </Container>
                <Row className="message-box" style={{ backgroundColor: "" }}>
                  <Col lg={11}><input className="ml-auto" />{" "}</Col>
                  <Col lg={1} ><i class="bi bi-send"></i></Col>
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
