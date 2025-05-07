// === FILE: frontend/src/ChatBot.js ===
import React, { useState } from "react";
import axios from "axios";
import { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

function ChatBot() {
  const [userText, setUserText] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const { speak } = useSpeechSynthesis();
  const {
    transcript,
    resetTranscript,
    listening,
    startListening,
  } = useSpeechRecognition();

  const handleTextSubmit = async () => {
    const input = transcript || userText;
    setUserText("");
    resetTranscript();

    try {
      const res = await axios.post("http://localhost:8080/api/generate", { input });
      setBotResponse(res.data.response);
      speak({ text: res.data.response });
    } catch (err) {
      setBotResponse("Sorry, I'm having trouble responding right now.");
    }
  };

  return (
    <div>
      <textarea
       value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="How are you feeling today?"
      />
      <br />
      <button onClick={handleTextSubmit}>Send</button>
      <button onClick={startListening}>Speak</button>
      {listening && <p>Listening...</p>}
      {botResponse && (
        <div>
          <strong>SootheAI:</strong> {botResponse}
        </div>
      )}
    </div>
  );
}

export default ChatBot;

