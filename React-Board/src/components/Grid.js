import React from "react";
import Card from "./Card";
import { logger } from "../shared/Logger";

const Grid = ({ posts }) => {
  logger.render("Grid", `Rendering grid with ${posts ? posts.length : 0} posts`);

  if (posts && posts.length > 0) {
    return (
      <div className="flex flex-wrap -mx-4">
        {posts.map((post, index) => (
          <Card post={post} key={post.pk || index} />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">등록된 게시글물이 없습니다.</p>
    </div>
  );
};

export default Grid;
