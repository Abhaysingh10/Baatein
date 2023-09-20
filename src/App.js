import { Login } from "./Pages/Login";
import { Provider } from "react-redux";
import { store } from "./Store";
import "./style.scss";
import { Col } from "react-bootstrap";
import { useState } from "react";
function App() {
  const [theme, setTheme] = useState("light");
  const handleThemeChange = (e) => {
    
    if (e.target.checked) {
      setTheme('dark');
    }else{
      setTheme('light')
    }
  };

  return (
    <Provider store={store}>
      <div className={theme}>
        <div className="theme-switch row justify-content-md-center">
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
        </div>
        <Login />
        {/* <Sidebar /> */}
      </div>
    </Provider>
  );
}

export default App;
