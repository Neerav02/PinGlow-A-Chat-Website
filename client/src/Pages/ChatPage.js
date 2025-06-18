import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setChats(res.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} selectChat={setSelectedChat} user={user} />
      <ChatBox chat={selectedChat} user={user} />
    </div>
  );
};

export default ChatPage;
