import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";

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
        loader: () =>
          fetch("https://assignment-4-server-side-code.vercel.app/api/courses"),
      },

      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(
            `https://assignment-4-server-side-code.vercel.app/api/courses/${params.id}`
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
]);

export default router;
