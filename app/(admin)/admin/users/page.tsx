'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditUserModal from '@/components/admin/EditUserModal';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  role: string;
  kycStatus: string;
  emailVerified: boolean;
  balance: number;
  walletAddress?: string;
  avatar?: string;
  investmentAmount?: string;
  investmentExperience?: string;
  investmentGoal?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [kycFilter, setKycFilter] = useState<string>('all');

  useEffect(() => {
    // Force fresh fetch on mount
    setLoading(true);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Add cache-busting to force fresh data
      const response = await fetch(`/api/admin/users?t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setActionMenuOpen(null);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
    setActionMenuOpen(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowDeleteConfirm(false);
        setUserToDelete(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleApproveKYC = async (user: User) => {
    if (!confirm(`Are you sure you want to approve KYC for ${user.firstName} ${user.lastName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${user.id}/approve-kyc`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('KYC approved successfully!');
        fetchUsers(); // Refresh the list
        setActionMenuOpen(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve KYC');
      }
    } catch (error) {
      console.error('Failed to approve KYC:', error);
      alert('Failed to approve KYC');
    }
  };

  // Filter users based on KYC status
  const filteredUsers = kycFilter === 'all' 
    ? users 
    : users.filter(user => user.kycStatus === kycFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage all registered users</p>
        </div>
        <div className="text-slate-400 text-sm">
          Total Users: <span className="text-white font-bold">{users.length}</span>
        </div>
      </div>

      {/* KYC Status Filter */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-semibold text-sm">Filter by KYC Status:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setKycFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                kycFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              All ({users.length})
            </button>
            <button
              onClick={() => setKycFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                kycFilter === 'pending'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              KYC Pending ({users.filter(u => u.kycStatus === 'pending').length})
            </button>
            <button
              onClick={() => setKycFilter('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                kycFilter === 'approved'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Approved ({users.filter(u => u.kycStatus === 'approved').length})
            </button>
            <button
              onClick={() => setKycFilter('rejected')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                kycFilter === 'rejected'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Rejected ({users.filter(u => u.kycStatus === 'rejected').length})
            </button>
            <button
              onClick={() => setKycFilter('not_submitted')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                kycFilter === 'not_submitted'
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Not Submitted ({users.filter(u => u.kycStatus === 'not_submitted').length})
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Phone</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Balance</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">KYC Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Email Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Joined</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    No users found with {kycFilter === 'all' ? 'any' : kycFilter} KYC status
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-slate-400 text-xs">{user.city}, {user.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-semibold">${user.balance.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.kycStatus === 'approved' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : user.kycStatus === 'rejected'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : user.kycStatus === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {user.kycStatus === 'not_submitted' ? 'Not Submitted' : user.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.emailVerified 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {user.emailVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActionMenuOpen(actionMenuOpen === user.id ? null : user.id);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        id={`action-btn-${user.id}`}
                      >
                        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Menu Dropdown - Rendered outside table to avoid overflow issues */}
      {actionMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setActionMenuOpen(null)}
          ></div>
          {(() => {
            const button = document.getElementById(`action-btn-${actionMenuOpen}`);
            const rect = button?.getBoundingClientRect();
            const user = users.find(u => u.id === actionMenuOpen);
            
            if (!rect || !user) return null;
            
            return (
              <div 
                className="fixed w-48 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-[101] overflow-hidden"
                style={{
                  top: `${rect.bottom + 8}px`,
                  right: `${window.innerWidth - rect.right}px`,
                }}
              >
                <button
                  onClick={() => handleEdit(user)}
                  className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit User
                </button>
                {user.kycStatus === 'pending' && (
                  <button
                    onClick={() => {
                      setActionMenuOpen(null);
                      router.push(`/admin/users/${user.id}/kyc`);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-amber-500/10 transition-colors flex items-center gap-3 text-amber-400 hover:text-amber-300 border-t border-white/5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Review KYC
                  </button>
                )}
                {(user.kycStatus === 'not_submitted' || user.kycStatus === 'rejected') && (
                  <button
                    onClick={() => handleApproveKYC(user)}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-500/10 transition-colors flex items-center gap-3 text-emerald-400 hover:text-emerald-300 border-t border-white/5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approve KYC
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user)}
                  className="w-full text-left px-4 py-3 hover:bg-red-500/10 transition-colors flex items-center gap-3 text-red-400 hover:text-red-300 border-t border-white/5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete User
                </button>
              </div>
            );
          })()}
        </>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete User</h3>
                <p className="text-slate-400 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <span className="font-bold text-white">{userToDelete.firstName} {userToDelete.lastName}</span>? 
              All their data will be permanently removed.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
