import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Authentication/SignUp";
import SignIn from "../Authentication/SignIn";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/signup',
        Component:SignUp
      },
      {
        path:'/signin',
        Component:SignIn
      },
  
    ]
    
  },
]);

