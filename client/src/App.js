import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "./config/firebases.config";
import { getAuth } from "firebase/auth";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login, Dashboard } from "./components";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();
//   console.log("User: ", user);

  const [authState, setauthState] = useState(false);

  // save auth infor in local storage
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true",
  );

  useEffect(() => {
    // get the latest auth state
    firebaseAuth.onAuthStateChanged((userCred) => {
      // if userCred -> extract that refresh token, pass to backend
      // validate token, extract info from token
    //   console.log(userCred);

      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
            setAuth(true);
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
