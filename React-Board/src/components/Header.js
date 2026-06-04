import React from "react";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faSignInAlt, faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logger } from "../shared/Logger";

const Header = ({ doLogout, isLogin }) => {
  logger.render("Header", `isLogin = ${isLogin}`);
  
  const handleLogout = (event) => {
    logger.info("Header", "handleLogout triggered, clearing credentials in localStorage");
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    localStorage.setItem("username", null);
    doLogout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              게시판
            </span>
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="/new"
            className="inline-flex items-center px-4 py-2 border border-purple-200 text-sm font-semibold rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1.5 text-purple-600" />
            새 글 작성
          </a>

          {isLogin ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-1.5" />
              로그아웃
            </button>
          ) : (
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-1.5" />
              로그인
            </a>
          )}

          <a
            href="/profile"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <FontAwesomeIcon icon={faUserCircle} className="mr-1.5 text-gray-500" />
            프로필
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
