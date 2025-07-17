import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 200;

export default function SideBar() {
  const menuItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "My Records", icon: "📄" },
    { label: "New Report", icon: "➕" },
    { label: "Profile", icon: "👤" },
    { label: "Logout", icon: "🚪" },
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
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
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
