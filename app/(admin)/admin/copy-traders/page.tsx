'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CopyTrader {
  _id: string;
  name: string;
  avatar: string;
  roi: number;
  followers: string;
  winRate: number;
  trades: number;
  badge: string;
  risk: 'Low' | 'Medium' | 'High';
  avgProfit: number;
  totalReturn: number;
  monthlyReturn: number;
  percentageGainPerDay: number;
  isActive: boolean;
}

export default function CopyTradersAdmin() {
  const [traders, setTraders] = useState<CopyTrader[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTrader, setEditingTrader] = useState<CopyTrader | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    roi: 0,
    followers: '',
    winRate: 0,
    trades: 0,
    badge: 'Pro',
    risk: 'Medium' as 'Low' | 'Medium' | 'High',
    avgProfit: 0,
    totalReturn: 0,
    monthlyReturn: 0,
    percentageGainPerDay: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    try {
      console.log('🔍 [Admin] Fetching traders from API...');
      const response = await fetch('/api/admin/copy-traders', {
        credentials: 'include', // Include cookies
      });
      
      console.log('📥 [Admin] Response status:', response.status);
      console.log('📥 [Admin] Response OK:', response.ok);
      
      if (!response.ok) {
        const responseText = await response.text();
        console.error('❌ [Admin] Response text:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: responseText || 'Unknown error' };
        }
        
        console.error('❌ [Admin] API error:', errorData);
        console.error('❌ [Admin] Status code:', response.status);
        alert(`Failed to fetch traders (${response.status}): ${errorData.error || 'Unknown error'}`);
        return;
      }
      
      const data = await response.json();
      console.log('✅ [Admin] Data received:', data);
      console.log('📊 [Admin] Traders count:', data.traders?.length || 0);
      console.log('📋 [Admin] Traders:', data.traders);
      
      setTraders(data.traders || []);
    } catch (error) {
      console.error('❌ [Admin] Failed to fetch traders:', error);
      alert('Failed to fetch traders: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file for later upload
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const response = await fetch('/api/admin/upload-image', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload image first if a new file was selected
      let avatarUrl = formData.avatar;
      if (selectedFile) {
        console.log('📤 Uploading image...');
        avatarUrl = await uploadImage(selectedFile);
        console.log('✅ Image uploaded:', avatarUrl);
      }

      console.log('🔵 [Frontend] Submitting form...');
      console.log('📝 [Frontend] Editing trader?', !!editingTrader);
      if (editingTrader) {
        console.log('🆔 [Frontend] Trader ID:', editingTrader._id);
        console.log('📊 [Frontend] Full trader object:', editingTrader);
      }

      const url = editingTrader
        ? `/api/admin/copy-traders/${editingTrader._id}`
        : '/api/admin/copy-traders';
      
      console.log('🌐 [Frontend] API URL:', url);
      
      const method = editingTrader ? 'PUT' : 'POST';
      console.log('🔧 [Frontend] HTTP Method:', method);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, avatar: avatarUrl }),
      });

      if (response.ok) {
        fetchTraders();
        closeModal();
        alert(editingTrader ? 'Trader updated successfully' : 'Trader created successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save trader');
      }
    } catch (error) {
      console.error('Error saving trader:', error);
      alert('Failed to save trader');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trader?')) return;

    try {
      const response = await fetch(`/api/admin/copy-traders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTraders();
        alert('Trader deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting trader:', error);
      alert('Failed to delete trader');
    }
  };

  const openEditModal = (trader: CopyTrader) => {
    console.log('📝 [Frontend] Opening edit modal for trader:', trader);
    console.log('🆔 [Frontend] Trader._id:', trader._id);
    console.log('🔤 [Frontend] Trader._id type:', typeof trader._id);
    
    setEditingTrader(trader);
    setSelectedFile(null);
    setImagePreview(trader.avatar || '');
    setFormData({
      name: trader.name,
      avatar: trader.avatar,
      roi: trader.roi,
      followers: trader.followers,
      winRate: trader.winRate,
      trades: trader.trades,
      badge: trader.badge,
      risk: trader.risk,
      avgProfit: trader.avgProfit,
      totalReturn: trader.totalReturn,
      monthlyReturn: trader.monthlyReturn,
      percentageGainPerDay: trader.percentageGainPerDay,
      isActive: trader.isActive,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTrader(null);
    setSelectedFile(null);
    setImagePreview('');
    setFormData({
      name: '',
      avatar: '',
      roi: 0,
      followers: '',
      winRate: 0,
      trades: 0,
      badge: 'Pro',
      risk: 'Medium',
      avgProfit: 0,
      totalReturn: 0,
      monthlyReturn: 0,
      percentageGainPerDay: 0,
      isActive: true,
    });
  };

  // Filter traders based on search query
  const filteredTraders = traders.filter(trader =>
    trader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trader.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trader.risk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Copy Traders Management</h1>
          <p className="text-slate-600 mt-1">Manage all copy trading traders</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
        >
          + Add New Trader
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search traders by name, badge, or risk..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Showing {filteredTraders.length} of {traders.length} traders
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading traders...</p>
        </div>
      ) : filteredTraders.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No traders found</h3>
          <p className="text-slate-600">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Trader</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Badge</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ROI</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Win Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Trades</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Daily Gain</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Risk</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTraders.map((trader) => (
                  <tr key={trader._id} className="hover:bg-slate-50 transition-colors">
                    {/* Trader (Avatar + Name) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {trader.avatar ? (
                          <Image
                            src={trader.avatar}
                            alt={trader.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            {trader.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900">{trader.name}</div>
                          <div className="text-xs text-slate-500">{trader.followers} followers</div>
                        </div>
                      </div>
                    </td>

                    {/* Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        trader.badge === 'Elite' ? 'bg-purple-100 text-purple-700' : 
                        trader.badge === 'Pro' ? 'bg-blue-100 text-blue-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        ⭐ {trader.badge}
                      </span>
                    </td>

                    {/* ROI */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-emerald-600">+{trader.roi}%</span>
                    </td>

                    {/* Win Rate */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{trader.winRate}%</span>
                    </td>

                    {/* Trades */}
                    <td className="px-6 py-4">
                      <span className="text-slate-700">{trader.trades}</span>
                    </td>

                    {/* Daily Gain */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-purple-600">{trader.percentageGainPerDay}%</span>
                    </td>

                    {/* Risk */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        trader.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                        trader.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {trader.risk}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        trader.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${trader.isActive ? 'bg-emerald-500' : 'bg-slate-400'} animate-pulse`} />
                        {trader.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Actions (Three Dot Menu) */}
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === trader._id ? null : trader._id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === trader._id && (
                          <>
                            {/* Backdrop to close menu */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white ring-1 ring-slate-200 z-20">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    openEditModal(trader);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  <span className="font-medium">Edit Trader</span>
                                </button>
                                <div className="border-t border-slate-100" />
                                <button
                                  onClick={() => {
                                    handleDelete(trader._id);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  <span className="font-medium">Delete Trader</span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingTrader ? 'Edit Trader' : 'Add New Trader'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Avatar Image
                </label>
                
                <div className="flex items-center gap-4">
                  {/* Upload Button */}
                  <label className="cursor-pointer">
                    <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Choose Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>

                  {/* Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="rounded-lg border-2 border-purple-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setImagePreview('');
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                
                {selectedFile && (
                  <p className="text-sm text-purple-600 mt-2">
                    📎 {selectedFile.name} - Will upload when you submit the form
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Followers</label>
                  <input
                    type="text"
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    placeholder="e.g., 2.4k"
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ROI (%)</label>
                  <input
                    type="number"
                    value={formData.roi}
                    onChange={(e) => setFormData({ ...formData, roi: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Win Rate (%)</label>
                  <input
                    type="number"
                    value={formData.winRate}
                    onChange={(e) => setFormData({ ...formData, winRate: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Trades</label>
                  <input
                    type="number"
                    value={formData.trades}
                    onChange={(e) => setFormData({ ...formData, trades: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Badge</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Elite">Elite</option>
                    <option value="Pro">Pro</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Risk Level</label>
                  <select
                    value={formData.risk}
                    onChange={(e) => setFormData({ ...formData, risk: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Avg Profit ($)</label>
                  <input
                    type="number"
                    value={formData.avgProfit}
                    onChange={(e) => setFormData({ ...formData, avgProfit: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Return ($)</label>
                  <input
                    type="number"
                    value={formData.totalReturn}
                    onChange={(e) => setFormData({ ...formData, totalReturn: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Return (%)</label>
                  <input
                    type="number"
                    value={formData.monthlyReturn}
                    onChange={(e) => setFormData({ ...formData, monthlyReturn: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Gain (%) *Hidden*</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.percentageGainPerDay}
                    onChange={(e) => setFormData({ ...formData, percentageGainPerDay: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg bg-purple-50 text-slate-900"
                    required
                  />
                  <p className="text-xs text-purple-600 mt-1">This field is only visible to admin</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                  <select
                    value={formData.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Uploading...
                    </>
                  ) : (
                    editingTrader ? 'Update Trader' : 'Create Trader'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
