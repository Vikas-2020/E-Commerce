import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
        </p>
        <p className="text-sm mt-2 sm:mt-0">
          Built with ❤️ by Vikas
        </p>
      </div>
    </footer>
  );
};

export default Footer;
