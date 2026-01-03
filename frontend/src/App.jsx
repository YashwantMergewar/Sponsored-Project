import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './app-layout.jsx'
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterVoterPage from './pages/RegisterVoterPage';
import Dashboard from './pages/Dashboard';
import VoterProfile from './pages/VoterProfile';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/register-voter',
        element:<ProtectedRoute><RegisterVoterPage /></ProtectedRoute>
      },
      {
        path: '/profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
      },
      {
        path: '/voter/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: '/about',
        element: <h1>This is About Page</h1>
      },
      {
        path: '/voter/profile',
        element: <ProtectedRoute><VoterProfile /></ProtectedRoute>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
