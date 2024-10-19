import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { currentUser, logIn, logInWithGoogle, logInWithGithub } =
    useContext(AuthContext);
  console.log("Current User= ", currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    console.log(form);

    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    logIn({ email: email, password: password })
      .then((result) => {
        console.log(result.user);
        toast.success("User Login Successfully", {
          position: "top-right",
        });

        navigate(location?.state ? location.state : "/products");
      })
      .catch((error) => {
        console.log("Login error", error);
      });
  };

  const handlelogInWithGoogle = () => {
    logInWithGoogle()
      .then(() => {
        toast.success("User Login Successfully", {
          position: "top-right",
        });

        navigate(location?.state ? location.state : "/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlelogInWithGithub = () => {
    logInWithGithub()
      .then((result) => {
        toast.success("User Login Successfully with Github", {
          position: "top-right",
        });

        navigate(location?.state ? location.state : "/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen p-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Email</span>
              </label>
              <input
                className="input input-bordered"
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                autoComplete="on"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                className="input input-bordered"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="on"
                required
              />
              <label className="label justify-end">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-blue-500"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-secondary">
                Login
              </button>
              {/* <button
                type="submit"
                className="btn btn-outline btn-info rounded-none"
              >
                <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                  Login
                </span>
              </button> */}
            </div>
            <div className="form-control mt-6">
              <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                Or Login with
              </div>
              <button
                onClick={handlelogInWithGoogle}
                type="button"
                className="btn btn-outline btn-success mt-2 "
              >
                Sign in with Google
              </button>

              <button
                onClick={handlelogInWithGithub}
                type="button"
                className="btn btn-outline btn-info mt-2 "
              >
                Sign in with GitHub
              </button>
            </div>

            <p className="text-center mt-5">
              <span>Don't have an account? </span>
              <span className="text-blue-500">
                <Link to={"/register"}>Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
