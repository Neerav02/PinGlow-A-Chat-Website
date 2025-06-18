import React, { useState } from 'react';

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleEmailNotificationsChange = (e) => {
    setEmailNotifications(e.target.checked);
  };

  const handlePushNotificationsChange = (e) => {
    setPushNotifications(e.target.checked);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 lg:p-12 space-y-6 w-full max-w-2xl transform transition duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm text-center animate-fade-in-up">
          Settings
        </h1>
        <p className="text-lg text-gray-700 text-center animate-fade-in-up delay-100">
          Manage your account and app preferences here.
        </p>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in-up delay-200">Account Settings</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md animate-fade-in-up delay-300">
              <span>Change Password</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md animate-fade-in-up delay-400">
              <span>Update Email</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in-up delay-500">Notification Preferences</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md animate-fade-in-up delay-600">
              <span>Email Notifications</span>
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={emailNotifications}
                onChange={handleEmailNotificationsChange}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md animate-fade-in-up delay-700">
              <span>Push Notifications</span>
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={pushNotifications}
                onChange={handlePushNotificationsChange}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => alert('Save Settings functionality coming soon!')}
          className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 animate-fade-in-up delay-800"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 