"use client";
import React from "react";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { useRouter } from "next/navigation";

const sidebarItems = [
    { icon: <MdOutlineDashboard  />, label: "Feed", route: "/" },
    { icon: <IoIosAddCircleOutline />, label: "Post", route: "/posts/create" },
    { icon: <SiGnuprivacyguard />, label: "SignUp", route: "/auth/register" },
];

export default function SideBar() {
  const router = useRouter();

  // Only update login state on explicit login/logout actions

  const handleLogout = () => {
    // Clear all cookies (token and others)
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;');
    });
    router.push("/auth/login");
  };

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
        <div key={item.label} style={{ margin: "24px 0", color: "#75787f", fontSize: 24, cursor: "pointer" }} title={item.label} onClick={() => router.push(item.route)}>
          {item.icon}
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div
        style={{ marginBottom: 32, color: "#75787f", fontSize: 24, cursor: "pointer" }}
        title="Logout"
        onClick={handleLogout}
      >
        <MdOutlineLogout />
      </div>
    </aside>
  );
}
