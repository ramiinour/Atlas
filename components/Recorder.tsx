'use client'
import React, { useEffect, useRef, useState } from 'react'
import activeIcon from '@/img/active.gif'
import noActiveIcon from '@/img/notactive.png'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'

export const mimeType = "audio/webm"
const Recorder = ({uploadAudio}:{uploadAudio:(blob:Blob)=> void} ) => {
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const {pending} = useFormStatus()
    const [permission,setPermission] = useState(false)
    const [stream,setStream] = useState<MediaStream |null>(null)
    const [recordingStatus,setRecordingStatus] = useState<"inactive"| "recording">("inactive")
    const [audioChunks,setAudioChunks] = useState<Blob[]>([])


   useEffect(()=>{
       getPermission()
   },[])
  
  
    const getPermission = async()=>{
    if("MediaRecorder" in window) {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:false,
            })
            setPermission(true)
            setStream(streamData)
            
        } catch (err:any) {
            alert(err.message)
            
        }
    } else {
        alert("media api no support")
    }
  }


 const startRecording = async ()=> {
    if( stream === null || pending) return 
    setRecordingStatus("recording")

    // we create new media recorder instance using the stream 
    const media = new MediaRecorder(stream,{mimeType})
    mediaRecorder.current = media
    mediaRecorder.current.start()
    
    let localAudioChunks:Blob[] = []
   
    mediaRecorder.current.ondataavailable=(event)=>{
    if(typeof event.data === "undefined") return 
    if(event.data.size === 0) return 
    localAudioChunks.push(event.data)
    }
    
    setAudioChunks(localAudioChunks)
 }

 const stopRecording = async ()=> {
    if(mediaRecorder.current === null || pending) return 

    setRecordingStatus("inactive")
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = ()=>{
        const audioBlob = new Blob(audioChunks,{type:mimeType})
        uploadAudio(audioBlob)
        setAudioChunks([])
    }
 }


  return (
    <div className='flex items-center justify-center text-white'>
        {
            !permission && (
                <button onClick={getPermission}>Get Microphone</button>
            )
        }
        {
            pending && (
                <Image src={activeIcon}
                width={350}
                height={350}
                priority
                alt='Recording'
                className='assistant grayscale'
                />
            )
        }

        {permission && recordingStatus ==="inactive" && !pending && (
            <Image
            src={noActiveIcon}
            alt='Not Recording'
            width={350}
            height={350}
            onClick={startRecording}
            priority={true}
            className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
            />
        )}

        {recordingStatus === "recording" && (
            <Image
            src={activeIcon}
            alt='Recording'
            width={350}
            height={350}
            onClick={stopRecording}
            priority= {true}
            className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
            />
        )}
    </div>
  )
}

export default Recorder