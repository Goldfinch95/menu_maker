import React from "react";
import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/Info_Card";
const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center py-8 px-10 grow sm:px-4  sm:justify-center">
        <InfoCard />
      </div>
    </div>
  );
};

export default page;