//pagina de renderizado de los menues
"use client";
import { CreateMenuButton } from "./components/Create_Menu_Button";
import { Navbar } from "./components/navbar";
import { Manrope } from "next/font/google";
import { MenuList } from "./components/Menu_List";
import Faq from "./components/Faq";
import { motion } from "framer-motion";

const manrope = Manrope({ subsets: ["latin"] });

const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <div className="w-full max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <CreateMenuButton />
          </motion.div>
          <MenuList />
        </div>
        <div className="mt-auto pt-8">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default page;
