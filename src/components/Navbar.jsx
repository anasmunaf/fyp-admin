/** @format */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topical from "./topical";
import Yearly from "./yearly";
import SideBar from "./Drawer";
import NewYear from "./NewYear";
import UpdateYear from "./updateYear";

const Navbar = () => {
  return (
    <React.Fragment>
      <SideBar />
      <Routes>
        <Route path='/' element={<Navigate to='/yearly' />} />
        <Route path='/yearly' element={<Yearly />} />
        <Route path='/yearly/new' element={<NewYear />} />
        <Route path='/topical' element={<Topical />} />
        <Route path='/yearly/:id' element={<UpdateYear />} />
      </Routes>
    </React.Fragment>
  );
};

export default Navbar;
