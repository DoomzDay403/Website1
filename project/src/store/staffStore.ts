import { create } from 'zustand';
import { StaffMember, NewStaffMember, StaffUpdateRequest, StaffActivityLog } from '../types/staff';
import { UserRole } from '../types/auth';

interface StaffState {
  staffMembers: StaffMember[];
  activityLogs: StaffActivityLog[];
  isLoading: boolean;
  error: string | null;
}

interface StaffStore extends StaffState {
  createStaffMember: (newMember: NewStaffMember) => Promise<void>;
  updateStaffMember: (updateRequest: StaffUpdateRequest) => Promise<void>;
  deleteStaffMember: (id: string) => Promise<void>;
  changeRole: (id: string, newRole: UserRole) => Promise<void>;
  getStaffMember: (id: string) => StaffMember | undefined;
  getActivityLogs: (staffId?: string) => Promise<void>;
}

// Mock data for demo purposes
const mockStaffMembers: StaffMember[] = [
  {
    id: '1',
    username: 'DD403',
    email: 'admin@doomzday403.com',
    role: UserRole.OWNER,
    firstName: 'Admin',
    lastName: 'User',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    createdBy: 'system',
    permissions: ['*'],
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DD403'
  },
  {
    id: '2',
    username: 'manager1',
    email: 'manager@doomzday403.com',
    role: UserRole.MANAGER,
    firstName: 'Jane',
    lastName: 'Doe',
    isActive: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdBy: '1',
    department: 'Operations',
    position: 'Senior Manager',
    permissions: ['staff.view', 'staff.edit', 'messages.send'],
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=jane'
  },
  {
    id: '3',
    username: 'developer1',
    email: 'dev@doomzday403.com',
    role: UserRole.DEVELOPER,
    firstName: 'John',
    lastName: 'Smith',
    isActive: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdBy: '2',
    department: 'Engineering',
    position: 'Senior Developer',
    permissions: ['code.view', 'code.edit', 'messages.send'],
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=john'
  }
];

const mockActivityLogs: StaffActivityLog[] = [
  {
    id: '1',
    staffId: '1',
    staffUsername: 'DD403',
    action: 'CREATE_USER',
    details: 'Created user manager1',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ip: '192.168.1.1'
  },
  {
    id: '2',
    staffId: '2',
    staffUsername: 'manager1',
    action: 'CREATE_USER',
    details: 'Created user developer1',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    ip: '192.168.1.2'
  },
  {
    id: '3',
    staffId: '1',
    staffUsername: 'DD403',
    action: 'LOGIN',
    details: 'User logged in',
    timestamp: new Date(),
    ip: '192.168.1.1'
  }
];

const useStaffStore = create<StaffStore>((set, get) => ({
  staffMembers: mockStaffMembers,
  activityLogs: mockActivityLogs,
  isLoading: false,
  error: null,

  createStaffMember: async (newMember) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newStaff: StaffMember = {
        id: Math.random().toString(36).substring(2, 9),
        username: newMember.username,
        email: newMember.email,
        role: newMember.role,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '1', // Current user ID would be used in a real app
        department: newMember.department,
        position: newMember.position,
        permissions: [],
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${newMember.username}`
      };
      
      set((state) => ({
        staffMembers: [...state.staffMembers, newStaff],
        isLoading: false
      }));
      
      // Add activity log
      const newLog: StaffActivityLog = {
        id: Math.random().toString(36).substring(2, 9),
        staffId: '1', // Current user ID
        staffUsername: 'DD403', // Current username
        action: 'CREATE_USER',
        details: `Created user ${newMember.username}`,
        timestamp: new Date()
      };
      
      set((state) => ({
        activityLogs: [newLog, ...state.activityLogs]
      }));
      
    } catch (error) {
      set({
        error: 'Failed to create staff member',
        isLoading: false
      });
    }
  },
  
  updateStaffMember: async (updateRequest) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        staffMembers: state.staffMembers.map(member => 
          member.id === updateRequest.id
            ? { ...member, ...updateRequest, updatedAt: new Date() }
            : member
        ),
        isLoading: false
      }));
      
      // Add activity log
      const newLog: StaffActivityLog = {
        id: Math.random().toString(36).substring(2, 9),
        staffId: '1', // Current user ID
        staffUsername: 'DD403', // Current username
        action: 'UPDATE_USER',
        details: `Updated user ${updateRequest.id}`,
        timestamp: new Date()
      };
      
      set((state) => ({
        activityLogs: [newLog, ...state.activityLogs]
      }));
      
    } catch (error) {
      set({
        error: 'Failed to update staff member',
        isLoading: false
      });
    }
  },
  
  deleteStaffMember: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        staffMembers: state.staffMembers.filter(member => member.id !== id),
        isLoading: false
      }));
      
      // Add activity log
      const newLog: StaffActivityLog = {
        id: Math.random().toString(36).substring(2, 9),
        staffId: '1', // Current user ID
        staffUsername: 'DD403', // Current username
        action: 'DELETE_USER',
        details: `Deleted user ${id}`,
        timestamp: new Date()
      };
      
      set((state) => ({
        activityLogs: [newLog, ...state.activityLogs]
      }));
      
    } catch (error) {
      set({
        error: 'Failed to delete staff member',
        isLoading: false
      });
    }
  },
  
  changeRole: async (id, newRole) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        staffMembers: state.staffMembers.map(member => 
          member.id === id
            ? { ...member, role: newRole, updatedAt: new Date() }
            : member
        ),
        isLoading: false
      }));
      
      // Add activity log
      const newLog: StaffActivityLog = {
        id: Math.random().toString(36).substring(2, 9),
        staffId: '1', // Current user ID
        staffUsername: 'DD403', // Current username
        action: 'CHANGE_ROLE',
        details: `Changed role of user ${id} to ${newRole}`,
        timestamp: new Date()
      };
      
      set((state) => ({
        activityLogs: [newLog, ...state.activityLogs]
      }));
      
    } catch (error) {
      set({
        error: 'Failed to change role',
        isLoading: false
      });
    }
  },
  
  getStaffMember: (id) => {
    return get().staffMembers.find(member => member.id === id);
  },
  
  getActivityLogs: async (staffId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch from an API
      // For demo purposes, we're just filtering the mock data
      if (staffId) {
        const filteredLogs = mockActivityLogs.filter(log => log.staffId === staffId);
        set({ activityLogs: filteredLogs, isLoading: false });
      } else {
        set({ activityLogs: mockActivityLogs, isLoading: false });
      }
      
    } catch (error) {
      set({
        error: 'Failed to fetch activity logs',
        isLoading: false
      });
    }
  }
}));

export default useStaffStore;