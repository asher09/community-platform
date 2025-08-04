
# Community Platform

A modern community platform built with Next.js, allowing users to create profiles, share posts, and interact with other community members.

## 📌 Quick Links

- **GitHub Repository**: [https://github.com/asher09/community-platform](https://github.com/asher09/community-platform)
- **Live Demo**: [https://community-platform-beta.vercel.app](https://community-platform-beta.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/asher09/community-platform.git
   cd community-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 👤 Demo Accounts

You can use the following accounts to test the application:

### Demo User
- **Email**: test@mail.com  
- **Password**: 12345678

## ✨ Features

- **User Authentication**: Secure login and registration system
- **User Profiles**: Customizable user profiles with bio
- **Posts Creation**: Users can create, edit and delete posts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant notifications for user interactions
- **Admin Dashboard**: Manage users and content (admin accounts only)

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## 📦 Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
