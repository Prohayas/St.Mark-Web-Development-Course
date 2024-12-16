import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="container mx-auto py-1 px-5 border-2 border-blue-700 rounded-lg">
          <ul className="flex gap-x-5 justify-between items-center">
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : "text-gray-800"
              }
            >
              <li>Posts</li>
            </NavLink>
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : "text-gray-800"
              }
            >
              <li>Todos</li>
            </NavLink>
            <li>Users</li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Navbar;
