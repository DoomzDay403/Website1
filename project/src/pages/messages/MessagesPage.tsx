import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Trash2, RefreshCw, UserPlus } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';
import useMessageStore from '../../store/messageStore';
import useStaffStore from '../../store/staffStore';
import { Message } from '../../types/messages';

const MessagesPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { messages, sendMessage, markMessageAsRead, deleteMessage, isLoading } = useMessageStore();
  const { staffMembers } = useStaffStore();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Filter staff for the sidebar
  const filteredStaff = staffMembers.filter(
    staff => staff.id !== user?.id && (
      staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staff.firstName && staff.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staff.lastName && staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );
  
  // Get conversations with selected user
  const selectedUserConversation = messages.filter(
    msg => (msg.senderId === user?.id && msg.recipientId === selectedUserId) ||
           (msg.recipientId === user?.id && msg.senderId === selectedUserId)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (selectedUserId && user) {
      const unreadMessages = messages.filter(
        msg => !msg.isRead && msg.senderId === selectedUserId && msg.recipientId === user.id
      );
      
      unreadMessages.forEach(msg => {
        markMessageAsRead(msg.id);
      });
    }
  }, [selectedUserId, messages, user, markMessageAsRead]);
  
  // Get unique conversations
  const conversations = React.useMemo(() => {
    const userConversations: Record<string, Message> = {};
    
    if (!user) return [];
    
    // Group messages by conversation
    messages.forEach(msg => {
      const otherUserId = msg.senderId === user.id ? msg.recipientId : msg.senderId;
      
      // Skip if it's not a conversation involving the current user
      if (msg.senderId !== user.id && msg.recipientId !== user.id) return;
      
      // Update only if this message is newer
      if (!userConversations[otherUserId] || 
          new Date(msg.createdAt) > new Date(userConversations[otherUserId].createdAt)) {
        userConversations[otherUserId] = msg;
      }
    });
    
    return Object.values(userConversations)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [messages, user]);
  
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUserId) return;
    
    await sendMessage({
      recipientId: selectedUserId,
      content: messageText
    });
    
    setMessageText('');
  };
  
  const getContactName = (userId: string) => {
    const staff = staffMembers.find(s => s.id === userId);
    if (staff) {
      return staff.firstName && staff.lastName 
        ? `${staff.firstName} ${staff.lastName}`
        : staff.username;
    }
    return 'Unknown User';
  };
  
  const getContactAvatar = (userId: string) => {
    const staff = staffMembers.find(s => s.id === userId);
    return staff?.avatar;
  };
  
  const getUnreadCount = (userId: string) => {
    if (!user) return 0;
    
    return messages.filter(
      msg => !msg.isRead && msg.senderId === userId && msg.recipientId === user.id
    ).length;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-secondary-900">Messages</h1>
          <p className="text-secondary-600 mt-1">
            Communicate with your team members
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4 border-b border-secondary-200">
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search size={18} />}
                />
              </div>
              
              <div className="h-[calc(80vh-13rem)] overflow-y-auto">
                {/* Recent Conversations */}
                <div className="py-2 px-4 border-b border-secondary-200">
                  <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-2">
                    Recent Conversations
                  </h3>
                  
                  {conversations.length > 0 ? (
                    conversations.map(msg => {
                      const otherUserId = msg.senderId === user?.id ? msg.recipientId : msg.senderId;
                      const unreadCount = getUnreadCount(otherUserId);
                      
                      return (
                        <div
                          key={otherUserId}
                          className={`flex items-center p-3 rounded-md cursor-pointer ${
                            selectedUserId === otherUserId
                              ? 'bg-primary-50'
                              : 'hover:bg-secondary-100'
                          }`}
                          onClick={() => setSelectedUserId(otherUserId)}
                        >
                          <div className="relative flex-shrink-0">
                            {msg.senderAvatar || msg.senderId === user?.id ? (
                              <img
                                src={msg.senderId === user?.id 
                                  ? getContactAvatar(msg.recipientId) || 'https://api.dicebear.com/7.x/shapes/svg?seed=unknown'
                                  : msg.senderAvatar || 'https://api.dicebear.com/7.x/shapes/svg?seed=unknown'
                                }
                                alt="Contact"
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 font-medium">
                                  {getContactName(otherUserId).charAt(0)}
                                </span>
                              </div>
                            )}
                            
                            {unreadCount > 0 && (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-500 rounded-full">
                                {unreadCount}
                              </span>
                            )}
                          </div>
                          
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-900 truncate">
                              {getContactName(otherUserId)}
                            </p>
                            <p className="text-xs text-secondary-500 truncate">
                              {msg.senderId === user?.id ? 'You: ' : ''}{msg.content}
                            </p>
                          </div>
                          
                          <div className="ml-2 flex-shrink-0">
                            <p className="text-xs text-secondary-400">
                              {new Date(msg.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-secondary-500">No conversations yet</p>
                    </div>
                  )}
                </div>
                
                {/* All Contacts */}
                <div className="py-2 px-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">
                      All Contacts
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      leftIcon={<RefreshCw size={12} />}
                    >
                      Refresh
                    </Button>
                  </div>
                  
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map(staff => (
                      <div
                        key={staff.id}
                        className={`flex items-center p-3 rounded-md cursor-pointer ${
                          selectedUserId === staff.id
                            ? 'bg-primary-50'
                            : 'hover:bg-secondary-100'
                        }`}
                        onClick={() => setSelectedUserId(staff.id)}
                      >
                        <div className="relative flex-shrink-0">
                          {staff.avatar ? (
                            <img
                              src={staff.avatar}
                              alt={staff.username}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-700 font-medium">
                                {(staff.firstName || staff.username).charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          {getUnreadCount(staff.id) > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-500 rounded-full">
                              {getUnreadCount(staff.id)}
                            </span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-secondary-900 truncate">
                            {staff.firstName} {staff.lastName || ''}
                          </p>
                          <p className="text-xs text-secondary-500 truncate">
                            {staff.role}
                          </p>
                        </div>
                        
                        <Badge
                          variant={staff.isActive ? 'success' : 'secondary'}
                          size="sm"
                          className="flex-shrink-0"
                        >
                          {staff.isActive ? 'Active' : 'Away'}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-secondary-500">No contacts found</p>
                      {searchTerm && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {selectedUserId ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-secondary-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {getContactAvatar(selectedUserId) ? (
                          <img
                            src={getContactAvatar(selectedUserId) || ''}
                            alt={getContactName(selectedUserId)}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-700 font-medium">
                              {getContactName(selectedUserId).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-secondary-900">
                          {getContactName(selectedUserId)}
                        </h3>
                        <p className="text-xs text-secondary-500">
                          {staffMembers.find(s => s.id === selectedUserId)?.role || ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => {
                          const lastMessage = selectedUserConversation[selectedUserConversation.length - 1];
                          if (lastMessage) {
                            deleteMessage(lastMessage.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <div className="flex-1 p-4 overflow-y-auto h-[calc(80vh-18rem)]">
                    {selectedUserConversation.length > 0 ? (
                      <div className="space-y-4">
                        {selectedUserConversation.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.senderId === user?.id ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                                message.senderId === user?.id
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-secondary-200 text-secondary-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.senderId === user?.id
                                    ? 'text-primary-200'
                                    : 'text-secondary-500'
                                }`}
                              >
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-secondary-500">
                        <MessageSquare size={40} className="mb-2 text-secondary-400" />
                        <p>No messages yet</p>
                        <p className="text-sm">Send your first message to start the conversation</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-secondary-200">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex space-x-2"
                    >
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        rightIcon={<Send size={16} />}
                        disabled={!messageText.trim() || isLoading}
                        isLoading={isLoading}
                      >
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-secondary-600">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-medium text-secondary-900 mb-2">
                    Select a contact
                  </h3>
                  <p className="text-center text-secondary-500 mb-4">
                    Choose a contact from the list to start messaging
                  </p>
                  <Button
                    variant="outline"
                    leftIcon={<UserPlus size={16} />}
                    onClick={() => navigate('/staff')}
                  >
                    Manage Team
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MessagesPage;