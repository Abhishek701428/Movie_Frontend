import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ChatRoom = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = useRef(socketIOClient('/'));

    useEffect(() => {
        // Listen for incoming messages from server
        socket.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Fetch initial messages from server
        fetchMessages();

        return () => {
            // Clean up socket connection
            socket.current.disconnect();
        };
    }, []);

    // Fetch messages from server
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/chat/messages');
            setMessages(response.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    // Send message to server
    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        try {
            const response = await axios.post('http://localhost:8000/chat/messages', { username, text: newMessage });
            const newMessageData = response.data.data;
            setMessages((prevMessages) => [...prevMessages, newMessageData]);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.username}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input type="text" placeholder="Type your message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
