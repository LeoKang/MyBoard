import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 text-center mt-8">
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} @TaeBbong. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
