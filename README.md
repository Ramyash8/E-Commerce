
# ShopSphere - A Modern E-commerce Storefront

Welcome to ShopSphere, a feature-rich e-commerce application built with a modern, full-stack technology set. This project serves as a comprehensive template for building production-ready online stores, complete with an admin dashboard, user authentication, product management, and a seamless shopping experience.

This application was built with the help of an AI assistant.

## Overview

ShopSphere is designed to provide a complete e-commerce solution, from the customer-facing storefront to the administrative backend. It showcases best practices in modern web development, including server-side rendering, client-side interactivity, and integration with backend services.

### Key Features:

*   **Modern Storefront**: A responsive and visually appealing shop where users can browse products, view details, and add items to their cart.
*   **Comprehensive Product Pages**: Detailed product views with image galleries, descriptions, reviews, and related items.
*   **Shopping Cart & Wishlist**: Persistent cart and wishlist functionality using client-side state management.
*   **Secure Checkout Flow**: A multi-step checkout process with user authentication checks.
*   **User Authentication**: Full email/password sign-up and login functionality powered by Firebase Auth.
*   **Admin Dashboard**: A protected area for store administrators to manage products, view orders, and oversee customers.
*   **Database Seeding**: An easy-to-use interface for populating the Firestore database with sample data.
*   **Theming**: Light and dark mode support with a customizable theme.

## Tech Stack

This project leverages a powerful and modern set of technologies:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
*   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
*   **Generative AI**: [Google AI with Genkit](https://firebase.google.com/docs/genkit)
*   **Deployment**: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

## Getting Started

Follow these steps to get a local copy of the project up and running.

### 1. Prerequisites

*   Node.js (v18 or later)
*   npm, yarn, or pnpm

### 2. Firebase Setup

This project uses a pre-configured Firebase project. The configuration is already included in the source code. For local development, you do not need to create a new Firebase project unless you wish to use your own backend.

### 3. Environment Variables for Local Development

For local development, create a `.env.local` file in the root of your project. You only need to add your Gemini API key, as the Firebase keys are already hardcoded for the demo project.

```
# Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/shopsphere.git
cd shopsphere
npm install
```

### 5. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Deployment

This application is ready to be deployed on modern hosting platforms like Vercel or Netlify.

### Deploying with Vercel (Recommended)

1.  **Push to Git**: Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  **Import to Vercel**: Go to the [Vercel dashboard](https://vercel.com/new) and import your repository. Vercel will automatically detect the Next.js framework.
3.  **Add Environment Variables**: Go to the **Settings** tab of your new Vercel project and click on **Environment Variables**. Add the following variables one by one:

| Name                                  | Value                                        |
| ------------------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`        | `AIzaSyAtuuAjbL9pKPw45XK8vWBPtRGqgg_PBwM`    |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`    | `shopsphere-jz759.firebaseapp.com`           |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`     | `shopsphere-jz759`                           |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `shopsphere-jz759.appspot.com`               |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `70281079862`                               |
| `NEXT_PUBLIC_FIREBASE_APP_ID`         | `1:70281079862:web:930139378f04cc30033c97`  |
| `GEMINI_API_KEY`                      | *Your actual Gemini API key*                 |

4.  **Deploy**: Trigger a new deployment from the **Deployments** tab. Vercel will build and deploy your application.

### Deploying with Netlify

1.  **Push to Git**: Push your code to a Git repository.
2.  **Import to Netlify**: Go to your [Netlify dashboard](https://app.netlify.com/start) and import your repository.
3.  **Add Environment Variables**: Netlify will use the `netlify.toml` file to configure the build. Go to **Site settings > Build & deploy > Environment** and add the same environment variables listed in the Vercel instructions above.
4.  **Deploy**: Trigger a new deployment.

## Seeding the Database

To get started with sample data, you can use the database seeding utility in the admin dashboard.

1.  Log in as the admin user (`admin@shopsphere.com` / password: `admin123`). You may need to create this user in your Firebase Authentication console first.
2.  Navigate to the **Admin Dashboard**.
3.  Go to the **Seed Database** page.
4.  Click the **Start Seeding** button to populate your Firestore with sample products, users, and orders.
