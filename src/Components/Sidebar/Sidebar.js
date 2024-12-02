import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  BsFillPersonFill,
  BsFillGearFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
const role = localStorage.getItem("role");

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const role = localStorage.getItem("role") || "";
  return (
    <Sider width={200} className="sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<BsFillPersonFill />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        {role == "admin" && (
          <Menu.Item key="4" icon={<BsFillChatDotsFill />}>
            <Link to="/team-leader">Team Leader</Link>
          </Menu.Item>
        )}
        {role == "team_leader" && (
          <Menu.Item key="4" icon={<BsFillChatDotsFill />}>
            <Link to="/recuiter-leader">Recruiter</Link>
          </Menu.Item>
        )}
        <SubMenu key="sub1" icon={<BsFillGearFill />} title="Settings">
          <Menu.Item key="2">
            <Link to="/settings/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/settings/account">Account</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="6"
          icon={<RiLogoutBoxFill />}
          onClick={sessionStorage.clear()}
        >
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
