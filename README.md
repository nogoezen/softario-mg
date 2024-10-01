# Softario E-commerce Platform

## Overview

Softario is a modern e-commerce platform built with Next.js, focusing on providing a seamless shopping experience with a sleek user interface. This project showcases various features including product listings, a shopping cart system, user authentication, and an admin dashboard.

## Key Features

- **Product Showcase**: Display products with detailed information and images.
- **Best Deals Section**: Highlight top products or special offers.
- **Interactive UI Components**: Utilizing Aceternity UI for enhanced user experience.
- **Responsive Design**: Fully responsive layout for all device sizes.
- **Dark Mode Support**: Toggle between light and dark themes.
- **User Authentication**: Secure login and registration system.
- **Shopping Cart**: Add, remove, and manage products in the cart.
- **Admin Dashboard**: Manage products, view statistics, and handle user profiles.

## Technology Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **UI Components**: Custom components and Aceternity UI
- **State Management**: React Context API
- **Authentication**: Appwrite
- **Animation**: Framer Motion

## Project Structure

- `app/`: Next.js app directory
  - `components/`: Reusable React components
    - `front/`: Frontend-specific components
    - `dashboard/`: Admin dashboard components
    - `ui/`: Shared UI components
  - `page.tsx`: Main entry point for the application
- `lib/`: Utility functions and mock data
- `public/`: Static assets

## Key Components

- `BestDeals`: Showcases top product offers
- `ProductList`: Displays the full catalog of products
- `ProductCard`: Individual product display component
- `Navbar`: Navigation component with cart and user menu
- `DashboardWrapper`: Admin dashboard layout and navigation

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/softario-ecommerce.git
   ```

2. Install dependencies:
   ```
   cd softario-ecommerce
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary variables.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

We welcome contributions to Softario! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Aceternity UI for providing beautiful and interactive UI components
- Next.js team for the amazing React framework
- All contributors who have helped shape this project
