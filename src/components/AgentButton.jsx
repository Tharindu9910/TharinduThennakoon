import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import {
    Send,
    X,
    Minimize2,
    MessageCircle,
    Sparkles,
    Paperclip,
    File,
    SendHorizontal,
    Mic
} from 'lucide-react';
import { sendMessage } from './api';
import { myagent } from '../assets/images';
import VoiceText from './VoiceText';
import axios from 'axios';

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;
const DEEPGRAM_URL = import.meta.env.VITE_DEEPGRAM_V_OUT_URL;

const AgentButton = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([
        { text: `Hi there! I'm Tharindu, What would you like to know about me?`, sender: 'bot', msgId: 1, actions: [] }
    ]);
    const [isRecording, setIsRecording] = useState(false);
    const [textState, setTextState] = useState("");
    const [micStatus, setMicStatus] = useState("idle");

    const messagesEndRef = useRef(null);
    const quickReplies = ['Can I get your CV?',"What technologies do you specialize in?"];

   const handleMessageSend = async () => {
    setLoading(true);
    if (!message.trim()) return;
    const formattedMsg = message.trim();
    setMessage('');
    setMessageList((prevMessages) => [
        ...prevMessages,
        { text: formattedMsg, sender: 'me', msgId: prevMessages.length + 1 }
    ]);

    try {
        const response = await sendMessage(formattedMsg);
        // console.log(response)
        // console.log(response.answer)
        // console.log(response.actions)
        // if (response.actions != []){
        //     setActions(response.actions)
        // } 
        setLoading(false);
        setMessageList((prevMessages) => [
            ...prevMessages,
            { text: response.answer, sender: 'bot', msgId: prevMessages.length + 1, actions: response.actions }
        ]);

    } catch (err) {
        setMessageList((prevMessages) => [
            ...prevMessages,
            { text: err.message, sender: 'bot', msgId: prevMessages.length + 1 }
        ]);
    }
};

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleMessageSend();
    }
};
const handleTextStateSend = async () => {
        setLoading(true);
        if (!textState.trim()) return;
        const formattedMsg = textState.trim();
        setTextState('');
        setMessageList((prevMessages) => [
            ...prevMessages,
            { text: formattedMsg, sender: 'me', msgId: prevMessages.length + 1 }
        ]);

        try {
            const response = await sendMessage(formattedMsg);
            await handleSend(response)
            setLoading(false);
            setMessageList((prevMessages) => [
                ...prevMessages,
                { text: response.answer, sender: 'bot', msgId: prevMessages.length + 1, actions: response.actions }
            ]);

        } catch (err) {
            setMessageList((prevMessages) => [
                ...prevMessages,
                { text: err.message, sender: 'bot', msgId: prevMessages.length + 1 }
            ]);
        }
    };


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
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {/* Chat Portal */}
            {open && (
                <div
                    className="flex flex-col w-[100vw] sm:w-[55vw] max-w-[90vw] h-[85vh] sm:h-[95vh] max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-gradient-to-br from-[#26c4b8] to-black border border-white animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header with Gradient */}
                    <div className="relative bg-color1 text-white px-6 py-4">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-700" />
                        </div>

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div
                                        className="w-11 h-11 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center font-semibold text-lg border-2 border-white/40">
                                        TT
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-lg flex items-center gap-2">
                                        Chat With Me
                                        {/* <Sparkles className="w-4 h-4 text-yellow-300" /> */}
                                    </h3>
                                    <p className="text-xs text-white/80">Online</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
                                    aria-label="Minimize">
                                    <Minimize2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
                                    aria-label="Close">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                        className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 space-y-4 bg-black/80 ">
                        {messageList.map((msg, index) => (
                            <div
                                key={msg.msgId}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'
                                    } animate-in slide-in-from-bottom-2 duration-300`}
                                style={{ animationDelay: `${index * 50}ms` }}>
                                {msg.sender === 'bot' && (
                                    <div className="flex items-start gap-2 max-w-[80%]">
                                        <div
                                            className="w-8 h-8 rounded-full bg-color1 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-lg">
                                            TT
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    border: '1px solid #f3f4f6',
                                                    borderRadius: '1rem',
                                                    borderTopLeftRadius: '0.125rem',
                                                    boxShadow:
                                                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                                                    boxSizing: 'border-box'
                                                }}
                                                className="bg-white rounded-2xl text-gray-500 text-sm rounded-tl-sm px-4 py-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                                                <p>{msg.text}</p>
                                                {msg.actions && msg.actions.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2 ">
                                                        {msg.actions.map((action, idx) => (
                                                            action.type === "link" ? <a
                                                                key={idx}
                                                                href={action.url}
                                                                download // This attribute tells the browser to download instead of navigate
                                                                className="text-white bg-color1 px-2 py-1 rounded border hover:bg-black"
                                                            >
                                                                {action.label}
                                                            </a> : <p>Unwanted Trigger</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-400 mt-1 ml-1 block">
                                                {msg.timestamp
                                                    ? msg.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : ''}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {msg.sender === 'me' && (
                                    <div className="flex items-start gap-2 max-w-[80%]">
                                        <div>
                                            <div
                                                className="bg-color1 rounded-2xl rounded-tr-sm px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-200">
                                                <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {loading && (
                            <div className="flex items-start gap-2 animate-in slide-in-from-bottom-2 duration-300">
                                <div
                                    className="w-8 h-8 rounded-full bg-[#26c4b8] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-lg">
                                    TT
                                </div>
                                <div
                                    style={{
                                        border: '1px solid #f3f4f6',
                                        borderRadius: '1rem',
                                        borderTopLeftRadius: '0.125rem',
                                        boxShadow:
                                            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                                        boxSizing: 'border-box'
                                    }}
                                    className="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-md border border-gray-100">
                                    <div className="flex gap-1">
                                        <span
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '0ms' }}
                                        />
                                        <span
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '150ms' }}
                                        />
                                        <span
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '300ms' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Replies */}
                        {messageList.length === 1 && !loading && (
                            <div className="flex flex-wrap gap-2 mt-2 animate-in fade-in duration-500 delay-300">
                                {quickReplies.map((reply, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setMessage(reply);
                                            // setTimeout(handleMessageSend, 100);
                                        }}
                                        style={{
                                            border: '1px solid #bfdbfe',
                                            borderRadius: '9999px',
                                            boxSizing: 'border-box'
                                        }}
                                        className="px-4 py-[5px] bg-white border border-color1 text-green-900 rounded-full text-sm hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area with Glassmorphism */}
                    <div
                        className="p-4 bg-white/95 backdrop-blur-lg border-t border-gray-200">

                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsRecording(!isRecording)}
                                className={`
                                   relative flex-shrink-0 rounded-xl p-2 transition-all duration-200
                                   ${isRecording
                                        ? "text-color1 bg-red-50 animate-heartbeat"
                                        : "text-color1 hover:bg-green-50"}
                                `}
                                aria-label={isRecording ? "Stop recording" : "Start recording"}
                            >
                                {micStatus === "connecting"
                                    ?  <div className="bars">
                                    <span></span><span></span><span></span>
                                  </div>
                                    : isRecording
                                        ?<><Mic className={`w-5 h-5 ${isRecording ? "" : ""}`} />
                                         <span className="absolute top-1 right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                                        </span></>
                                        : <Mic className={`w-5 h-5 ${isRecording ? "" : ""}`} />}


                                {/* Optional: A small red dot indicator */}
                                {/* {isRecording && (
                                    <span className="absolute top-1 right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                                    </span>
                                )} */}
                            </button>


                            <input
                                type="file"
                                multiple
                                className="hidden"
                                accept="image/*,.pdf,.doc,.docx,.txt"
                            />
                            <div>
                                <VoiceText setText={setTextState} isRecording={isRecording} onStatusChange={setMicStatus} />
                                {/* <DirectVoiceToText/> */}
                            </div>
                            <div className="flex-1 relative">
                                {isRecording ?
                                    <input type="text"
                                        placeholder="Listening..."
                                        value={textState}
                                        className="w-full rounded-xl px-4 py-2 pr-4 text-gray-600 border-[1px] border-gray-300 focus:outline-none focus:ring-1 focus:ring-color1 focus:border-transparent bg-gray-200 shadow-sm transition-all duration-200 text-sm placeholder:text-gray-400"
                                    />

                                    : <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        style={{
                                            border: '1px solid #d1d5db',
                                            borderRadius: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        className="w-full rounded-xl px-4 py-2 pr-4 text-gray-600 border-[1px] border-gray-300 focus:outline-none focus:ring-1 focus:ring-color1 focus:border-transparent bg-white shadow-sm transition-all duration-200 text-sm placeholder:text-gray-400"
                                    />}
                            </div>

                            <button
                                type="button"
                                onClick={()=>{
                                    if (textState ===""){
                                        handleMessageSend()
                                        
                                    }else{
                                        handleTextStateSend()
                                    } }}
                                // disabled={!message.trim() && attachedFiles.length === 0}

                                className="bg-color1 text-white rounded-2xl p-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                aria-label="Send message">
                                <SendHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Floating Chat Button */}
            {!open && (
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        border: '1px solid #6b7280',
                        borderRadius: '9999px',
                        boxSizing: 'border-box'
                    }}
                    className="w-14 h-14 rounded-full overflow-hidden bg-color1 p-1 border border-gray-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition">
                    <img
                        className="overflow-hidden"
                        src={myagent}
                    />
                </button>
            )}
        </div>
    )
}

export default AgentButton