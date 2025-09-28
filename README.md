# Task Manager Dashboard

A modern, responsive task management application built with React.js, Redux Toolkit, Material-UI, and Tailwind CSS.

## 🚀 Features

### ✅ Authentication
- **Login & Register**: Complete authentication system with form validation
- **Protected Routes**: Dashboard routes are protected and redirect unauthenticated users
- **Mock Authentication**: Uses localStorage-based auth with demo credentials
- **Auto-redirect**: Authenticated users are automatically redirected to dashboard

### 📊 Dashboard
- **Statistics Overview**: Visual cards showing project and task statistics
- **Progress Tracking**: Completion rates and overdue task alerts
- **Real-time Updates**: All changes reflect immediately without page refresh

### 🎯 Project Management
- **Create Projects**: Add new projects with name and description
- **Edit Projects**: Update project details inline
- **Delete Projects**: Remove projects with all associated tasks
- **Project Cards**: Beautiful cards showing project overview and task summary

### ✏️ Task Management
- **Add Tasks**: Create tasks with title, status, and optional due dates
- **Update Status**: Change task status between Todo, In Progress, and Done
- **Edit Tasks**: Modify task details including due dates
- **Delete Tasks**: Remove individual tasks
- **Overdue Tracking**: Visual indicators for overdue tasks

### 🎨 UI/UX Features
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Material Design**: Clean, modern UI using Material-UI components
- **Tailwind Styling**: Utility-first CSS for rapid styling
- **Loading States**: Proper loading indicators and error handling
- **Date Management**: Integrated date picker for due dates

## 🛠️ Tech Stack

- **Frontend**: React.js 19+ with Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Date Handling**: @mui/x-date-pickers with date-fns
- **Icons**: Material-UI Icons

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Demo Credentials

The application includes demo users for testing:

- **Admin User**: 
  - Email: `admin@example.com`
  - Password: `password123`

- **Regular User**: 
  - Email: `user@example.com`
  - Password: `user123`

## 📱 Screenshots & Demo

The application includes:
- Landing page with clean design
- Login/Register forms with validation
- Dashboard with statistics cards
- Project management interface
- Task creation and editing modals
- Responsive design for all screen sizes

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── common/
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatisticsCards.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── AddProjectDialog.jsx
│   │   └── AddTaskDialog.jsx
│   └── Home.jsx
├── store/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       └── projectSlice.js
├── App.jsx
└── main.jsx
```

## 🔄 State Management

The application uses Redux Toolkit for state management:

- **Auth Slice**: Handles user authentication, login, register, and logout
- **Project Slice**: Manages projects and tasks with CRUD operations
- **Persistence**: Data is stored in localStorage for demo purposes

## 🎯 Key Features Implemented

✅ **Authentication System**
- Login/Register with validation
- Protected and public routes
- Redux state management
- localStorage persistence

✅ **Project Management**
- CRUD operations for projects
- Real-time updates
- User-specific project filtering

✅ **Task Management**
- CRUD operations for tasks
- Status management (Todo, In Progress, Done)
- Due date tracking with overdue alerts
- Task statistics and progress tracking

✅ **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

✅ **Modern UI/UX**
- Material Design principles
- Smooth animations and transitions
- Intuitive navigation
- Error handling and loading states

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages

Build the project with `npm run build` and deploy the `dist` folder.

## 📄 License

This project is created as part of a technical assessment and is for demonstration purposes.

---

Built with ❤️ using React, Redux, Material-UI, and Tailwind CSS+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Task-Manager
