import Image from "next/image";
const page = () => {
    return (
       <div className="min-h-screen w-full flex flex-col bg-[#5d6d7c]">
             <Image
               src="/under_construction.jpg"
               alt="Descripción"
               fill
               className="object-contain"
               priority // opcional, para cargar rápido
             />
           </div>
    );
};

export default page;