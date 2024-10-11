import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { app } from "../config/firebases.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { replace, useNavigate } from "react-router-dom";

// console.log(app);

const Login = ({setAuth}) => {

  // get the firebase auth service
  // authentication session
  const firebaseAuth = getAuth(app);
  // create a new google auth provider
  // provide info about the google auth provider
  // ex: facebook, twitter, etc
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    // open a popup to sign in with google
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if(userCred) {
		setAuth(true);
		window.localStorage.setItem("auth", "true");

		firebaseAuth.onAuthStateChanged((userCred) => {
			if(userCred) {
				userCred.getIdToken().then((token) => {
					console.log(token);
				});
				navigate("/", {replace: true});
			} else {
				setAuth(false);
				window.localStorage.setItem("auth", "false");
				navigate("/login");
			}
		});
	  }
    });
  };

  useEffect(() => {
	if(window.localStorage.getItem("auth") === "true") {
		navigate("/", {replace: true});
	}
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 flex items-center justify-center bg-darkOverlay p-4">
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-lightOverlay p-4 shadow-2xl backdrop-blur-md md:w-375">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-cardOverlay px-4 py-2 transition-all duration-100 ease-in-out hover:bg-card hover:shadow-md"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
