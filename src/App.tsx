import React, { useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import ChatBody from './components/ChatBody.tsx';
import { Container } from 'react-bootstrap';
import MessageInput from './components/MessageInput.tsx';


export const socket = io("ws://127.0.0.1:5000")

function App() {

   React.useEffect(() => {
      console.log("Connecting to server...");
      socket.on("connect", () => {
        console.log("Connected to server");
      });
  
      socket.on("disconnect", () => {
          console.log("Disconnected from server");
      });
    }, []);


  return (
    <div className="App">
    <Container>
      <h1>Welcome to the Chat App!</h1>
      <Container>
      <ChatBody socket={socket} />
      </Container>
      <MessageInput socket={socket} />
    </Container>
    </div>
  );
}

export default App;
