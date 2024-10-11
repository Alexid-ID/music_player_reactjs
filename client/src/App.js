import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "./config/firebases.config";
import { getAuth } from "firebase/auth";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate;

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
	  console.log(userCred);
	  
      if (userCred) {
		userCred.getIdToken().then((token) => {
			console.log(token);
		});
      } else {
		setAuth(false);
		window.localStorage.setItem("auth", "false");
		navigate("/login");
	  }
    });
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-400">
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
