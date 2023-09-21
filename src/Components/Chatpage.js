import React from "react";
import "./Chatpage.scss";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./../Assest/Image/man.png";
import User from "./../Assest/Image/insta.png";
const Chatpage = () => {
  return (
    <>
      <div className="main">
        <Container>
          <Row>
            <Col className="chat-list">
              <Row>
                <Col className="logo">
                  <img className="rounded-circle" src={Logo} width={"80px"} height={"80px"} />
                </Col>
              </Row>
              <Row>
                <Col className="logo name-title">Abhay Singh</Col>
              </Row>
              <Row>
                <Col className="search-chat">
                  <input type="text" placeholder="    Search chat " />
                </Col>
              </Row>

              {[
                { id: 1, name: "Vally", chatDetails: "", dateTime:"Today" },
                { id: 2, name: "Ludvig", chatDetails: "", dateTime:"Today" },
                { id: 3, name: "Krishnah", chatDetails: "", dateTime:"Yesterday" },
                { id: 4, name: "Vivian", chatDetails: "", dateTime:"15-09-2023" },
                { id: 5, name: "Shanna", chatDetails: "", dateTime:"10-09-2023" },
              ].map((ele, i) => {
                return (
                  <>
                    <Row>
                      <Col className="chat-list-item">
                        <div className="item-content">
                          <Row>
                            <Col md="auto" style={{ backgroundColor: "" }}>
                              <img src={User} class="rounded-circle" alt="..." />
                            </Col>
                            <Col style={{ backgroundColor: "" }}>
                              <Row style={{ backgroundColor: "" }}>
                                <span className="chat-item-username">{ele?.name}</span>
                              </Row>
                              <Row style={{ backgroundColor: "" }}>
                                <span className="chat-details">Lorem ipsum dolor sit amet consectetur adipisicing</span>
                              </Row>
                            </Col>
                            <Col md="auto">
                              <span className="date-time">{ele.dateTime}</span>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </>
                );
              })}
            </Col>
            <Col>Col2</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chatpage;
