import React from "react";
import { Home } from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import "./SidebarList.css";
import SideBar from "./components/Sidebar/SideBar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";

export const App = () => {
  return (
    <SideBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/music" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<> not found</>} />
      </Routes>
    </SideBar>
  );
};
