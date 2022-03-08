/** @format */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topical from "./topical";
import Yearly from "./yearly";
import SideBar from "./Drawer";
import NewYear from "./NewYear";
const Navbar = () => {
  return (
    <React.Fragment>
      <SideBar />
      <Routes>
        <Route index path='/' element={<Navigate to='/yearly' />} />
        <Route index path='/yearly' element={<Yearly />} />
        <Route path='/yearly/new' element={<NewYear />} />
        <Route path='/topical' element={<Topical />} />
      </Routes>
    </React.Fragment>
  );
};

export default Navbar;
