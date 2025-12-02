# NextStore - Full Stack E-commerce Platform 🛒

> A complete, responsive e-commerce solution built to demonstrate modern web development capabilities using the Next.js ecosystem.

## 📋 What is this?

**NextStore** is a fully functional web application that simulates a real-world online store. It allows users to browse products, filter by categories, manage a shopping cart, and complete payments securely. It also features a comprehensive **Admin Panel** for business management.

## 🚀 Tech Stack

This project was built using the most modern stack available for React developers:

- **Framework:** Next.js 15 (App Router & Server Actions)
- **Language:** JavaScript (ES6+)
- **Styling:** TailwindCSS
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** NextAuth.js v5 (Google OAuth & Credentials)
- **Payments:** Stripe Checkout Integration
- **State Management:** React Context API (Cart)
- **Notifications:** React Hot Toast

## ✨ Key Features

### 🛍️ Customer Experience

- **Dynamic Showcase:** Featured products carousel and real-time category filtering.
- **Smart Cart:** Persists items on local storage, allowing quantity adjustments and removal.
- **Secure Checkout:** Integrated with Stripe for credit card processing (Test Mode).
- **Mobile First:** Fully responsive design for all devices.

### 🔐 Admin Dashboard

- **Analytics:** Real-time overview of total revenue, active orders, and product count.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) for Products and Categories.
- **Highlights:** Ability to toggle "Featured" products for the homepage banner.
- **Security:** Protected routes and password management.

## 🎯 Project Ambition

This project serves as a **Professional Portfolio Piece (MVP)**.
It aims to showcase proficiency in Full Stack development, bridging the gap between a robust backend (API Routes/DB) and a polished frontend (React/UX). It is structured to be scalable and maintainable.

## 🚦 Project Status

**Completed (v1.1.0)**

- [x] Authentication & Authorization
- [x] Database Connection & Models
- [x] Product & Category Management
- [x] Shopping Cart Logic
- [x] Stripe Payments Integration
- [x] UI/UX Polish

## 🔧 How to Run Locally

If you want to test this project on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/ecommerce-platform.git](https://github.com/YOUR_GITHUB_USERNAME/ecommerce-platform.git)
   ```
2. **Install dependencies:**

```bash
   npm install
```

3. **Configure Environment Variables: Create a .env file in the root directory and add the following keys (you need your own API keys):**

```bash
# Database
MONGODB_URI="your_mongodb_connection_string"

# NextAuth
AUTH_SECRET="your_generated_secret"
AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open:**

```bash
http://localhost:3000
```

## 🧪 Testing & Quality Assurance

ESLint: Enforces code quality and catches errors early.

Mobile Responsiveness: Tested on multiple screen sizes (Mobile, Tablet, Desktop).

Error Handling: Robust try/catch blocks in API routes and visual feedback (Toasts) for users.

## 📦 Deployment

This project is deployed on Vercel, taking advantage of:

Serverless Functions: For API routes.

Edge Caching: For fast static content delivery.

Continuous Deployment: Updates automatically on git push.

Live Demo: https://ecommerce-platform-paulo.vercel.app

## Author

Developed by Paulo. Ready for international opportunities.
