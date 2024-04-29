import React from 'react';
import { Link } from "react-router-dom"

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Medium Clone</h1>
        <p className="text-lg mb-8">Your go-to platform for reading and publishing articles.</p>
        <div className="flex flex-col sm:flex-row gap-4">
        <Link to={"/signup"}>
          <button className="bg-white text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
            Sign Up
          </button>
          </Link>
        <Link to={"/signin"}>
          <button className="bg-transparent text-white border border-white hover:bg-white hover:text-black font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
            Sign In
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
