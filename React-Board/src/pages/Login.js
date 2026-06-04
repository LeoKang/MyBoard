import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logger } from "../shared/Logger";

const Login = ({ doLogin, isLogin }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    logger.info("Login", `Submitting credentials for user: ${username}`);
    logger.api("POST", `${API_BASE_URL}/users/login/`, { username });
    axios
      .post(`${API_BASE_URL}/users/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status < 300) {
          logger.success("Login", `Login successful for user: ${username}`);
          doLogin();
          localStorage.setItem("token", response.data.token);
          if (response.data.UserID) {
            localStorage.setItem("userId", response.data.UserID);
          }
          localStorage.setItem("username", username);
          history.push("/");
        }
      })
      .catch((error) => {
        logger.error("Login", "Login failed due to error", error);
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            서비스 이용을 위해 로그인해 주세요.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                아이디
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </div>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요."
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="*******"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-sm hover:shadow"
            >
              로그인
            </button>
          </div>

          <div className="text-center mt-2">
            <a
              href="/register"
              className="text-sm font-semibold text-purple-600 hover:text-purple-500"
            >
              아직 회원이 아니신가요? 회원가입
            </a>
          </div>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">또는</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
            <FontAwesomeIcon icon={faGithub} className="mr-2 text-base text-gray-900" />
            Github
          </button>
          <button className="inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
            <FontAwesomeIcon icon={faFacebook} className="mr-2 text-base text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
