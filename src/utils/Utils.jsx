const BASE_URL = "http://localhost:5000";

const ALL_USERS_URL = `${BASE_URL}/api/users`;

const USER_DETAILS_URL = ({ user_id }) => {
  console.log("user id", user_id);
  return `${BASE_URL}/api/users/${user_id}`;
};

const ALL_CATEGORIES_URL = `${BASE_URL}/api/categories`;

const CATEGORY_DETAILS_URL = ({ id }) => {
  return `${BASE_URL}/api/categories/${id}`;
};

const ALL_PRODUCTS_URL = `${BASE_URL}/api/products`;

const PRODUCT_DETAILS_URL = ({ id }) => {
  return `${BASE_URL}/api/products/${id}`;
};
const ALL_PRODUCTS_BY_CATEGORIES_URL = ({ category }) => {
  return `${BASE_URL}/api/categories/products/${category}`;
};

const ALL_ORDERS_URL = `${BASE_URL}/api/orders`;

const ORDER_DETAILS_URL = ({ id }) => {
  return `${BASE_URL}/api/orders/${id}`;
};

const ALL_ORDERS_BY_USER_URL = ({ user_id }) => {
  return `${BASE_URL}/api/orders/user/${user_id}`;
};

const Utils = {
  BASE_URL,
  // CourseListUrl,
  // COURSE_DETAILS_URL,
  ALL_USERS_URL,
  USER_DETAILS_URL,
  ALL_CATEGORIES_URL,
  CATEGORY_DETAILS_URL,
  ALL_PRODUCTS_URL,
  PRODUCT_DETAILS_URL,
  ALL_PRODUCTS_BY_CATEGORIES_URL,
  ALL_ORDERS_URL,
  ORDER_DETAILS_URL,
  ALL_ORDERS_BY_USER_URL,
};
export default Utils;
