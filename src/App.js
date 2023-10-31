import { Login } from "./Pages/Login";
import { Provider } from "react-redux";
import { store } from "./Store";
import "./style.scss";
import { Card, Col } from "react-bootstrap";
import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { SmileOutlined, CaretLeftOutlined, CaretRightOutlined, RobotFilled } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Chatpage from "./Components/Chatpage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { DeletedFreelancer } from "./Components/DeletedFreelancer";

function App() {
  const [theme, setTheme] = useState("light");
  const handleThemeChange = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed((prev) => !prev);
  };

  return (
    <Provider store={store}>
      {/* <Layout> */}
      {/* <Header> */}
      {/* <Sidebar /> */}
      {/* </Header> */}
      {/* <div className={theme}> */}
      {/* <div className="theme-switch row justify-content-md-center">
          <Col xs lg="auto">
            {" "}
            Light
          </Col>
          <Col md="auto">
            <div className="theme-switch form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleThemeChange} />
            </div>
          </Col>
          <Col xs lg="auto">
            Dark
          </Col>
        </div>*/}
      {/* <Login /> */}
      {/* <Chatpage/> */}
      {/* <Content>This is content.</Content> */}

      {/* </div>
      </Layout> */}

      {/* <Layout>
        <Header style={{ background: "transparent" }}> <Sidebar /></Header>
        <Layout>
          <Content>Content</Content>

          <Header className="site-layout-background" style={{ padding: 10, background: "transparent" }}>
            {React.createElement(collapsed ? CaretLeftOutlined : CaretRightOutlined, {
              className: "trigger",
              onClick: toggle,
            })}
          </Header>
          <Sider theme={"light"} width={300} trigger={null} breakpoint="lg" collapsedWidth="0" collapsed={collapsed}
            reverseArrow={true} style={{ background: "transparent" }}>
            <div className="logo" />


            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>

              </Card.Body>
            </Card>
          </Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout> */}

      <HashRouter>
        <Routes>
        <Route path='/' element={<Login/>}/>
          <Route path='freelancers'>
            <Route index element={<DeletedFreelancer/>} />
            <Route path="notify-freelancer" element={<Chatpage/>}/>
            <Route path="approve-freelancer" element={<Sidebar/>}/>
            <Route path="deleted-freelancer" element={<DeletedFreelancer/>}/>
          </Route>
        </Routes>
      </HashRouter>


    </Provider>
  );
}

export default App;
