import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 200;

export default function AdminSideBar() {
  const adminMenuItems = [
    { label: "Dashboard", icon: "📊", to: "/admin" },
    { label: "All Records", icon: "📁", to: "/admin/records" },
    { label: "Users", icon: "🧑‍🤝‍🧑", to: "/admin/users" },
    { label: "Settings", icon: "⚙️", to: "/admin/settings" },
    { label: "Logout", icon: "🚪", to: "/logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        position: "relative",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "relative",
        },
      }}
    >
      <Divider />
      <List>
        {adminMenuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <span
                style={{
                  fontSize: "1.2rem",
                  marginRight: "10px",
                  color: "#000",
                }}
              >
                {item.icon}
              </span>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
