import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Authentication/SignUp";
import SignIn from "../Authentication/SignIn";
import BiodataForm from "../Pages/FormBiodata/BioDataForm";
import Biodatas from "../Pages/Biodatas/Biodatas";
import Details from "../Pages/Biodatas/Details";
import PrivateRoute from "../Routes/PrivateRoute";
// import NormalDashBoard from "../Pages/Dashboard/NormalDashBoard";
import DashBoardLayouts from "../Layouts/DashBoardLayouts";
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
      {
        path:'/biodataform',
        Component:BiodataForm
      },
      {
        path:'/matremony/allData',
        Component:Biodatas
      },
      {
        path:'/details/:id',
       element:<PrivateRoute>
        <Details></Details>
       </PrivateRoute>
      },
      {
        path:'/dashboard',
        element:<DashBoardLayouts></DashBoardLayouts>,
      
      }
  
    ]
    
  },
]);

