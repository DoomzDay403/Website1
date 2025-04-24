import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Bell, Shield, Activity, Briefcase } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';
import useStaffStore from '../../store/staffStore';
import useMessageStore from '../../store/messageStore';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { staffMembers, activityLogs, getActivityLogs } = useStaffStore();
  const { messages, notifications, unreadCount } = useMessageStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Load recent activity logs
    getActivityLogs();
  }, [isAuthenticated, navigate, getActivityLogs]);
  
  // Display only the most recent 5 activity logs
  const recentActivity = activityLogs.slice(0, 5);
  
  // Count staff by role
  const staffByRole = staffMembers.reduce((acc, staff) => {
    acc[staff.role] = (acc[staff.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-secondary-600 mt-1">
            Welcome back, {user?.firstName || user?.username}
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-500">Total Staff</p>
                <p className="text-2xl font-semibold">{staffMembers.length}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-500">Unread Messages</p>
                <p className="text-2xl font-semibold">{unreadCount}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-500">Notifications</p>
                <p className="text-2xl font-semibold">{notifications.length}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-500">Activities</p>
                <p className="text-2xl font-semibold">{activityLogs.length}</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/activity')}
                  >
                    View all
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell isHeader>User</TableCell>
                        <TableCell isHeader>Action</TableCell>
                        <TableCell isHeader>Details</TableCell>
                        <TableCell isHeader>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>{activity.staffUsername}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                activity.action.includes('CREATE') ? 'success' :
                                activity.action.includes('UPDATE') ? 'warning' :
                                activity.action.includes('DELETE') ? 'error' : 'primary'
                              }
                            >
                              {activity.action}
                            </Badge>
                          </TableCell>
                          <TableCell>{activity.details}</TableCell>
                          <TableCell>
                            {new Date(activity.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {recentActivity.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            No recent activity found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Team Overview */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Team Overview</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/staff')}
                  >
                    Manage team
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(staffByRole).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                          {role === 'OWNER' ? (
                            <Shield size={18} />
                          ) : (
                            <Briefcase size={18} />
                          )}
                        </div>
                        <span className="font-medium">{role}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <h3 className="text-sm font-medium text-secondary-900 mb-4">Recent Messages</h3>
                  
                  {messages.slice(0, 3).map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3 mb-4 pb-4 border-b border-secondary-100 last:border-0"
                    >
                      <div className="flex-shrink-0">
                        {message.senderAvatar ? (
                          <img
                            src={message.senderAvatar}
                            alt={message.senderName}
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-700 font-medium text-sm">
                              {message.senderName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-secondary-900">
                          {message.senderName}
                        </p>
                        <p className="text-sm text-secondary-500 truncate">
                          {message.content}
                        </p>
                        <p className="text-xs text-secondary-400 mt-1">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!message.isRead && message.recipientId === user?.id && (
                        <span className="inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/messages')}
                    className="mt-2"
                  >
                    View all messages
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;