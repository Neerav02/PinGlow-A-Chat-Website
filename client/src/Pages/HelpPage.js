import React, { useState } from 'react';

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to send the contact form
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqs = [
    {
      question: "How do I start a new chat?",
      answer: "Click on the 'New Chat' button in the sidebar, then select a contact from your list or search for a user by their email address."
    },
    {
      question: "Can I create group chats?",
      answer: "Yes! Click on 'New Chat' and select multiple contacts to create a group chat. You can also add or remove members later."
    },
    {
      question: "How do I update my profile picture?",
      answer: "Go to your profile page, click on your current profile picture, and select a new image from your device."
    },
    {
      question: "Is my chat history saved?",
      answer: "Yes, all your messages are securely stored and can be accessed anytime. You can also search through your chat history using the search bar."
    },
    {
      question: "How do I manage notifications?",
      answer: "Go to Settings > Notifications to customize your notification preferences for different types of messages and activities."
    }
  ];

  const features = [
    {
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with our real-time chat system.",
      icon: "💬"
    },
    {
      title: "File Sharing",
      description: "Share images, documents, and other files with your contacts.",
      icon: "📎"
    },
    {
      title: "Voice Messages",
      description: "Record and send voice messages when typing isn't convenient.",
      icon: "🎤"
    },
    {
      title: "Group Chats",
      description: "Create and manage group conversations with multiple participants.",
      icon: "👥"
    },
    {
      title: "Message Search",
      description: "Quickly find past messages using our powerful search feature.",
      icon: "🔍"
    },
    {
      title: "Custom Themes",
      description: "Personalize your chat experience with different themes and colors.",
      icon: "🎨"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 lg:p-12 space-y-8 w-full max-w-4xl transform transition duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm text-center animate-fade-in-up">
          Help & Support
        </h1>
        <p className="text-lg text-gray-700 text-center animate-fade-in-up delay-100">
          Find answers to your questions and get assistance with our chat application.
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === 'features'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === 'contact'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact Support
          </button>
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div className="space-y-4 animate-fade-in-up">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <summary className="font-medium cursor-pointer hover:text-blue-600 transition duration-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}

        {/* Features Section */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support Section */}
        {activeTab === 'contact' && (
          <form onSubmit={handleContactSubmit} className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpPage; 