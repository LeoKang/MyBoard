import React from "react";
import { Post, Comment } from "../components/index";
import { logger } from "../shared/Logger";

const Detail = ({ post: routeProps }) => {
  const data = routeProps.location?.state?.post;
  const pk = routeProps.match?.params?.pk;

  logger.render("Detail", `Rendering detail view for post ID (PK): ${pk}`);
  logger.info("Detail", "Router navigation state payload:", { routeProps, data });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Post post={data} pk={pk} />
      <hr className="my-8 border-gray-200" />
      <Comment />
      <br />
    </div>
  );
};

export default Detail;
