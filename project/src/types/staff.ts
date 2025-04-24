import { UserRole } from './auth';

export interface StaffMember {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  createdBy: string;
  department?: string;
  position?: string;
  permissions: string[];
}

export interface NewStaffMember {
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword: string;
  department?: string;
  position?: string;
}

export interface StaffUpdateRequest {
  id: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  department?: string;
  position?: string;
  permissions?: string[];
}

export interface StaffActivityLog {
  id: string;
  staffId: string;
  staffUsername: string;
  action: string;
  details: string;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}