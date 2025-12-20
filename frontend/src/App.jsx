import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './app-layout.jsx'
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <div>Home Page</div>
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/register-voter',
        element: <div>Register voter Page</div>
      },
      {
        path: '/profile',
        element: <div>Profile Page</div>
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
