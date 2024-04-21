import Image from "next/image";
import { SettingsIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-black h-screen overflow-y-auto">
     {/* header */}
     <header className="flex justify-between fixed top-0 text-white w-full p-5">
      <Image src="https://i.imgur.com/MCHWJZS.png" height={50} width={50} alt="logo" className="object-contain"/>
      <SettingsIcon
      size={40}
      className="p-2 m-2 rounded-full cursor-pointer bg-purple-600
      text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white
      "
      />
     </header>

     {/* form  */}
     <form className="flex flex-col bg-black">
      <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">{/*messages*/}</div>

      {/* hidden fields */}
      <input type="file"/>
      <button type="submit" hidden/>

      <div className="fixed bottom-0 overflow-hidden bg-black rounded-3xl">
        {/* recorder */}
        <div>
          {/* voice Synthesizer */}
        </div>
      </div>
     </form>
    </main>
  );
}
