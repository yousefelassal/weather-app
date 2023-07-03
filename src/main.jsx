import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Index from './routes/Index'
import Calendar from './routes/Calendar'
import Map from './routes/Map'
import Saved from './routes/Saved'
import Settings from './routes/Settings'
import Profile, {loader as profileLoader} from './routes/Profile'
import EditProfile from './routes/EditProfile'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: profileLoader,
    children: [
        {index: true, element: <Index />},
        {
          path: 'map',
          element: <Map />,
        },
        {
          path: 'saved',
          element: <Saved />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
        {
          path: 'profile',
          element: <Profile />,
          loader: profileLoader,
        },
        {
          path: 'profile/edit',
          element: <EditProfile />,
          loader: profileLoader,
        }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
