import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { sendMessage } from './api';
// const apiKey = '2f525e547b10f4d1aeaa15debe498462293976d4';
const DEEPGRAM_API_KEY = '2f525e547b10f4d1aeaa15debe498462293976d4';
const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en"

const VoiceText = ({ setText, isRecording = false, onStatusChange = () => { } }) => {
    const socketRef = useRef(null);
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        if (isRecording) {
            startStreaming();
        } else {
            stopStreaming();
            onStatusChange("idle");
        }

        // cleanup if component unmounts while recording
        return () => stopStreaming();
    }, [isRecording]);

    const startStreaming = async () => {
        if (socketRef.current) return;

        try {
            onStatusChange("connecting");
    
            const url =
              "wss://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&interim_results=true";
    
            const socket = new WebSocket(url, ["token", DEEPGRAM_API_KEY]);
            socketRef.current = socket;
    
            socket.onopen = async () => {
                // console.log("Connected to Deepgram");
    
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;
    
                const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
                recorderRef.current = recorder;
    
                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && socket.readyState === 1) {
                        socket.send(event.data);
                    }
                };
    
                recorder.start(250);
                onStatusChange("recording");
            };
    
            socket.onmessage = (message) => {
                const data = JSON.parse(message.data);
                const text = data.channel?.alternatives[0]?.transcript;
    
                if (text && data.is_final) {
                    setText(prev => prev + " " + text);
                }
            };
    
            socket.onerror = () => {
                onStatusChange("error");
            };
    
            socket.onclose = () => {
                // console.log("Socket closed");
                socketRef.current = null; // ⭐ important safety
            };
    
        } catch (err) {
            // console.error(err);
            onStatusChange("error");
        }
    };

    const stopStreaming = () => {
        recorderRef.current?.stop();
        recorderRef.current = null;
    
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
    
        socketRef.current?.close();
        socketRef.current = null; 
        setText("");
        onStatusChange("idle"); 
    };

};

export default VoiceText;