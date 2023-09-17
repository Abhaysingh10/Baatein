
import { Login } from "./Pages/Login";
import { Provider } from "react-redux";
import { store } from "./Store";
import './style.scss'
function App() {
  // const [theme, settheme] = useState("light-mode");
  // const changeTheme = (e) => {
  //   if (e.target.checked) {
  //     settheme("dark-mode");
  //   } else {
  //     settheme("light-mode");
  //   }
  // };

  //  ussEffect(()=>{
  
  //  },[theme])


  

  return (
    <Provider store={store}>
      <div className=''>
        {/* <Form.Check type="switch" id="custom-switch" label="" onClick={changeTheme} /> */}
        <Login />
      </div>
    </Provider>
  );
}

export default App;
