import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  CircleUser, 
  UserCheck, 
  Code, 
  HeadphonesIcon 
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { UserRole } from '../../types/auth';
import useStaffStore from '../../store/staffStore';
import useAuthStore from '../../store/authStore';

const StaffListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { staffMembers, deleteStaffMember } = useStaffStore();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Filter staff members based on search
  const filteredStaff = staffMembers.filter(staff => 
    staff.username.toLowerCase().includes(search.toLowerCase()) ||
    staff.email.toLowerCase().includes(search.toLowerCase()) ||
    (staff.firstName && staff.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (staff.lastName && staff.lastName.toLowerCase().includes(search.toLowerCase())) ||
    staff.role.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id);
  };
  
  const handleDeleteConfirm = async (id: string) => {
    await deleteStaffMember(id);
    setShowDeleteConfirm(null);
  };
  
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.OWNER:
        return <Shield size={16} className="text-primary-600" />;
      case UserRole.MANAGER:
        return <UserCheck size={16} className="text-primary-600" />;
      case UserRole.SUPERVISOR:
        return <CircleUser size={16} className="text-primary-600" />;
      case UserRole.DEVELOPER:
        return <Code size={16} className="text-primary-600" />;
      case UserRole.SUPPORT:
        return <HeadphonesIcon size={16} className="text-primary-600" />;
      default:
        return <CircleUser size={16} className="text-primary-600" />;
    }
  };
  
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.OWNER:
        return 'primary';
      case UserRole.MANAGER:
        return 'secondary';
      case UserRole.SUPERVISOR:
        return 'success';
      case UserRole.DEVELOPER:
        return 'warning';
      case UserRole.SUPPORT:
        return 'accent';
      default:
        return 'secondary';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Staff Management</h1>
            <p className="text-secondary-600 mt-1">
              Manage your team members and their roles
            </p>
          </div>
          
          {user?.role === UserRole.OWNER || user?.role === UserRole.MANAGER ? (
            <Button
              variant="primary"
              leftIcon={<UserPlus size={16} />}
              onClick={() => navigate('/staff/new')}
            >
              Add Staff Member
            </Button>
          ) : null}
        </div>
        
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  leftIcon={<Search size={18} />}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="primary" className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{staffMembers.length} Total</span>
                </Badge>
                
                {Object.values(UserRole).map((role) => (
                  <Badge 
                    key={role}
                    variant={getRoleBadgeVariant(role)}
                    className="hidden md:flex items-center gap-1"
                  >
                    {getRoleIcon(role)}
                    <span>{staffMembers.filter(s => s.role === role).length}</span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell isHeader>Staff Member</TableCell>
                    <TableCell isHeader>Role</TableCell>
                    <TableCell isHeader>Department</TableCell>
                    <TableCell isHeader>Last Login</TableCell>
                    <TableCell isHeader>Status</TableCell>
                    <TableCell isHeader align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                            {staff.avatar ? (
                              <img
                                src={staff.avatar}
                                alt={staff.username}
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 font-medium">
                                  {staff.firstName?.[0] || staff.username[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-secondary-900">
                              {staff.firstName} {staff.lastName}
                            </div>
                            <div className="text-sm text-secondary-500">
                              {staff.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(staff.role)} className="flex items-center gap-1 w-fit">
                          {getRoleIcon(staff.role)}
                          <span>{staff.role}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {staff.department || '-'}
                      </TableCell>
                      <TableCell>
                        {staff.lastLogin 
                          ? new Date(staff.lastLogin).toLocaleDateString()
                          : 'Never'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={staff.isActive ? 'success' : 'error'}
                          size="sm"
                        >
                          {staff.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell align="right">
                        {showDeleteConfirm === staff.id ? (
                          <div className="flex space-x-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowDeleteConfirm(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => handleDeleteConfirm(staff.id)}
                            >
                              Confirm
                            </Button>
                          </div>
                        ) : (
                          <div className="flex space-x-2 justify-end">
                            <Link to={`/staff/${staff.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<Edit size={14} />}
                              >
                                Edit
                              </Button>
                            </Link>
                            
                            {(user?.role === UserRole.OWNER || 
                              (user?.role === UserRole.MANAGER && staff.role !== UserRole.OWNER)) && 
                              staff.id !== user?.id && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-error-600 border-error-200 hover:bg-error-50"
                                leftIcon={<Trash2 size={14} />}
                                onClick={() => handleDeleteClick(staff.id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredStaff.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center">
                          <Users size={24} className="text-secondary-400 mb-2" />
                          <p className="text-secondary-500">No staff members found</p>
                          {search && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2"
                              onClick={() => setSearch('')}
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default StaffListPage;