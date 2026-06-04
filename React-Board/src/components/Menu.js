import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="flex justify-center space-x-8 border-b border-gray-200 py-4 mb-6 bg-white w-full">
      <NavLink
        exact
        to="/"
        className="text-gray-500 hover:text-purple-600 pb-2 px-1 text-sm font-medium transition-all duration-200"
        activeClassName="text-purple-600 border-b-2 border-purple-600 font-semibold"
      >
        메인 피드
      </NavLink>
      <NavLink
        exact
        to="/like"
        className="text-gray-500 hover:text-purple-600 pb-2 px-1 text-sm font-medium transition-all duration-200"
        activeClassName="text-purple-600 border-b-2 border-purple-600 font-semibold"
      >
        저장한 글
      </NavLink>
      <NavLink
        exact
        to="/my"
        className="text-gray-500 hover:text-purple-600 pb-2 px-1 text-sm font-medium transition-all duration-200"
        activeClassName="text-purple-600 border-b-2 border-purple-600 font-semibold"
      >
        내 글
      </NavLink>
    </nav>
  );
};

export default Menu;
