import React from "react";
import Github from "./../../Assest/Image/github-pink.png";
import "./Sidebar.scss";
import { Menu } from "antd";

const Sidebar = () => {
  const handleMainMenu = (second) => {};
  const goToNotification = (second) => {};
  const setViewText = (second) => {};
  const setViewProfile = (second) => {};
  return (
    
    <div className="app-main-menu-container">
      <div className="row w-100">
        <div className="col-1">
          <div className="app-logo-container cursor-pointer">{/* <img src={Logo} alt="" /> */}</div>
        </div>
        <div className="col-8">
          <Menu onClick={(e) => handleMainMenu(e)} className="app-menu-theme" mode="horizontal" defaultSelectedKeys={[]}>
            {new Array(6).fill(null).map((item) => {
              return (
                <Menu.Item key={item?.id}>
                  <div className="icon">
                    <img src={Github} />
                  </div>
                  <span className="menu-title">Github</span>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>

        <div className="col-3 ">
          <div className="right-align-view">
            <div className="notification-icon" onMouseEnter={() => setViewText(true)} onMouseLeave={() => setViewText(false)}>
              <div className="hamburger-icon" style={{ display: "flex", alignContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <ul className="dropdown">
                  {new Array(5).fill(null).map((item) => {
                    return (
                      <li>
                        <div className="dropdown-li">
                          <div className="icon">
                            <img src={Github} />
                          </div>
                          <span className="menu-title">Github</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div onClick={goToNotification}>
              <div className="notification-icon" onMouseEnter={() => setViewText(true)} onMouseLeave={() => setViewText(false)}>
                <div className="" style={{ display: "flex", alignContent: "center" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="user-profile-view" onMouseEnter={() => setViewProfile(true)} onMouseLeave={() => setViewProfile(false)}>
              <div className="user-profile-name  cursor-pointer "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
