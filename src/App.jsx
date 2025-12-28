import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/user/UserDashboard";
import CreateReport from "./pages/user/CreateReport";
import UserDetailReport from "./pages/user/UserDetailReport"

import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import DetailReport from "./pages/admin/DetailReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/reports/create",
        element: <CreateReport />,
      },
      {
        path: "/myreport/:id",
        element: <UserDetailReport />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/report/:id",
        element: <DetailReport />,
      },
    ],
  },
]);

export default router;
