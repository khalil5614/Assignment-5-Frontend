import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../Componenets/shared/DashBoardLayout";
import ProfilePage from "../Pages/DashBoard/ProfilePage";
import AllUsersPage from "../Pages/DashBoard/AllUsersPage";
import Utils from "../utils/Utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/products",
        element: (
          <PrivateRoute>
            <ProductsPage />,
          </PrivateRoute>
        ),
        loader: () => fetch(Utils.CourseListUrl),
      },

      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(
            Utils.CourseDetailsURL(params.id)
            //  `https://assignment-4-server-side-code.vercel.app/api/courses/${params.id}`
          ),
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
      {
        path: "AllUsers",
        element: <AllUsersPage />,
      },
    ],
  },
]);

export default router;
