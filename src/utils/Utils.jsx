const BASE_URL = "http://localhost:5000";
const CourseListUrl = `${BASE_URL}api/courses`;
//const CourseDetailsURL = `https://assignment-4-server-side-code.vercel.app/api/courses/${id}`;

const COURSE_DETAILS_URL = ({ course_id }) => {
  return `${BASE_URL}/api/courses/${course_id}`;
};

const ALL_USERS_URL = `${BASE_URL}/api/users`;

const USER_DETAILS_URL = ({ user_id }) => {
  console.log("user id", user_id);
  return `${BASE_URL}/api/users/${user_id}`;
};
// const Utils = () => {
//   // const info = { BASE_URL, CourseListUrl, CourseDetailsURL, ALL_USERS_URL };
//   // return info;
// };
const Utils = {
  BASE_URL,
  CourseListUrl,
  COURSE_DETAILS_URL,
  ALL_USERS_URL,
  USER_DETAILS_URL,
};
export default Utils;
