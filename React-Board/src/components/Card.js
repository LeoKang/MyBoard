import React from "react";
import { Link } from "react-router-dom";
import { logger } from "../shared/Logger";

const Card = ({ post }) => {
  logger.render("Card", `Rendering card for post: "${post.title}" (PK: ${post.pk})`);
  
  const imageUrl = post.image || "https://blog.kakaocdn.net/dn/cVaw4d/btqDURwZDoX/q6XGmMMrktN33iW1v3gtMk/img.png";

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col w-full">
        <Link
          to={{
            pathname: "/detail/" + post.pk,
            state: { post: post },
          }}
          className="flex flex-col h-full"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
            <img
              src={imageUrl}
              alt={post.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-purple-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                @{post.profile?.nickname || "익명"}
              </p>
            </div>
            <div className="text-sm text-gray-600 line-clamp-2 mt-auto">
              {post.body}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
