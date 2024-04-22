'use server'

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey:""
});

async function transcripe(prevState:any,formData:FormData) {
    "use server";
    const id = Math.random().toString(36)
    
    const file = formData.get('audio') as File
    if(file.size === 0) {
        return {
            sender: '',
            response:'No audio file provided'
        }
    }
    let transcription;
    try {
        transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
        });
        console.log(transcription.text);
    } catch(error) {
        console.log(error);
    }

    console.log(transcription);
    
  

    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-0125",
        prompt: transcription?.text || "",
        max_tokens: 150
    });

    // Extract the response from the completion
    const response = completion.choices[0].text;


    return {
        sender: transcription?.text,
        response:"this is a response",
        id:id
    }  


}
  

export default transcripe



