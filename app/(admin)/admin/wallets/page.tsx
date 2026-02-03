'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Wallet {
  _id: string;
  symbol: 'BTC' | 'ETH' | 'USDT_TRC20' | 'USDT_ERC20';
  name: string;
  address: string;
  qrCodeUrl: string;
  network?: string;
  isActive: boolean;
}

const WALLET_CONFIG = [
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin Network', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum Network', icon: 'Ξ' },
  { symbol: 'USDT_TRC20', name: 'USDT (TRC20)', network: 'Tron Network', icon: '₮' },
  { symbol: 'USDT_ERC20', name: 'USDT (ERC20)', network: 'Ethereum Network', icon: '₮' },
];

export default function AdminWalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    symbol: 'BTC' as Wallet['symbol'],
    name: '',
    address: '',
    qrCodeUrl: '',
    network: '',
    isActive: true,
  });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await fetch('/api/admin/wallets');
      if (response.ok) {
        const data = await response.json();
        setWallets(data.wallets);
      }
    } catch (error) {
      console.error('Failed to fetch wallets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) return formData.qrCodeUrl;

    const imageFormData = new FormData();
    imageFormData.append('file', selectedFile);

    try {
      setUploading(true);
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: imageFormData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
      return formData.qrCodeUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image if a new file was selected
    const qrCodeUrl = await uploadImage();

    const walletData = {
      ...formData,
      qrCodeUrl,
    };

    try {
      const url = editingWallet 
        ? `/api/admin/wallets/${editingWallet._id}`
        : '/api/admin/wallets';
      
      const method = editingWallet ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(walletData),
      });

      if (response.ok) {
        alert(`Wallet ${editingWallet ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        resetForm();
        fetchWallets();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save wallet');
      }
    } catch (error) {
      console.error('Failed to save wallet:', error);
      alert('Failed to save wallet');
    }
  };

  const openEditModal = (wallet: Wallet) => {
    setEditingWallet(wallet);
    setFormData({
      symbol: wallet.symbol,
      name: wallet.name,
      address: wallet.address,
      qrCodeUrl: wallet.qrCodeUrl,
      network: wallet.network || '',
      isActive: wallet.isActive,
    });
    setImagePreview(wallet.qrCodeUrl);
    setShowModal(true);
  };

  const openCreateModal = (config: typeof WALLET_CONFIG[0]) => {
    setEditingWallet(null);
    setFormData({
      symbol: config.symbol as Wallet['symbol'],
      name: config.name,
      address: '',
      qrCodeUrl: '',
      network: config.network,
      isActive: true,
    });
    setImagePreview('');
    setSelectedFile(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingWallet(null);
    setFormData({
      symbol: 'BTC',
      name: '',
      address: '',
      qrCodeUrl: '',
      network: '',
      isActive: true,
    });
    setImagePreview('');
    setSelectedFile(null);
  };

  const getWalletForConfig = (config: typeof WALLET_CONFIG[0]) => {
    return wallets.find(w => w.symbol === config.symbol);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Wallet Management</h1>
        <p className="text-slate-600 mt-1">Manage cryptocurrency wallet addresses and QR codes</p>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WALLET_CONFIG.map((config) => {
          const wallet = getWalletForConfig(config);
          
          return (
            <div
              key={config.symbol}
              className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-purple-300 transition-all shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{config.name}</h3>
                    <p className="text-xs text-slate-500">{config.network}</p>
                  </div>
                </div>
                {wallet && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    wallet.isActive 
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {wallet.isActive ? '● Active' : '○ Inactive'}
                  </span>
                )}
              </div>

              {/* Content */}
              {wallet ? (
                <div className="space-y-4">
                  {/* QR Code */}
                  {wallet.qrCodeUrl && (
                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-white rounded-xl border-2 border-slate-200 p-2">
                        <Image
                          src={wallet.qrCodeUrl}
                          alt={`${wallet.name} QR Code`}
                          width={120}
                          height={120}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Wallet Address</div>
                    <code className="text-xs font-mono text-slate-900 break-all">
                      {wallet.address}
                    </code>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => openEditModal(wallet)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    ✏️ Edit Wallet
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">No wallet configured</p>
                  </div>

                  <button
                    onClick={() => openCreateModal(config)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    + Add {config.name} Wallet
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingWallet ? 'Edit Wallet' : 'Add Wallet'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Symbol */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cryptocurrency
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              {/* Network */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Network
                </label>
                <input
                  type="text"
                  value={formData.network}
                  onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none text-slate-900"
                  placeholder="e.g., Bitcoin Network"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Wallet Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none font-mono text-sm text-slate-900"
                  placeholder="Enter wallet address"
                />
              </div>

              {/* QR Code Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  QR Code Image
                </label>
                
                {imagePreview && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 bg-slate-50 rounded-xl border-2 border-slate-200 p-2">
                      <Image
                        src={imagePreview}
                        alt="QR Code Preview"
                        width={120}
                        height={120}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <label className="block w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-center hover:border-purple-500 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    {selectedFile ? selectedFile.name : 'Click to upload QR code'}
                  </span>
                </label>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">
                  Active (visible to users)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : editingWallet ? 'Update Wallet' : 'Create Wallet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
