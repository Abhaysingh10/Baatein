import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";


function App() {
  const [theme, settheme] = useState('light-mode')
  const changeTheme = (e) => {
    if (e.target.checked) {
      settheme('dark-mode')
    } else {
      settheme('light-mode')

    }
  }

  return (
    <div className={`${theme}`} style={{ display: "flex", margin: "auto", height: "620px",borderColor: "red" }}>
      <Container  style={{ width: "20rem", margin: "auto", bottom: "", borderColor: "red" }}>
        <Card className="card-parent" style={{border:"0px solid "}}>
          <Card.Body  className={`${theme}`}   >
            <Card.Title>Theme toggle</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label=""
              onClick={changeTheme}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
