import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Grid } from "../components/index";
import { logger } from "../shared/Logger";

const Main = () => {
  const [posts, setPosts] = useState(null);

  const getPosts = () => {
    const token = localStorage.getItem("token");
    logger.info("Main", "Attempting to fetch posts...");
    logger.api("GET", `${API_BASE_URL}/posts/`);
    axios
      .get(`${API_BASE_URL}/posts/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        logger.success("Main", "Successfully loaded posts list", response.data);
        if (response.status < 300) {
          setPosts(response.data);
        }
      })
      .catch((error) => {
        logger.error("Main", "Failed to load posts list", error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  logger.render("Main", `Current posts count: ${posts ? posts.length : 0}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Grid posts={posts} />
    </div>
  );
};

export default Main;
