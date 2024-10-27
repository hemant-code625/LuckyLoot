import React from "react";
import Wheel from "../components/Wheel";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 transition-colors duration-500">
      <Wheel />
    </div>
  );
};

export default Home;
