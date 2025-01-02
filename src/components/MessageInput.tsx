import React, { useState } from "react"
import { Container, Form } from 'react-bootstrap';



type MessageInputProps = {
    socket: any
}

const MessageInput: React.FC<MessageInputProps> = ({socket}) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        socket.emit("message", {text: messageText });
        setMessageText("");
    };

    const handleEntryKey = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
            setMessageText("")
        }
    };



    return (
        <Container>
            <Form>
                <Form.Label style={{ font: "aria", color: "lightgray"}}>
                    Type your message
                </Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => handleEntryKey(e)}
                    autoComplete="off" 
                />
            </Form>
        </Container>
    );
}

export default MessageInput;