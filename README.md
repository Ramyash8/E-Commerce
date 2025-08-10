# 🛍️ ShopSphere

Welcome to **ShopSphere**, a feature-rich e-commerce application built with a modern, full-stack technology set. This project serves as a comprehensive template for building production-ready online stores.

This application is deployed at **[shopsphere7.netlify.app](https://shopsphere7.netlify.app/)**.

---

## 🚀 Features

-   **Modern Storefront**: A responsive and visually appealing shop where users can browse products, view details, and add items to their cart.
-   **Comprehensive Product Pages**: Detailed product views with image galleries, descriptions, reviews, and related items.
-   **Shopping Cart & Wishlist**: Persistent cart and wishlist functionality using client-side state management.
-   **Secure Checkout Flow**: A multi-step checkout process with user authentication checks.
-   **User Authentication**: Full email/password sign-up and login functionality powered by Firebase Auth.
-   **Admin Dashboard**: A protected area for store administrators to manage products, view orders, and oversee customers.
-   **Database Seeding**: An easy-to-use interface for populating the Firestore database with sample data.
-   **Theming**: Light and dark mode support with a customizable theme.

---

## 🛠️ Tech Stack

This project leverages a powerful and modern set of technologies:

| Layer              | Technology                                                                |
| ------------------ | ------------------------------------------------------------------------- |
| **Framework**      | [Next.js](https://nextjs.org/) (App Router)                               |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)                             |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                                  |
| **UI Components**  | [ShadCN/UI](https://ui.shadcn.com/)                                       |
| **Authentication** | [Firebase Authentication](https://firebase.google.com/docs/auth)          |
| **Database**       | [Cloud Firestore](https://firebase.google.com/docs/firestore)             |
| **Generative AI**  | [Google AI with Genkit](https://firebase.google.com/docs/genkit)          |
| **Deployment**     | [Netlify](https://www.netlify.com/)                                       |

---

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
/
├── src/
│   ├── app/                # Main application routes (App Router)
│   │   ├── (admin)/        # Admin-only routes and components
│   │   ├── (auth)/         # Login, signup pages
│   │   └── ...             # Other public pages (home, shop, product, etc.)
│   ├── components/         # Reusable React components (ProductCard, Header, etc.)
│   │   └── ui/             # ShadCN UI components
│   ├── context/            # Global state management (Cart, Auth, Wishlist)
│   ├── hooks/              # Custom React hooks (useCart, useAuth, etc.)
│   ├── lib/                # Core logic, utilities, and Firebase services
│   │   ├── db/             # Sample data for seeding
│   │   ├── firebase.ts     # Firebase initialization
│   │   └── ...             # Data fetching functions for products, orders, users
│   └── ai/                 # Genkit AI flows and configuration
├── public/                 # Static assets
├── netlify.toml            # Netlify deployment configuration
└── ...                     # Other config files (tailwind, next, etc.)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/shopsphere.git
cd shopsphere


2️⃣ Install Dependencies
npm install

4️⃣ Run Development Server

npm run dev

🛡 Admin Access
Login credentials:

Email: admin@shopsphere.com
Password: password123
