import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Route.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import Aos from 'aos'
import './index.css'
import 'aos/dist/aos.css';

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
