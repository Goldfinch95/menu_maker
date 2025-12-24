'use client'

import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/Info_Card";

const editPage = () => {
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <InfoCard />
      </div>
    </div>
  );
};

export default editPage;
