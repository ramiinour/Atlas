'use client'

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder from "@/components/Recorder";
import { useRef } from "react";
import { mimeType } from "@/components/Recorder";

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const uploadAudio = (blob:Blob)=>{
  const file = new File([blob],"audio.webm", {type:mimeType})

  // now we set the file as the value of the hidden input field
  if(fileRef.current) {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    fileRef.current.files = dataTransfer.files

    // now we simutalte the click and submit 
    if(buttonRef.current) {
      buttonRef.current.click()
    }
  }
  }
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
      <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
        <Messages/>
      </div>

      {/* hidden fields */}
      <input type="file" hidden ref={fileRef} name="audio"/>
      <button type="submit" hidden ref={buttonRef}/>

      <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-3xl">
        <Recorder uploadAudio = {uploadAudio}/>
        <div>
          {/* voice Synthesizer */}
        </div>
      </div>
     </form>
    </main>
  );
}
