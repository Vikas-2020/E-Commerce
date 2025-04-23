import React from "react";

const About = () => {
  return (
    <div className="min-h-[72.7vh] px-6 py-16 bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 mb-4">
          Welcome to <span className="text-yellow-500 font-semibold">🛍️ E-Commerce</span>, your number one source for all things shopping. We're dedicated to giving you the very best experience, with a focus on quality, customer service, and uniqueness.
        </p>
        <p className="text-gray-600 mb-4">
          Founded in 2025 by Vikas, our store has come a long way from its beginnings. When Vikas first started out, his passion for clean and modern e-commerce experiences drove him to start building this platform.
        </p>
        <p className="text-gray-600">
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don’t hesitate to contact us.
        </p>
        <p className="mt-6 text-sm text-gray-500 italic">— The E-Commerce Team</p>
      </div>
    </div>
  );
};

export default About;
