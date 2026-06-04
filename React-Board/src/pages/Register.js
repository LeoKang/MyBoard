import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logger } from "../shared/Logger";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    logger.info("Register", `Attempting to register username: ${username}`);
    logger.api("POST", `${API_BASE_URL}/users/register/`, { username, email });
    axios
      .post(`${API_BASE_URL}/users/register/`, {
        username: username,
        email: email,
        password: password,
        password2: password2,
      })
      .then((response) => {
        logger.success("Register", "Registration succeeded", response.data);
        history.push("/login");
      })
      .catch((error) => {
        logger.error("Register", "Registration failed", error);
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            계정을 생성하여 서비스를 시작하세요.
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
                이메일
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </div>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="*******"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  name="password2"
                  value={password2}
                  onChange={handlePassword2Change}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-sm hover:shadow"
            >
              회원가입
            </button>
          </div>

          <div className="text-center mt-2">
            <a
              href="/login"
              className="text-sm font-semibold text-purple-600 hover:text-purple-500"
            >
              이미 회원이신가요? 로그인
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
