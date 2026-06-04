import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { logger } from "../shared/Logger";

const Form = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [likes, setLikes] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleBodyChange = (event) => setBody(event.target.value);
  const handleLikesChange = (event) => setLikes(event.target.value);

  const fileChangeHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      logger.info("Form", `File selected: ${file.name}`);
    }
  };

  const postClick = () => {
    const token = localStorage.getItem("token");
    logger.info("Form", "Submitting new post...", { title, category, likes });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }
    if (likes.trim()) {
      likes
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
        .forEach((id) => formData.append("likes", id));
    }

    logger.api("POST", `${API_BASE_URL}/posts/`, { title, category, body });
    axios
      .post(`${API_BASE_URL}/posts/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        logger.success("Form", "Post creation succeeded", response.data);
        if (response.status < 300) {
          history.push("/");
        }
      })
      .catch((error) => {
        logger.error("Form", "Post creation failed", error);
      });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          제목
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          카테고리
        </label>
        <div className="relative">
          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-white appearance-none"
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="웹 프론트엔드">웹 프론트엔드</option>
            <option value="웹 백엔드">웹 백엔드</option>
            <option value="iOS 앱">iOS 앱</option>
            <option value="안드로이드 앱">안드로이드 앱</option>
            <option value="하이브리드 앱">하이브리드 앱</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          본문
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 resize-none"
          rows={8}
          name="body"
          value={body}
          onChange={handleBodyChange}
          placeholder="본문 내용을 입력하세요."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          좋아요 사용자 ID
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
          type="text"
          name="likes"
          value={likes}
          onChange={handleLikesChange}
          placeholder="예: 1, 2, 5"
        />
        <p className="text-xs text-gray-400 mt-1">
          쉼표(,)로 구분하여 여러 사용자 ID를 입력하세요.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          배경사진
        </label>
        <div className="flex items-center space-x-3">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-150 shadow-sm">
            파일 선택...
            <input
              type="file"
              name="image"
              onChange={fileChangeHandler}
              className="sr-only"
            />
          </label>
          <span className="text-sm text-gray-500 truncate max-w-xs">
            {imageName || "선택된 파일 없음"}
          </span>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-sm hover:shadow"
          onClick={postClick}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default Form;
