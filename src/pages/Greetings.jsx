import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

function Greetings() {
  return (
    <div className="relative h-screen bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 px-1.5">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 bg-[length:60px_60px] opacity-30 md:block hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(252 211 77 / 0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(252 211 77 / 0.10) 1px, transparent 1px)
          `,
        }}
      />

      {/* Decorative Shapes */}
      <div
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-yellow-300/40 to-amber-400/30 rounded-full blur-2xl animate-pulse
      md:block hidden"
      />
      <div
        className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-amber-300/40 to-orange-400/30 rounded-full blur-3xl animate-pulse
        md:block hidden"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-amber-300/30 rounded-full blur-xl animate-pulse
        md:block hidden"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-orange-300/30 to-yellow-300/20 rounded-full blur-lg animate-pulse
        md:block hidden"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Decorative Shapes with borders */}
      <div
        className="absolute top-32 right-20 w-16 h-16 border-2 border-yellow-300/40 rotate-z-180 animate-spin md:block hidden"
        style={{ animationDuration: "5s" }}
      />
      <div
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-amber-400/30 to-yellow-300/30 transform rotate-12 animate-bounce
        md:block hidden"
        style={{ animationDelay: "1.5s", animationDuration: "3s" }}
      />
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center flex-col w-[750px] mx-auto space-y-12">
        {/* Greetings Content */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h1
            className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-l from-yellow-600 to-yellow-400 bg-clip-text text-transparent tracking-wide
            text-center"
          >
            Welcome To NexusTrade
          </h1>
          <p className="text-xl text-gray-400 sm:w-[550px] mx-auto text-center">
            This is a personal trading platform where you can practice trading
            before going to the real-life trading.
          </p>
        </motion.div>

        {/* Rotating Shape */}
        <div className="pyramid-loader">
          <div className="wrapper">
            <span className="side side1"></span>
            <span className="side side2"></span>
            <span className="side side3"></span>
            <span className="side side4"></span>
            <span className="shadow"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[10px] bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 750 }}
            transition={{ duration: 2, delay: 1 }}
            className="w-full h-[10px] bg-gradient-to-l from-yellow-600 to-yellow-400 rounded-full"
          />
        </div>

        {/* Continue Button */}
        <Link to={"/auth"}>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="w-[500px] h-[50px] bg-gradient-to-l from-yellow-600 to-yellow-400 rounded-xl text-lg font-semibold"
          >
            Continue
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Greetings;
