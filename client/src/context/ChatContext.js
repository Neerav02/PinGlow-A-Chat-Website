import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/chats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (userId) => {
    try {
      const headers = getAuthHeaders();
      
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers,
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create chat error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
      return data;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  };

  const createGroupChat = async (chatName, users) => {
    try {
      const headers = getAuthHeaders();
      
      const response = await fetch('/api/chats/group', {
        method: 'POST',
        headers,
        body: JSON.stringify({ chatName, users }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create group chat error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
      return data;
    } catch (error) {
      console.error('Error creating group chat:', error);
      throw error;
    }
  };

  const updateGroupChat = async (chatId, chatName, users) => {
    try {
      const headers = getAuthHeaders();
      
      const response = await fetch(`/api/chats/group/${chatId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ chatName, users }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update group chat error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setChats((prev) =>
        prev.map((chat) => (chat._id === chatId ? data : chat))
      );
      setSelectedChat(data);
      return data;
    } catch (error) {
      console.error('Error updating group chat:', error);
      throw error;
    }
  };

  const leaveGroupChat = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`/api/chats/group/${chatId}/leave`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Leave group chat error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      setSelectedChat(null);
    } catch (error) {
      console.error('Error leaving group chat:', error);
      throw error;
    }
  };

  const value = {
    chats,
    selectedChat,
    setSelectedChat,
    loading,
    fetchChats,
    createChat,
    createGroupChat,
    updateGroupChat,
    leaveGroupChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};