# Carizon Car Store Frontend

Check out our [Live Link](https://car-store-frontend.vercel.app) 


## Description

A professional and highly efficient backend system for seamless management of an e-commerce Car Store, built with React, Redux, ShanCDN, ATD, Tailwind CSS, and TypeScript. This platform is designed to provide a smooth and intuitive user experience for customers browsing and purchasing cars. It features seamless integration with ShurjoPay for secure payment processing, allowing customers to make quick and hassle-free payments. The system includes robust user authentication with JWT (JSON Web Token), ensuring secure login, registration, and user verification. The backend is optimized for smooth integration with the front-end, delivering a responsive and efficient experience for both customers and admin users. Admins can manage products, process orders, and track platform activities, while customers can easily browse products, view details, add cars to their cart, and complete their purchases securely.

## Features

## User Registration & Authentication:
Set up a smooth user registration and login process, ensuring that users can sign up and log in easily. Additionally,  implemented role-based authentication, which allows you to differentiate between regular users and admins. Users are assigned roles, and access to various parts of the website is restricted based on these roles.

## Public Routes:
### Home Page:
This page serves as an overview of the platform, welcoming users and providing a brief introduction to the site and its offerings. Like product page and product details page

### All Products Page:
Here, all available cars are showcased with options for filtering and sorting, allowing users to find their desired products with ease.

### Product Details Page:
This page displays detailed information about a specific cars, such as features, specifications, pricing, and availability.

### About Us Page:
Provides information about the platform , giving users insight into its mission, vision, and values.

## Private Routes:
### Checkout Page:
Accessible only to authenticated users, this page allows users to place orders. It ensures that only those logged in can make purchases. 

### Dashboard (Role-Based Access):
#### User Role:
Users can view their order history and account details, allowing them to track past orders, can change password.

#### Admin Role:
Admins have full access to manage products, view all orders, and oversee the platform's activities, ensuring smooth operations.

## Technologies Used

### Frontend:
- **React (v18.3.1):** For building UI components.
- **TypeScript:** For type safety and better developer experience.
- **TailwindCSS:** For styling and responsive design.
- **React Router (v7.1.3):** For routing and navigation.
- **Redux Toolkit:** For state management.
- **Recharts:** For data visualization in dashboards.
- **Ant Design:** For UI components and design system.
- **SanCdn Carousel:** For carousel functionality.
- **Zod:** For schema validation.
- **Sonner:** For toast notifications.


## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Scripts

- **Start Development Server:**

  ```bash
  npm run dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

```
├── public
├── src
│   ├── Admin
│   │   ├── AddProduct.tsx
│   │   ├── ManagaeProduct.tsx
│   │   ├── ManageOrder.tsx
│   ├── components
│   │   ├── Form
│   │   ├── ui
│   ├── Home
│   │   ├── Home.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── AboutUs.tsx
│   │   ├── Dashboard
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── UserDashboard.tsx
│   ├── redux
│   │   ├── store.ts
│   │   ├── slices
│   │   │   ├── userSlice.ts
│   │   │   └── productSlice.ts
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── package.json
└── vite.config.ts
```

---
