import React from "react";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";



const sidebarItems = [
  { icon: <MdOutlineDashboard  />, label: "Dashboard" },
  { icon: <IoIosAddCircleOutline />, label: "Feed" },
];

const logoutItem = { icon: <MdOutlineLogout />, label: "Logout" };

export default function SideBar() {
  return (
    <aside style={{
      width: 70,
      background: "#181818",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 16,
      borderRight: "1px solid #222"
    }}>
      <div style={{ marginBottom: 24 }}>
        <img src="/favicon.ico" alt="Logo" style={{ width: 32, height: 32 }} />
      </div>
      {sidebarItems.map((item, idx) => (
        <div key={item.label} style={{ margin: "24px 0", color: "#75787f", fontSize: 24, cursor: "pointer" }} title={item.label}>
          {item.icon}
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ marginBottom: 32, color: "#75787f", fontSize: 24, cursor: "pointer" }} title={logoutItem.label}>
        {logoutItem.icon}
      </div>
    </aside>
  );
}
