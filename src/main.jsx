import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'
import AuthProvider from './Context/AuthProvider'
import AOS from "aos";
import "aos/dist/aos.css";



AOS.init({
  duration: 800, 
   once: false, 
  offset: 100, 
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router={router}>

  </RouterProvider>
  </AuthProvider>
  </StrictMode>,
)
