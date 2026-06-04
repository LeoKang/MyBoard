import React from "react";

const Comment = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            댓글 작성
          </label>
          <div className="relative">
            <textarea
              className="w-full rounded-xl border border-gray-200 p-4 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none transition-all duration-200 bg-white"
              placeholder="댓글을 입력하세요..."
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-sm hover:shadow">
            입력
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comment;
