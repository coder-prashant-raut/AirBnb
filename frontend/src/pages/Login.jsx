import React from "react";
import { useState, useContext } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { userDataContext } from "../context/UserContext.jsx";

import axios from 'axios'

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {serverUrl} = useContext(AuthDataContext)
  const { userData, setUserData } = useContext(userDataContext);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
 );
      setUserData(result.data)
      navigate("/")

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div
        className="w-[50px] h-[50px] cursor-pointer absolute top-10 left-10 flex items-center justify-center bg-amber-200 rounded-full"
        onClick={() => navigate("/")}
      >
        <TiArrowLeftThick className="cursor-pointer w-[70px] h-[40px]  " />
      </div>
      <form
        action=""
        className="w-max-[900px] w-[90%] h-[600px] flex items-center justify-center  flex-col  gap-[10px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl text-black w-full  flex justify-center">
          Welcome Back to AirBnb
        </h1>

        <div className="flex flex-col justify-between w-full max-w-xl gap-[10px]">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-sm px-3 "
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

/>
        </div>
        <div className="flex flex-col justify-between w-full max-w-xl gap-[10px] relative">
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            id="password"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-sm px-3 "
             required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}

          />
          {!show && (
            <FaRegEyeSlash
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10%] cursor-pointer "
              onClick={() => setShow(true)}
            />
          )}
          {show && (
            <FaRegEye
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10%] cursor-pointer "
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <button className="px-10 bg-amber-200 py-3 rounded-sm hover:bg-amber-300 cursor-pointer">
          Login
        </button>
        <p className="">
          New Here ?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
