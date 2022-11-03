import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { clientId, credential } = response.profileObj;
    const doc = {
      _id: clientId,
      _type: "user",
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            {
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
                redirect_uri="http://localhost:3000/"
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
