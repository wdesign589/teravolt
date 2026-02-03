# 💎 Lunex Corp Union

> **Modern Investment & Copy Trading Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📚 Documentation

**For complete project documentation, see:**
- **[📖 Complete Project Documentation](./COMPLETE_PROJECT_DOCUMENTATION.md)** - All features, fixes, setup guides, and technical details

---

## ✨ Key Features

### 🔐 Authentication & Security
- Secure user signup & login with JWT
- Email verification system
- Password hashing with bcrypt
- Role-based access control (User/Admin)

### 💼 User Dashboard
- Real-time portfolio overview
- Investment tracking & management
- Transaction history
- Profit/loss analytics
- KYC verification system

### 📈 Copy Trading
- Browse professional traders
- View trader statistics & performance
- Allocate funds to copy traders
- Real-time profit tracking
- Manage active copy positions

### 💰 Deposit & Withdrawal
- Multiple cryptocurrency support
- Wallet address management
- Admin approval workflow
- Transaction history
- Status tracking

### 🎨 Modern UI/UX
- Responsive design (mobile-first)
- Dark mode glassmorphic interface
- Smooth animations with Framer Motion
- Interactive charts & visualizations
- Multi-language support (Google Translate)

### 👨‍💼 Admin Panel
- User management
- KYC review & approval
- Deposit/withdrawal management
- Copy trader management
- Client investment tracking
- Wallet management
- Analytics dashboard

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **State:** Zustand
- **Validation:** Zod

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB
- **Authentication:** JWT + bcryptjs
- **Email:** Nodemailer + Resend
- **File Upload:** Cloudinary
- **API:** Next.js API Routes

### Tools & Services
- **Live Chat:** Smartsupp
- **Translation:** Google Translate
- **Image Optimization:** Next.js Image
- **Code Quality:** ESLint + Prettier

---

## 📦 Project Structure

```
lunex/
├── app/
│   ├── (auth)/          # Authentication pages (sign-in, sign-up)
│   ├── (dashboard)/     # User dashboard pages
│   ├── (admin)/         # Admin panel pages
│   ├── api/             # API routes
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
├── lib/
│   ├── models/          # MongoDB models
│   ├── mongodb.ts       # Database connection
│   └── utils/           # Utility functions
├── stores/              # Zustand state management
├── public/              # Static assets
└── COMPLETE_PROJECT_DOCUMENTATION.md
```

---

## 🔑 Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=lunex

# Authentication
JWT_SECRET=your-secret-key

# Email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Cloudinary (for KYC uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📱 Features Overview

### User Features
- ✅ Secure authentication with email verification
- ✅ Complete KYC verification process
- ✅ Investment portfolio management
- ✅ Copy trading functionality
- ✅ Deposit & withdrawal system
- ✅ Real-time profit tracking
- ✅ Transaction history
- ✅ Profile & settings management
- ✅ 24/7 live chat support
- ✅ Multi-language support

### Admin Features
- ✅ User management & KYC approval
- ✅ Deposit/withdrawal approval
- ✅ Copy trader management
- ✅ Client investment tracking
- ✅ Wallet management
- ✅ Analytics & reporting
- ✅ System monitoring

---

## 🎯 Recent Updates

### Mobile Responsiveness
- ✅ Signup form optimized for mobile
- ✅ Dashboard shows desktop view on mobile
- ✅ Landing pages remain fully responsive

### Live Chat Integration
- ✅ Smartsupp Live Chat on all pages
- ✅ Removed static chatbot section
- ✅ Quick access from support page

### UI Improvements
- ✅ Hero section with fade effects
- ✅ Dynamic date display
- ✅ Updated contact information
- ✅ Improved mobile navigation

---

## 🤝 Contributing

This is a private project. For issues or feature requests, contact the development team.

---

## 📄 License

Proprietary - All rights reserved © 2024 Lunex Corp Union

---

## 📞 Support

- **Email:** support@lunexcorpunion.com
- **Phone:** +1 816 993 7422
- **Live Chat:** Available 24/7 on the platform

---

**Built with ❤️ by the Lunex Corp Union Team**
