import React from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logger } from "../shared/Logger";

const Post = ({ post }) => {
  logger.render("Post", `Rendering post details for: "${post?.title || "No Title"}"`);

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">로딩 중이거나 게시물이 존재하지 않습니다.</p>
      </div>
    );
  }

  const imageUrl = post.image || "https://wallpaperaccess.com/full/2586809.jpg";

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-sm">
              <p className="font-bold text-gray-900">
                @{post.profile?.nickname || "익명"}
              </p>
              <p className="text-xs text-gray-500">
                {post.category || "기타 카테고리"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-full transition duration-150">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
            </button>
            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-gray-50 rounded-full transition duration-150">
              <FontAwesomeIcon icon={faShareAlt} className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">
          <img
            src={imageUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="prose max-w-none text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
          {post.body}
        </div>
      </div>
    </article>
  );
};

export default Post;
