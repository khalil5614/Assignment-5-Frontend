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
import AllCategoriesPage from "../Pages/DashBoard/AllCategoriesPage";
import AllProductsPage from "../Pages/DashBoard/AllProducts";
import MyProductsPage from "../Pages/DashBoard/MyProducts";

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
        loader: () => fetch(Utils.ALL_PRODUCTS_URL),
      },

      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(Utils.PRODUCT_DETAILS_URL({ id: params.id })),
        element: <ProductDetailsPage />,
      },
      {
        path: "/catproducts/:cat_title",
        element: (
          <PrivateRoute>
            <ProductsPage />,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            Utils.ALL_PRODUCTS_BY_CATEGORIES_URL({
              cat_title: params.cat_title,
            })
          ),
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
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "allusers",
        element: <AllUsersPage />,
      },
      {
        path: "allcategories",
        element: <AllCategoriesPage />,
      },
      {
        path: "allproducts",
        element: <AllProductsPage />,
      },
      {
        path: "myproducts",
        element: <MyProductsPage />,
      },
    ],
  },
]);

export default router;
