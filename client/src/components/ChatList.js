import React from 'react';

const ChatList = ({ chats, selectChat, user }) => {
  return (
    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <div className="space-y-2">
        {chats.map((chat) => {
          const otherUser = chat.users.find((u) => u._id !== user._id);
          return (
            <div
              key={chat._id}
              onClick={() => selectChat(chat)}
              className="p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
            >
              <h3 className="font-medium">{otherUser?.name || 'Unknown User'}</h3>
              <p className="text-sm text-gray-500">
                {chat.lastMessage?.content || 'No messages yet'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
  