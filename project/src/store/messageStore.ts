import { create } from 'zustand';
import { Message, NewMessage, Notification, NotificationType } from '../types/messages';

interface MessageState {
  messages: Message[];
  notifications: Notification[];
  unreadCount: number;
  unreadNotificationCount: number;
  isLoading: boolean;
  error: string | null;
}

interface MessageStore extends MessageState {
  sendMessage: (newMessage: NewMessage) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
}

// Mock data for demo purposes
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Jane Doe',
    senderAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=jane',
    recipientId: '1',
    recipientName: 'Admin User',
    content: 'Hello, I need help with the new project setup.',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    senderId: '3',
    senderName: 'John Smith',
    senderAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=john',
    recipientId: '1',
    recipientName: 'Admin User',
    content: 'The latest deployment has some issues. Can we discuss?',
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Admin User',
    senderAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DD403',
    recipientId: '2',
    recipientName: 'Jane Doe',
    content: 'I\'ll set up a meeting to discuss the project tomorrow.',
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'New message',
    message: 'You have a new message from Jane Doe',
    isRead: false,
    type: NotificationType.INFO,
    link: '/messages',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    userId: '1',
    title: 'System update',
    message: 'The system will be undergoing maintenance tonight at 2 AM',
    isRead: false,
    type: NotificationType.WARNING,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  }
];

const useMessageStore = create<MessageStore>((set, get) => ({
  messages: mockMessages,
  notifications: mockNotifications,
  unreadCount: mockMessages.filter(m => !m.isRead && m.recipientId === '1').length,
  unreadNotificationCount: mockNotifications.filter(n => !n.isRead).length,
  isLoading: false,
  error: null,

  sendMessage: async (newMessage) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message: Message = {
        id: Math.random().toString(36).substring(2, 9),
        senderId: '1', // Current user ID
        senderName: 'Admin User', // Current user name
        senderAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DD403',
        recipientId: newMessage.recipientId,
        recipientName: get().messages.find(m => m.senderId === newMessage.recipientId)?.senderName || 'User',
        content: newMessage.content,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      set((state) => ({
        messages: [...state.messages, message],
        isLoading: false
      }));
      
    } catch (error) {
      set({
        error: 'Failed to send message',
        isLoading: false
      });
    }
  },
  
  markMessageAsRead: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        messages: state.messages.map(message => 
          message.id === id ? { ...message, isRead: true } : message
        ),
        unreadCount: state.messages.filter(m => !m.isRead && m.recipientId === '1' && m.id !== id).length,
        isLoading: false
      }));
      
    } catch (error) {
      set({
        error: 'Failed to mark message as read',
        isLoading: false
      });
    }
  },
  
  deleteMessage: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const messageToDelete = get().messages.find(m => m.id === id);
      
      set((state) => ({
        messages: state.messages.filter(message => message.id !== id),
        unreadCount: messageToDelete && !messageToDelete.isRead && messageToDelete.recipientId === '1'
          ? state.unreadCount - 1
          : state.unreadCount,
        isLoading: false
      }));
      
    } catch (error) {
      set({
        error: 'Failed to delete message',
        isLoading: false
      });
    }
  },
  
  getMessages: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch from an API
      // For demo purposes, we're just filtering the mock data
      const userMessages = mockMessages.filter(message => 
        message.senderId === userId || message.recipientId === userId
      );
      
      set({
        messages: userMessages,
        unreadCount: userMessages.filter(m => !m.isRead && m.recipientId === userId).length,
        isLoading: false
      });
      
    } catch (error) {
      set({
        error: 'Failed to fetch messages',
        isLoading: false
      });
    }
  },
  
  markNotificationAsRead: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        notifications: state.notifications.map(notification => 
          notification.id === id ? { ...notification, isRead: true } : notification
        ),
        unreadNotificationCount: state.notifications.filter(n => !n.isRead && n.id !== id).length,
        isLoading: false
      }));
      
    } catch (error) {
      set({
        error: 'Failed to mark notification as read',
        isLoading: false
      });
    }
  },
  
  clearAllNotifications: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        notifications: state.notifications.map(notification => ({ ...notification, isRead: true })),
        unreadNotificationCount: 0,
        isLoading: false
      }));
      
    } catch (error) {
      set({
        error: 'Failed to clear notifications',
        isLoading: false
      });
    }
  }
}));

export default useMessageStore;