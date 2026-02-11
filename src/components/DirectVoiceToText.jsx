import React, { useState, useRef } from 'react';
import axios from 'axios';
import { sendMessage } from './api';
// const apiKey = '2f525e547b10f4d1aeaa15debe498462293976d4';
const DEEPGRAM_API_KEY = '6577ca6f08de8db8f1623509f27bb61c78010ad7';
const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en"
const DirectVoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const socketRef = useRef(null);
    const recorderRef = useRef(null);

    const startStreaming = async () => {
        // 1. Get a Temporary Token from your backend (Best Practice)

        // 2. Connect directly to Deepgram WebSocket
        const url = 'wss://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&interim_results=true';
        socketRef.current = new WebSocket(url, ['token', DEEPGRAM_API_KEY]);

        socketRef.current.onopen = async () => {
            console.log('Connected to Deepgram');
            setIsRecording(true);


            // 3. Capture Mic and Stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            recorderRef.current = recorder;

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socketRef.current.readyState === 1) {
                    socketRef.current.send(event.data);
                }
            };

            recorder.start(250); // Send chunks every 250ms
        };

        socketRef.current.onmessage = (message) => {
            console.log('Received message:', message.data);
            const data = JSON.parse(message.data);
            const text = data.channel?.alternatives[0]?.transcript;
            if (text) {
                if (data.is_final) {
                    // Append final text to the permanent transcript
                    setTranscript(prev => prev + ' ' + text);
                } else {
                    // If it's interim, you might want to show it in a "preview" 
                    // but NOT append it to the main transcript yet.
                    console.log("Interim result (live preview):", text);
                }
            }
        };
    };

    const stopStreaming = () => {
        recorderRef.current?.stop();
        socketRef.current?.close();
        setIsRecording(false);
    };

    // const handleSend = async () => {
    //     console.log("voice comand:", transcript)
    //     if (transcript.trim() !== "") {

    //         // const response = await sendMessage(transcript);
    //         // const response = await axios.post("https://asia-south1-neo-ji-152ee.cloudfunctions.net/text-to-speech-v1",
    //         //     { "message": transcript },
    //         //     {
    //         //         headers: {
    //         //             'Content-Type': 'application/json'
    //         //         },
    //         //         responseType: "arraybuffer",
    //         //     }
    //         // )
    //         // console.log("responsed answer:", response.answer)

    //         const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
    //         const audioUrl = URL.createObjectURL(audioBlob);

    //         const audio = new Audio(audioUrl);
    //         audio.play();
    //     } else {
    //         alert("Please speak something to send a message.")
    //     }
    // }

    const handleSend = async (response) => {

        try {
            const res = await axios.post(
                DEEPGRAM_URL,
                { text: response.answer }, // Deepgram expects a JSON body with a 'text' field
                {
                    headers: {
                        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    responseType: 'blob', // Crucial for receiving audio/binary data
                    timeout: 30000,
                }
            );

            // 1. Create a URL for the blob data
            const audioBlob = new Blob([res.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // 2. Play the audio
            const audio = new Audio(audioUrl);
            audio.play();

            // 3. Clean up the URL object memory later
            audio.onended = () => URL.revokeObjectURL(audioUrl);

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error(`Deepgram Error: ${error.response.status}`, error.response.data);
            } else {
                console.error("Network or Setup Error:", error.message);
            }
        }
    };

    return (
        <div className='text-black' style={{ padding: '20px', border: '1px solid #ccc' }}>
            <button type='button' className='hover:bg-green-100 bg-gray-200 p-1' onClick={isRecording ? stopStreaming : startStreaming}>
                {isRecording ? 'Stop Voice Commanding' : 'Start Voice Commanding'}
            </button>
            <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '10px' }}>
                <strong>Message:</strong> {transcript}
                <br />
                <button type='button' onClick={handleSend} className='hover:bg-green-100 bg-gray-200 p-1' >Send Message</button>
            </div>
        </div>
    );
};

export default DirectVoiceToText;