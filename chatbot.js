import React, { useState, useContext, createContext } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import athenaLogo from '../../common/athena-logo.png';
import Box from '@mui/material/Box';

const ChatbotContext = createContext();

export default function Chatbot({ chatbot }) {
  const navigate = useNavigate();
  const { setChatbot } = useChatbot();
  const handleClick = (chatbot) => {
    setChatbot(chatbot);
    navigate('/chatbot' + `/${chatbot.id}` + '/general');
  };
  return (
    <div className="chatbot-container">
      <Box
        component="button"
        sx={{
          height: '100px',
          width: '100px',
          border: '2px solid grey',
          borderRadius: 2,
          boxSizing: 'initial',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
        onClick={() => handleClick(chatbot)}
      >
        <img
          src={chatbot.image || athenaLogo}
          alt="temp"
          width={50}
          height={50}
        />
      </Box>
      <p style={{ marginTop: 8, fontWeight: '300' }}>{chatbot.name}</p>
    </div>
  );
}

export const ChatbotProvider = ({ children }) => {
  const [chatbot, setChatbot] = useState(null);

  return (
    <ChatbotContext.Provider value={{ chatbot, setChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a Chatbot Provider');
  }
  return context;
};
