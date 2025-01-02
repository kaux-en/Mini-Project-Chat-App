import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";


type ChatBodyProp = {
    socket: any
};

const ChatBody: React.FC<ChatBodyProp> = ({ socket }) => {
    const [messages, setMessages] = useState([] as any);
    const [username, setUsername] = useState('')
    const timeStamp = new Date().toLocaleTimeString();


    useEffect(() => {
        socket.on("message", (message: any) => {
            setMessages([...messages, message]);
        });
    }, [socket, messages]);

    useEffect(() => {
        if (messages.length > 0) {
          const latestMessage = messages[messages.length - 1]; 
          localStorage.setItem("latestMessage", JSON.stringify(latestMessage));
        }
      }, [messages]);


   

    return (
        <div>
            <h3>Enter Your Username: </h3>
            <input 
                type="text" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            
        
        <Container
            style={{
                marginTop: "40px",
                background: "lightblue",
                padding: "20px",
                borderRadius: "10px"
            }}
            >
            {messages.map((message: any, index: any) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text>
                            {username} - {message.text}
                            <br />
                            {timeStamp}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        </div>
    );
};

export default ChatBody;