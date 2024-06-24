"use client";

import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import { msg_data } from '../../../Redux/Action';
import styles from './Bot.module.css';
import "../globals.css";

export default function Bot() {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.Chat);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      await dispatch(msg_data(message)); // Dispatch action to update chat history
      setMessage(''); // Clear input field after sending message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Medical Chatbot</h2>
      <div className={styles.chatBox}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={styles.messageContainer}>
            <div className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}>
              <strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}
