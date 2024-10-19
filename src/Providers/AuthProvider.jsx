import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  //githubAuthProvider.addScope("repo");

  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async ({
    email,
    password,
    name,
    phoneNumber,
    address,
    photo,
  }) => {
    try {
      console.log("Email= ", email);
      console.log("Pass= ", password);
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: newUser.uid,
          email: newUser.email,
          displayName: name || "User",
          phone: phoneNumber,
          photoUrl: photo || "https://i.ibb.co/k6hTYW1/Alien-Dev.jpg",
          address: address,
          isAdmin: false, // Default role
          isBlocked: false, // Default status
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user data.");
      }

      return newUser;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error; // Re-throw error for further handling if needed
    }
  };

  const logIn = ({ email, password }) => {
    console.log("Email= ", email);
    console.log("Pass= ", password);
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };
  const logInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubAuthProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const stateDataChanged = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return stateDataChanged;
  }, []);

  const authInfo = {
    currentUser,
    loading,
    signup,
    logIn,
    logInWithGoogle,
    logInWithGithub,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
