import React, { useState } from "react";
import "./Chatpage.scss";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./../Assest/Image/man.png";
import User from "./../Assest/Image/insta.png";
import InfiniteScroll from "react-infinite-scroll-component";

const Chatpage = () => {
  const [data, setData] = useState([
    { id: 1, name: "Vally", chatDetails: "", dateTime: "Today" },
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
                <InfiniteScroll dataLength={data?.length} height={"calc(100vh - 300px)"}>
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
                    <Col md={10} lg={10} className="chat-window-header" >
                      Vally
                    </Col>
                    <Col className="option-icon" md={2} lg={2}>
                      <i class="bi bi-three-dots-vertical"></i>
                    </Col>
                    {/* <hr/> */}
                  </Row>
                  {/* <Row><hr/></Row> */}
                </div>
                  <Row className="chat-box">
asdf
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
