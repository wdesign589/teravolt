'use client';

import { useState } from 'react';

export default function KYCVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    address: '',
    city: '',
    postalCode: '',
    idType: 'passport',
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Address', icon: '🏠' },
    { number: 3, title: 'ID Upload', icon: '📄' },
    { number: 4, title: 'Selfie', icon: '📸' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">KYC Verification</h1>
        <p className="text-sm text-slate-500 mt-1">Complete your identity verification to unlock all features</p>
      </div>

      {/* Verification Status */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Verification Required</h3>
            <p className="text-sm text-slate-700 mb-4">
              To comply with regulations and protect your account, please complete the KYC verification process.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">Higher withdrawal limits</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">Access all features</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-all ${
                    currentStep >= step.number
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="text-xs font-semibold text-slate-700 text-center">{step.title}</div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded transition-all ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Information</h3>
                <p className="text-sm text-slate-600">Please provide your basic information</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Address Information</h3>
                <p className="text-sm text-slate-600">Provide your residential address</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="10001"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: ID Upload */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Identity Document</h3>
                <p className="text-sm text-slate-600">Upload a valid government-issued ID</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Document Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'passport', name: 'Passport', icon: '🛂' },
                    { id: 'license', name: 'Driver License', icon: '🪪' },
                    { id: 'id', name: 'National ID', icon: '🆔' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, idType: type.id })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.idType === type.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-xs font-semibold text-slate-900">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-500 transition-all cursor-pointer">
                <div className="text-5xl mb-4">📤</div>
                <div className="text-sm font-semibold text-slate-900 mb-2">Upload Document</div>
                <div className="text-xs text-slate-600 mb-4">Drag and drop or click to browse</div>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all">
                  Choose File
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-blue-900 mb-2">Requirements:</div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Document must be valid and not expired</li>
                  <li>• All details must be clearly visible</li>
                  <li>• Accepted formats: JPG, PNG, PDF</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Selfie */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Selfie Verification</h3>
                <p className="text-sm text-slate-600">Take a selfie holding your ID document</p>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">📸</div>
                <div className="text-sm font-semibold text-slate-900 mb-2">Take a Selfie</div>
                <div className="text-xs text-slate-600 mb-4">Hold your ID next to your face</div>
                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all">
                    Open Camera
                  </button>
                  <button className="px-6 py-2 border-2 border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold transition-all">
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-amber-900 mb-2">Tips for a good selfie:</div>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Face the camera directly</li>
                  <li>• Hold ID clearly visible</li>
                  <li>• Remove glasses and hats</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border-2 border-slate-200 hover:border-slate-300 rounded-xl font-semibold transition-all"
              >
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="ml-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
              >
                Continue
              </button>
            ) : (
              <button className="ml-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all shadow-lg">
                Submit for Review
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🔒', title: 'Secure', desc: 'Your data is encrypted and protected' },
          { icon: '⚡', title: 'Fast', desc: 'Verification completed in 24 hours' },
          { icon: '✅', title: 'Compliant', desc: 'Meets global regulatory standards' },
        ].map((benefit, i) => (
          <div key={i} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">{benefit.icon}</div>
            <div className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</div>
            <div className="text-sm text-slate-600">{benefit.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
