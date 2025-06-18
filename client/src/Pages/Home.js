import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import ChatBox from '../components/ChatBox';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const { chats, selectedChat, setSelectedChat, loading } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false); // State for user dropdown menu
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div 
      className="flex flex-col h-screen p-4 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
    >
      <div className="flex flex-1 overflow-hidden bg-white rounded-xl shadow-2xl bg-opacity-90 backdrop-filter backdrop-blur-sm">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 shadow-lg flex flex-col bg-opacity-90 backdrop-filter backdrop-blur-sm">
          {/* User Profile / Menu Toggle */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between relative">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={toggleUserMenu}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold border-2 border-blue-600 shadow-md">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 text-lg truncate w-36 group-hover:text-blue-700 transition duration-200">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500 truncate w-36 group-hover:text-blue-500 transition duration-200">
                  {user?.email}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-20 animate-fade-in-down">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  Help
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-200 border-t border-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex justify-center items-center h-full p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : chats && chats.length > 0 ? (
              chats
                .filter((chat) =>
                  chat.isGroupChat
                    ? chat.chatName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    : chat.users
                        .find((u) => u._id !== user._id)
                        ?.name.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
                .map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setSelectedChat(chat);
                      setShowUserMenu(false); // Close menu when chat is selected
                    }}
                    className={`flex items-center p-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition duration-200 ${
                      selectedChat?._id === chat.id ? 'bg-blue-100 hover:bg-blue-200' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-lg font-medium mr-3">
                      {chat.isGroupChat
                        ? chat.chatName.charAt(0).toUpperCase()
                        : chat.users
                            .find((u) => u._id !== user._id)
                            ?.name.charAt(0)
                            .toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-md truncate">
                        {chat.isGroupChat
                          ? chat.chatName
                          : chat.users.find((u) => u._id !== user._id)?.name}
                      </h3>
                      {chat.latestMessage && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                          {chat.latestMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500 p-4">
                <p>No chats found. Start a new conversation!</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 bg-opacity-90 backdrop-filter backdrop-blur-sm">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Home;