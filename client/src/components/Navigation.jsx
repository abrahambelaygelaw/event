import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <div className="w-full flex justify-end">
        <div className=" flex p-3 justify-center items-center m-3 gap-3">
          <NavLink to="/dashboard">Add Event</NavLink>
          <NavLink to="/events">Events</NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
