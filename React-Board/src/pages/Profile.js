import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { logger } from "../shared/Logger";

const Profile = ({ isLogin }) => {
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [subjects, setSubjects] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const fileChangeHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setImage(file.name);
    }
  };

  const updateClick = (event) => {
    event.preventDefault();
    if (isUpdate === true) {
      updateProfile();
    } else {
      setIsUpdate(true);
    }
  };

  const updateProfile = () => {
    const token = localStorage.getItem("token");
    console.log("[*] updateProfile");
    const formData = new FormData();
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("nickname", nickname);
    formData.append("position", position);
    formData.append("subjects", subjects);

    logger.api("PATCH", `${API_BASE_URL}/users/profile/`, { formData });
    axios
      .patch(`${API_BASE_URL}/users/profile/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "Authorization": `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status < 300) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.error("Failed to update profile", err);
      });
  };

  const getProfile = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("[*] getProfile");
    logger.api("GET", `${API_BASE_URL}/users/profile/${userId}`);
    axios
      .get(`${API_BASE_URL}/users/profile/${userId}`, {
        headers: {
          "Authorization": `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status < 300) {
          setNickname(response.data.nickname || "");
          setPosition(response.data.position || "");
          setSubjects(response.data.subjects || "");
          setImage(response.data.image || "");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err);
      });
  };

  useEffect(() => {
    if (isLogin === true) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  if (isLogin === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center">
        {/* Profile Image View/Edit */}
        <div className="mb-6 flex flex-col items-center">
          {isUpdate ? (
            <div className="flex flex-col items-center">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm mb-2">
                사진 업로드
                <input
                  type="file"
                  name="image"
                  onChange={fileChangeHandler}
                  className="sr-only"
                />
              </label>
              <span className="text-xs text-gray-500 truncate max-w-xs">{image || "선택된 파일 없음"}</span>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500 p-1 bg-white shadow-sm mb-4">
              <img
                src={image || "https://blog.kakaocdn.net/dn/cVaw4d/btqDURwZDoX/q6XGmMMrktN33iW1v3gtMk/img.png"}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {/* Profile Texts */}
        <div className="w-full space-y-4">
          {!isUpdate ? (
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-extrabold text-gray-900">{nickname || "닉네임 없음"}</h1>
              
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                  #포지션 : {position || "미정"}
                </span>
                {subjects && subjects.split(",").map((subject, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100"
                  >
                    #주제 : {subject.trim()}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={updateClick}
                  className="inline-flex items-center px-6 py-2.5 border border-purple-200 text-sm font-semibold rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all duration-200"
                >
                  프로필 수정하기
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">닉네임</label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">포지션</label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  type="text"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="포지션을 입력하세요."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">기술 / 주제 (쉼표 구분)</label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  type="text"
                  name="subjects"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="예: React, Python, Django"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={updateClick}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-sm hover:shadow"
                >
                  완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
