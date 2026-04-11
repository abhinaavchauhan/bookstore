# 📚 Bookstore Explorer — Premium E-commerce Platform

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Backend](https://img.shields.io/badge/backend-Express-blue.svg)]()
[![Frontend](https://img.shields.io/badge/frontend-NestJS-red.svg)]()
[![Design](https://img.shields.io/badge/design-Glassmorphism-purple.svg)]()

A high-end, full-stack E-commerce platform designed for a modern online bookstore. Featuring a sophisticated **Glassmorphism UI**, **Dark Mode** support, and a robust **RESTful API** backend.

---

## 🎨 Visual Identity & UX
The project prioritizes a premium user experience with:
- **Glassmorphism Aesthetic**: Translucent navigation and cards for a modern, depth-focused look.
- **Dynamic Dark Mode**: Seamlessly switches between high-contrast light and sleek dark themes.
- **Smooth Animations**: Pulse effects, hover transitions, and staggered letter animations during loading.
- **Responsive Mastery**: Tailored layouts for mobile, tablet, and desktop viewing.

---

## 🏗️ Technical Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: NestJS, Handlebars (SSR), Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens) with Secure HTTP Headers (Helmet)
- **State Management**: LocalStorage for persistent auth and multi-device support
- **Mailing**: Nodemailer integrated for transactional order updates

---

## ✨ Features

### 🛒 Seamless Shopping
- **Real-time Cart**: Instant visual feedback (checkmark animations) when adding books.
- **Live Badge Updates**: Navbar cart count synchronizes instantly across the app.
- **Integrated Checkout**: Secure multi-step ordering with address management.

### 📚 Discoverability
- **Smart Search & Filters**: Real-time filtering by category (Fiction, Technology, Science, etc.).
- **Inventory Tracking**: Automated stock management and "Sold Out" status indicators.
- **User Dashboard**: personalized order history and tracking.

### 🛡️ Secure Infrastructure
- **Role-Based Auth**: Distinct paths for customers and administrative staff.
- **Data Protection**: Bcrypt password hashing and `express-validator` sanitization.
- **Error Handling**: Comprehensive middleware for graceful failovers and logging.

---

## ⚡ Installation & Setup

### 1. Environment Config
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_premium_secret_key
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password
```

### 2. Launch Sequence

#### **Backend (Express)**
```bash
npm install
node seeder.js       # Populate with 15+ premium titles
npm run dev
```

#### **Frontend (NestJS)**
```bash
cd bookstore-frontend
npm install
npm run dev
```

---

## 📡 API Architecture

| Method | Endpoint | Access |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/books` | Public |
| `POST` | `/api/cart` | Private |
| `GET` | `/api/admin/dashboard` | Admin Only |

---

## 🧪 Testing Coverage
Run the automated integration suite to verify all core functions:
```bash
node test_api.js
```

---

## 📄 License
Crafted with ❤️ by Abhinav Chauhan.
