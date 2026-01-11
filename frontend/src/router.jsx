import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterVoterPage from './pages/RegisterVoterPage';
import Dashboard from './pages/Dashboard';
import VoterProfile from './pages/VoterProfile';
import ChangePasswordPage from './pages/ChangePasswordPage';
import { AuthProvider } from './context/AuthProvider';
import App from './App';

const router = createBrowserRouter([
  {
    element: (
        <AuthProvider>
            <App />
        </AuthProvider>
    ),
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
        path: '/user/change-password',
        element: <ProtectedRoute><ChangePasswordPage /></ProtectedRoute>
      },
      {
        path: '/about',
        element: <h1>This is About Page</h1>
      },
      {
        path: '/voter/profile/:voterId',
        element: <ProtectedRoute><VoterProfile /></ProtectedRoute>
      }
    ]
  }
])

export default router;