'use client'

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder from "@/components/Recorder";
import { useEffect, useRef, useState } from "react";
import { mimeType } from "@/components/Recorder";
import { useFormState } from "react-dom";
import transcripe from "@/actions/transcripe";

const initialState = {
  sender: "",
  response:"",
  id:""
}

export type Message = {
  sender:string;
  response:string;
  id:string;
}

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [state,formAction] = useFormState(transcripe,initialState)
  const [messages,setMessages] = useState<Message[]>([])

  // this will be responsible for updating the messages after the server action
  useEffect(()=>{
  if(state.response && state.sender) {
    setMessages(messages=> [{
      sender: state.sender || "",
      response:state.response || "",
      id: state.id || ""
    },...messages])
  }

  },[state])

  const uploadAudio = (blob:Blob)=>{
  const file = new File([blob],"audio.webm", {type:mimeType})
  console.log(file);

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

  console.log(messages);

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
     <form action={formAction} className="flex flex-col bg-black">
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
