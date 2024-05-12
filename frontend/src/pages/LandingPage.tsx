import { Link } from "react-router-dom"
import { BackgroundBeams } from '../components/ui/background-beams';
import React from 'react';

const LandingPage: React.FC = () => {

  return (
    <div>
      <div className="h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            <span className='text-white'>Medium</span> a way to know <span className='text-white'>World</span>
          </h1>
          <p></p>
          <p className="text-white  max-w-lg mx-auto my-2 text-md text-center relative z-10">
            Your go-to platform for reading and publishing articles..
          </p>
          <div className='flex justify-center gap-4 pt-3'>
          <Link to={"/signin"}>
            <button className="inline-flex h-12 relative z-10  animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Sign In
            </button>
            </Link>
            <Link to={"/signup"}>
            <button className="inline-flex  relative z-10  h-12 animate-shimmer items-center justify-center rounded-md border border-white-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Sign Up
            </button>
            </Link>

          </div>
        </div>
        <BackgroundBeams />
      </div>
      </div>
  );
};

export default LandingPage;
