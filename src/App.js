// import { Login } from "./../";
import { Provider } from "react-redux";
import { store } from "./Store";
import "./style.scss";
import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Chatpage from './Components/Chatpage/Chatpage'
import Sidebar from './Components/Sidebar/Sidebar'
import { Login } from "./Components/Login";
import 'react-toastify/dist/ReactToastify.css';
import VideoCall from "./Components/VideoCall";

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
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleThemeChange} />
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
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path="/" element={<Login/>}/>
        <Route path="/chat" element={<Chatpage/>}/>
        {/* <Route path="/video-call" element={<VideoCall/}/> */}
          <Route path='freelancers'>
            {/* <Route index element={<Dele/>} /> */}
            <Route path="approve-freelancer" element={<Sidebar/>}/>
            {/* <Route path="deleted-freelancer" element={<DeletedFreelancer/>}/> */}
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
