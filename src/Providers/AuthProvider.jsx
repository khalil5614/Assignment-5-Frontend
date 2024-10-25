import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import Utils from "../utils/Utils";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);
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

      const response = await fetch(Utils.ALL_USERS_URL, {
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

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const stateDataChanged = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
      console.log("Current User  onAuthStateChanged");
      console.log("Current User  onAuthStateChanged", currentUser);
      if (
        currentUser != null &&
        (currentUser.displayName == null ||
          currentUser.displayName === "" ||
          currentUser.displayName === "undefined")
      ) {
        console.log("Display Name:", currentUser.displayName);

        try {
          const res = await fetch(
            Utils.USER_DETAILS_URL({ user_id: currentUser.uid })
          );

          const data = await res.json();
          setCurrentUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
        setLoading(false);
      }
    });

    return stateDataChanged;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     console.log("Current User  onAuthStateChanged", currentUser);
  //     if (currentUser) {
  //       try {
  //         const res = await fetch(
  //           `https://the-master-full-stack-project-server.vercel.app/user/${currentUser.uid}`
  //         );

  //         if (!res.ok) {
  //           throw new Error("Failed to fetch user data.");
  //         }

  //         const data = await res.json();
  //         setCurrentUser(data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error.message);
  //       }
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [auth]);

  const authInfo = {
    currentUser,
    loading,
    signup,
    logIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
