import React from "react";
import { Redirect } from "react-router-dom";
import { Form } from "../components/index";

const New = ({ isLogin }) => {
  if (isLogin === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        새 글 작성
      </h2>
      <Form />
      <br />
    </div>
  );
};

export default New;
