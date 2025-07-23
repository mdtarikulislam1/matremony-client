import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Authentication/SignUp";
import SignIn from "../Authentication/SignIn";
import BiodataForm from "../Pages/FormBiodata/BioDataForm";
import Biodatas from "../Pages/Biodatas/Biodatas";
import Details from "../Pages/Biodatas/Details";
import PrivateRoute from "../Routes/PrivateRoute";
import DashBoardLayouts from "../Layouts/DashBoardLayouts";
import AdminDashBoard from "../Pages/Dashboard/Admin/AdminDashBoard";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ApprovedContactRequest from "../Pages/Dashboard/Admin/ApprovedContactRequest";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium";
import FavouritesBiodata from "../Pages/Dashboard/Normal/FavouritesBiodata";
import MyContactRequest from "../Pages/Dashboard/Normal/MyContactRequest";
import ViewBiodata from "../Pages/Dashboard/Normal/ViewBiodata";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      {
        index: true,
        element: <Home />, 
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
     
      {
        path: "matremony/allData",
        element: <Biodatas />,
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashBoardLayouts />
          </PrivateRoute>
        ),
        children: [
          {
            path: "adminDashBoard", 
            element: <AdminDashBoard />
          },
          {
            path:"manageUsers",
            element:<ManageUsers/>
          },
          {
            path:"approvedContactRequest",
            element:<ApprovedContactRequest/>
          },
          {
            path:"approvedPremium",
            element:<ApprovedPremium/>
          },
          {
            path:"viewBioData",
            element:<ViewBiodata/>
          },
          {
            path:"contactRequest",
            element:<MyContactRequest/>
          },
          {
            path:"favorites",
            element:<FavouritesBiodata/>
          },
          {
          path: "editBiodata",
          element: <BiodataForm />,
          },
        ],
      },
    ],
  },
]);
