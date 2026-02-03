'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  { number: 1, label: 'Personal' },
  { number: 2, label: 'Address' },
  { number: 3, label: 'Financial' },
  { number: 4, label: 'Security' },
];

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    investmentAmount: '',
    investmentExperience: '',
    investmentGoal: '',
    password: '',
    confirmPassword: '',
  });

  // Real-time password validation
  useEffect(() => {
    const password = formData.password;
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    });
  }, [formData.password]);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrors([]);
    
    // Client-side validation
    const validationErrors: string[] = [];
    
    if (!termsAccepted) {
      validationErrors.push('You must accept the Terms of Service and Privacy Policy to continue');
    }
    
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match. Please ensure both password fields are identical');
    }
    
    // Check password requirements
    if (!passwordValidation.minLength) {
      validationErrors.push('Password must be at least 8 characters long');
    }
    if (!passwordValidation.hasUppercase) {
      validationErrors.push('Password must contain at least one uppercase letter (A-Z)');
    }
    if (!passwordValidation.hasLowercase) {
      validationErrors.push('Password must contain at least one lowercase letter (a-z)');
    }
    if (!passwordValidation.hasNumber) {
      validationErrors.push('Password must contain at least one number (0-9)');
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setError('Please fix the following errors:');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle server validation errors
        if (data.details && Array.isArray(data.details)) {
          setErrors(data.details);
          setError('Please correct the following errors:');
        } else {
          setError(data.error || 'An error occurred during signup. Please try again.');
        }
        setIsLoading(false);
        return;
      }
      
      // Redirect to check email page (user must verify email before logging in)
      router.push(`/check-email?email=${encodeURIComponent(data.email)}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="relative w-48 h-16 block">
            <Image
              src="/logo.png"
              alt="Terravolt"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Sign Up Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-400 text-sm">Join thousands of satisfied customers</p>
          </div>

          {/* Error Messages */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-semibold mb-2">{error}</p>
                  {errors.length > 0 && (
                    <ul className="space-y-1">
                      {errors.map((err, index) => (
                        <li key={index} className="text-red-300 text-xs flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{err}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Progress Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        currentStep >= step.number
                          ? 'bg-emerald-500 text-white'
                          : 'bg-black/30 text-slate-500 border border-white/10'
                      }`}
                    >
                      {step.number}
                    </div>
                    {/* Step Label */}
                    <span
                      className={`text-xs mt-2 font-medium ${
                        currentStep >= step.number ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 mt-[-24px] transition-all ${
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <select className="w-full sm:w-auto sm:max-w-[200px] px-3 sm:px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all truncate">
                      <option value="+93">🇦🇫 Afghanistan (+93)</option>
                      <option value="+355">🇦🇱 Albania (+355)</option>
                      <option value="+213">🇩🇿 Algeria (+213)</option>
                      <option value="+1-684">🇦🇸 American Samoa (+1-684)</option>
                      <option value="+376">🇦🇩 Andorra (+376)</option>
                      <option value="+244">🇦🇴 Angola (+244)</option>
                      <option value="+1-264">🇦🇮 Anguilla (+1-264)</option>
                      <option value="+1-268">🇦🇬 Antigua & Barbuda (+1-268)</option>
                      <option value="+54">🇦🇷 Argentina (+54)</option>
                      <option value="+374">🇦🇲 Armenia (+374)</option>
                      <option value="+297">🇦🇼 Aruba (+297)</option>
                      <option value="+61">🇦🇺 Australia (+61)</option>
                      <option value="+43">🇦🇹 Austria (+43)</option>
                      <option value="+994">🇦🇿 Azerbaijan (+994)</option>
                      <option value="+1-242">🇧🇸 Bahamas (+1-242)</option>
                      <option value="+973">🇧🇭 Bahrain (+973)</option>
                      <option value="+880">🇧🇩 Bangladesh (+880)</option>
                      <option value="+1-246">🇧🇧 Barbados (+1-246)</option>
                      <option value="+375">🇧🇾 Belarus (+375)</option>
                      <option value="+32">🇧🇪 Belgium (+32)</option>
                      <option value="+501">🇧🇿 Belize (+501)</option>
                      <option value="+229">🇧🇯 Benin (+229)</option>
                      <option value="+1-441">🇧🇲 Bermuda (+1-441)</option>
                      <option value="+975">🇧🇹 Bhutan (+975)</option>
                      <option value="+591">🇧🇴 Bolivia (+591)</option>
                      <option value="+387">🇧🇦 Bosnia & Herzegovina (+387)</option>
                      <option value="+267">🇧🇼 Botswana (+267)</option>
                      <option value="+55">🇧🇷 Brazil (+55)</option>
                      <option value="+673">🇧🇳 Brunei (+673)</option>
                      <option value="+359">🇧🇬 Bulgaria (+359)</option>
                      <option value="+226">🇧🇫 Burkina Faso (+226)</option>
                      <option value="+257">🇧🇮 Burundi (+257)</option>
                      <option value="+855">🇰🇭 Cambodia (+855)</option>
                      <option value="+237">🇨🇲 Cameroon (+237)</option>
                      <option value="+1">🇨🇦 Canada (+1)</option>
                      <option value="+238">🇨🇻 Cape Verde (+238)</option>
                      <option value="+1-345">🇰🇾 Cayman Islands (+1-345)</option>
                      <option value="+236">🇨🇫 Central African Republic (+236)</option>
                      <option value="+235">🇹🇩 Chad (+235)</option>
                      <option value="+56">🇨🇱 Chile (+56)</option>
                      <option value="+86">🇨🇳 China (+86)</option>
                      <option value="+57">🇨🇴 Colombia (+57)</option>
                      <option value="+269">🇰🇲 Comoros (+269)</option>
                      <option value="+242">🇨🇬 Congo (+242)</option>
                      <option value="+243">🇨🇩 Congo (DRC) (+243)</option>
                      <option value="+682">🇨🇰 Cook Islands (+682)</option>
                      <option value="+506">🇨🇷 Costa Rica (+506)</option>
                      <option value="+225">🇨🇮 Côte d'Ivoire (+225)</option>
                      <option value="+385">🇭🇷 Croatia (+385)</option>
                      <option value="+53">🇨🇺 Cuba (+53)</option>
                      <option value="+357">🇨🇾 Cyprus (+357)</option>
                      <option value="+420">🇨🇿 Czech Republic (+420)</option>
                      <option value="+45">🇩🇰 Denmark (+45)</option>
                      <option value="+253">🇩🇯 Djibouti (+253)</option>
                      <option value="+1-767">🇩🇲 Dominica (+1-767)</option>
                      <option value="+1-809">🇩🇴 Dominican Republic (+1-809)</option>
                      <option value="+593">🇪🇨 Ecuador (+593)</option>
                      <option value="+20">🇪🇬 Egypt (+20)</option>
                      <option value="+503">🇸🇻 El Salvador (+503)</option>
                      <option value="+240">🇬🇶 Equatorial Guinea (+240)</option>
                      <option value="+291">🇪🇷 Eritrea (+291)</option>
                      <option value="+372">🇪🇪 Estonia (+372)</option>
                      <option value="+251">🇪🇹 Ethiopia (+251)</option>
                      <option value="+500">🇫🇰 Falkland Islands (+500)</option>
                      <option value="+298">🇫🇴 Faroe Islands (+298)</option>
                      <option value="+679">🇫🇯 Fiji (+679)</option>
                      <option value="+358">🇫🇮 Finland (+358)</option>
                      <option value="+33">🇫🇷 France (+33)</option>
                      <option value="+594">🇬🇫 French Guiana (+594)</option>
                      <option value="+689">🇵🇫 French Polynesia (+689)</option>
                      <option value="+241">🇬🇦 Gabon (+241)</option>
                      <option value="+220">🇬🇲 Gambia (+220)</option>
                      <option value="+995">🇬🇪 Georgia (+995)</option>
                      <option value="+49">🇩🇪 Germany (+49)</option>
                      <option value="+233">🇬🇭 Ghana (+233)</option>
                      <option value="+350">🇬🇮 Gibraltar (+350)</option>
                      <option value="+30">🇬🇷 Greece (+30)</option>
                      <option value="+299">🇬🇱 Greenland (+299)</option>
                      <option value="+1-473">🇬🇩 Grenada (+1-473)</option>
                      <option value="+590">🇬🇵 Guadeloupe (+590)</option>
                      <option value="+1-671">🇬🇺 Guam (+1-671)</option>
                      <option value="+502">🇬🇹 Guatemala (+502)</option>
                      <option value="+224">🇬🇳 Guinea (+224)</option>
                      <option value="+245">🇬🇼 Guinea-Bissau (+245)</option>
                      <option value="+592">🇬🇾 Guyana (+592)</option>
                      <option value="+509">🇭🇹 Haiti (+509)</option>
                      <option value="+504">🇭🇳 Honduras (+504)</option>
                      <option value="+852">🇭🇰 Hong Kong (+852)</option>
                      <option value="+36">🇭🇺 Hungary (+36)</option>
                      <option value="+354">🇮🇸 Iceland (+354)</option>
                      <option value="+91">🇮🇳 India (+91)</option>
                      <option value="+62">🇮🇩 Indonesia (+62)</option>
                      <option value="+98">🇮🇷 Iran (+98)</option>
                      <option value="+964">🇮🇶 Iraq (+964)</option>
                      <option value="+353">🇮🇪 Ireland (+353)</option>
                      <option value="+972">🇮🇱 Israel (+972)</option>
                      <option value="+39">🇮🇹 Italy (+39)</option>
                      <option value="+1-876">🇯🇲 Jamaica (+1-876)</option>
                      <option value="+81">🇯🇵 Japan (+81)</option>
                      <option value="+962">🇯🇴 Jordan (+962)</option>
                      <option value="+7">🇰🇿 Kazakhstan (+7)</option>
                      <option value="+254">🇰🇪 Kenya (+254)</option>
                      <option value="+686">🇰🇮 Kiribati (+686)</option>
                      <option value="+383">🇽🇰 Kosovo (+383)</option>
                      <option value="+965">🇰🇼 Kuwait (+965)</option>
                      <option value="+996">🇰🇬 Kyrgyzstan (+996)</option>
                      <option value="+856">🇱🇦 Laos (+856)</option>
                      <option value="+371">🇱🇻 Latvia (+371)</option>
                      <option value="+961">🇱🇧 Lebanon (+961)</option>
                      <option value="+266">🇱🇸 Lesotho (+266)</option>
                      <option value="+231">🇱🇷 Liberia (+231)</option>
                      <option value="+218">🇱🇾 Libya (+218)</option>
                      <option value="+423">🇱🇮 Liechtenstein (+423)</option>
                      <option value="+370">🇱🇹 Lithuania (+370)</option>
                      <option value="+352">🇱🇺 Luxembourg (+352)</option>
                      <option value="+853">🇲🇴 Macau (+853)</option>
                      <option value="+389">🇲🇰 Macedonia (+389)</option>
                      <option value="+261">🇲🇬 Madagascar (+261)</option>
                      <option value="+265">🇲🇼 Malawi (+265)</option>
                      <option value="+60">🇲🇾 Malaysia (+60)</option>
                      <option value="+960">🇲🇻 Maldives (+960)</option>
                      <option value="+223">🇲🇱 Mali (+223)</option>
                      <option value="+356">🇲🇹 Malta (+356)</option>
                      <option value="+692">🇲🇭 Marshall Islands (+692)</option>
                      <option value="+596">🇲🇶 Martinique (+596)</option>
                      <option value="+222">🇲🇷 Mauritania (+222)</option>
                      <option value="+230">🇲🇺 Mauritius (+230)</option>
                      <option value="+262">🇾🇹 Mayotte (+262)</option>
                      <option value="+52">🇲🇽 Mexico (+52)</option>
                      <option value="+691">🇫🇲 Micronesia (+691)</option>
                      <option value="+373">🇲🇩 Moldova (+373)</option>
                      <option value="+377">🇲🇨 Monaco (+377)</option>
                      <option value="+976">🇲🇳 Mongolia (+976)</option>
                      <option value="+382">🇲🇪 Montenegro (+382)</option>
                      <option value="+1-664">🇲🇸 Montserrat (+1-664)</option>
                      <option value="+212">🇲🇦 Morocco (+212)</option>
                      <option value="+258">🇲🇿 Mozambique (+258)</option>
                      <option value="+95">🇲🇲 Myanmar (+95)</option>
                      <option value="+264">🇳🇦 Namibia (+264)</option>
                      <option value="+674">🇳🇷 Nauru (+674)</option>
                      <option value="+977">🇳🇵 Nepal (+977)</option>
                      <option value="+31">🇳🇱 Netherlands (+31)</option>
                      <option value="+687">🇳🇨 New Caledonia (+687)</option>
                      <option value="+64">🇳🇿 New Zealand (+64)</option>
                      <option value="+505">🇳🇮 Nicaragua (+505)</option>
                      <option value="+227">🇳🇪 Niger (+227)</option>
                      <option value="+234">🇳🇬 Nigeria (+234)</option>
                      <option value="+850">🇰🇵 North Korea (+850)</option>
                      <option value="+47">🇳🇴 Norway (+47)</option>
                      <option value="+968">🇴🇲 Oman (+968)</option>
                      <option value="+92">🇵🇰 Pakistan (+92)</option>
                      <option value="+680">🇵🇼 Palau (+680)</option>
                      <option value="+970">🇵🇸 Palestine (+970)</option>
                      <option value="+507">🇵🇦 Panama (+507)</option>
                      <option value="+675">🇵🇬 Papua New Guinea (+675)</option>
                      <option value="+595">🇵🇾 Paraguay (+595)</option>
                      <option value="+51">🇵🇪 Peru (+51)</option>
                      <option value="+63">🇵🇭 Philippines (+63)</option>
                      <option value="+48">🇵🇱 Poland (+48)</option>
                      <option value="+351">🇵🇹 Portugal (+351)</option>
                      <option value="+1-787">🇵🇷 Puerto Rico (+1-787)</option>
                      <option value="+974">🇶🇦 Qatar (+974)</option>
                      <option value="+262">🇷🇪 Réunion (+262)</option>
                      <option value="+40">🇷🇴 Romania (+40)</option>
                      <option value="+7">🇷🇺 Russia (+7)</option>
                      <option value="+250">🇷🇼 Rwanda (+250)</option>
                      <option value="+1-869">🇰🇳 Saint Kitts & Nevis (+1-869)</option>
                      <option value="+1-758">🇱🇨 Saint Lucia (+1-758)</option>
                      <option value="+1-784">🇻🇨 Saint Vincent (+1-784)</option>
                      <option value="+685">🇼🇸 Samoa (+685)</option>
                      <option value="+378">🇸🇲 San Marino (+378)</option>
                      <option value="+239">🇸🇹 São Tomé & Príncipe (+239)</option>
                      <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                      <option value="+221">🇸🇳 Senegal (+221)</option>
                      <option value="+381">🇷🇸 Serbia (+381)</option>
                      <option value="+248">🇸🇨 Seychelles (+248)</option>
                      <option value="+232">🇸🇱 Sierra Leone (+232)</option>
                      <option value="+65">🇸🇬 Singapore (+65)</option>
                      <option value="+421">🇸🇰 Slovakia (+421)</option>
                      <option value="+386">🇸🇮 Slovenia (+386)</option>
                      <option value="+677">🇸🇧 Solomon Islands (+677)</option>
                      <option value="+252">🇸🇴 Somalia (+252)</option>
                      <option value="+27">🇿🇦 South Africa (+27)</option>
                      <option value="+82">🇰🇷 South Korea (+82)</option>
                      <option value="+211">🇸🇸 South Sudan (+211)</option>
                      <option value="+34">🇪🇸 Spain (+34)</option>
                      <option value="+94">🇱🇰 Sri Lanka (+94)</option>
                      <option value="+249">🇸🇩 Sudan (+249)</option>
                      <option value="+597">🇸🇷 Suriname (+597)</option>
                      <option value="+268">🇸🇿 Swaziland (+268)</option>
                      <option value="+46">🇸🇪 Sweden (+46)</option>
                      <option value="+41">🇨🇭 Switzerland (+41)</option>
                      <option value="+963">🇸🇾 Syria (+963)</option>
                      <option value="+886">🇹🇼 Taiwan (+886)</option>
                      <option value="+992">🇹🇯 Tajikistan (+992)</option>
                      <option value="+255">🇹🇿 Tanzania (+255)</option>
                      <option value="+66">🇹🇭 Thailand (+66)</option>
                      <option value="+670">🇹🇱 Timor-Leste (+670)</option>
                      <option value="+228">🇹🇬 Togo (+228)</option>
                      <option value="+690">🇹🇰 Tokelau (+690)</option>
                      <option value="+676">🇹🇴 Tonga (+676)</option>
                      <option value="+1-868">🇹🇹 Trinidad & Tobago (+1-868)</option>
                      <option value="+216">🇹🇳 Tunisia (+216)</option>
                      <option value="+90">🇹🇷 Turkey (+90)</option>
                      <option value="+993">🇹🇲 Turkmenistan (+993)</option>
                      <option value="+1-649">🇹🇨 Turks & Caicos (+1-649)</option>
                      <option value="+688">🇹🇻 Tuvalu (+688)</option>
                      <option value="+256">🇺🇬 Uganda (+256)</option>
                      <option value="+380">🇺🇦 Ukraine (+380)</option>
                      <option value="+971">🇦🇪 United Arab Emirates (+971)</option>
                      <option value="+44">🇬🇧 United Kingdom (+44)</option>
                      <option value="+1">🇺🇸 United States (+1)</option>
                      <option value="+598">🇺🇾 Uruguay (+598)</option>
                      <option value="+998">🇺🇿 Uzbekistan (+998)</option>
                      <option value="+678">🇻🇺 Vanuatu (+678)</option>
                      <option value="+39">🇻🇦 Vatican City (+39)</option>
                      <option value="+58">🇻🇪 Venezuela (+58)</option>
                      <option value="+84">🇻🇳 Vietnam (+84)</option>
                      <option value="+1-284">🇻🇬 British Virgin Islands (+1-284)</option>
                      <option value="+1-340">🇻🇮 US Virgin Islands (+1-340)</option>
                      <option value="+681">🇼🇫 Wallis & Futuna (+681)</option>
                      <option value="+967">🇾🇪 Yemen (+967)</option>
                      <option value="+260">🇿🇲 Zambia (+260)</option>
                      <option value="+263">🇿🇼 Zimbabwe (+263)</option>
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full sm:flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your street address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-white mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-white mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="Enter postal code"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select your country</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AG">Antigua & Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BA">Bosnia & Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BR">Brazil</option>
                    <option value="BN">Brunei</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">Congo (DRC)</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="XK">Kosovo</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Laos</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macau</option>
                    <option value="MK">Macedonia</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia</option>
                    <option value="MD">Moldova</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="KP">North Korea</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestine</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Réunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russia</option>
                    <option value="RW">Rwanda</option>
                    <option value="KN">Saint Kitts & Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="VC">Saint Vincent</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">São Tomé & Príncipe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="KR">South Korea</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syria</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad & Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks & Caicos</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VA">Vatican City</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Vietnam</option>
                    <option value="VG">British Virgin Islands</option>
                    <option value="VI">US Virgin Islands</option>
                    <option value="WF">Wallis & Futuna</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 3: Financial Information */}
            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div className="bg-black/20 border border-white/10 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Investment Preferences</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Expected Investment Amount
                        </label>
                        <select 
                          value={formData.investmentAmount}
                          onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select amount range</option>
                          <option value="0-1000">$0 - $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000+">$10,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Investment Experience
                        </label>
                        <select 
                          value={formData.investmentExperience}
                          onChange={(e) => setFormData({ ...formData, investmentExperience: e.target.value })}
                          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select experience level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Primary Investment Goal
                        </label>
                        <select 
                          value={formData.investmentGoal}
                          onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}
                          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select your goal</option>
                          <option value="growth">Long-term Growth</option>
                          <option value="income">Passive Income</option>
                          <option value="trading">Active Trading</option>
                          <option value="diversification">Portfolio Diversification</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Security */}
            {currentStep === 4 && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Password Requirements Checklist */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-slate-400 mb-2">Password must contain:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`flex items-center gap-2 text-xs transition-colors ${
                        passwordValidation.minLength ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {passwordValidation.minLength ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>At least 8 characters</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 text-xs transition-colors ${
                        passwordValidation.hasUppercase ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {passwordValidation.hasUppercase ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>One uppercase letter</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 text-xs transition-colors ${
                        passwordValidation.hasLowercase ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {passwordValidation.hasLowercase ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>One lowercase letter</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 text-xs transition-colors ${
                        passwordValidation.hasNumber ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {passwordValidation.hasNumber ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>One number</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 bg-black/30 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors">
                      I agree to the{' '}
                      <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 py-3.5 bg-black/50 hover:bg-black/70 text-white font-semibold rounded-lg transition-all border border-white/20"
                >
                  Previous
                </button>
              )}
              <button
                type={currentStep === 4 ? 'submit' : 'button'}
                onClick={currentStep === 4 ? undefined : handleNext}
                disabled={isLoading}
                className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] disabled:hover:scale-100"
              >
                {currentStep === 4 ? (
                  isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : 'Create Account'
                ) : 'Next'}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Your information is protected with bank-level security</span>
        </div>
      </div>
    </div>
  );
}