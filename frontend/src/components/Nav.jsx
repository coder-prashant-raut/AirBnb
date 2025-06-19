import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/react.svg";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWhatshot, MdBedroomParent } from "react-icons/md";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext.jsx";

function Nav() {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

    let {serverUrl} = useContext(AuthDataContext)

 
const handleLogout = async () => {
  try {
    console.log("Logging out from:", `${serverUrl}/api/auth/logout`);
    
    const result = await axios.post(
      `${serverUrl}/api/auth/logout`, // ✅ correct variable
      {},
      { withCredentials: true }
    );
    
    console.log(result.data);
  } catch (error) {
    console.log("Logout Error:", error.message); // Clean and clear
  }
};


  const iconsData = [
    { id: 1, title: "Trending", icon: <MdOutlineWhatshot size={25} /> },
    { id: 2, title: "Family House", icon: <GiFamilyHouse size={25} /> },
    { id: 3, title: "Pool Bedroom", icon: <MdBedroomParent size={25} /> },
    { id: 4, title: "Wood Cabin", icon: <GiWoodCabin size={25} /> },
    {
      id: 5,
      title: "Community Store",
      icon: <SiHomeassistantcommunitystore size={25} />,
    },
    { id: 6, title: "Bed Outline", icon: <IoBedOutline size={25} /> },
    { id: 7, title: "Tree City", icon: <FaTreeCity size={25} /> },
    { id: 8, title: "Building House", icon: <BiBuildingHouse size={25} /> },
    { id: 9, title: "Modern Flat", icon: <BiBuildingHouse size={25} /> }, // You can change this one if needed
  ];

  return (
    <div>
      <div className="w-[100vw] min-h-[80px] max-h-[100px] border-b-[1px] border-amber-250 px-[40px] flex items-center justify-between ">
        <div>
          <img src={logo} alt="" className="w-[60px] " />
        </div>

        <div className=" gap-2 hidden md:block">
          <input
            type="text"
            className="h-10 w-xs px-3 py-3 border-2 border-amber-300 pr-12 outline-none rounded-xl"
          />

          <button className="ml-[-45px]  mb-[-10px] bg-red-500 rounded-full p-1">
            {" "}
            <CiSearch size={24} color="white" />{" "}
          </button>
        </div>

        <div className="flex items-center gap-2  relative">
          <span className="text-xl cursor-pointer rounded-2xl hover:bg-amber-200 px-3 py-1 md:block hidden">
            List Your Home
          </span>
          <button
            className="flex items-center justify-center gap-4 border-1 border-amber-300 px-3 py-2 hover:shadow-xs hover:shadow-black/40 rounded-2xl"
            onClick={() => setShowPopUp(!showPopUp)}
          >
            <span>
              <RxHamburgerMenu />
            </span>
            <span>
              {" "}
              <CgProfile />
            </span>
          </button>

          {showPopUp && (
            <div className="w-[220px] h-[250px] absolute  top-[40px] right-[2px] border-2 border-black/40 rounded-xl z-10 bg-amber-50/90">
              <ul className="h-full flex items-start justify-around flex-col  py-2 text-xl text-black/70">
                <li
                  className="w-full px-7 py-1 hover:bg-gray-100 cursor-pointer  rounded-xl"
                  onClick={() => navigate("/login")}
                >
                  Login
                </li>
                <li className="w-full px-7 py-1 hover:bg-gray-100 cursor-pointer  rounded-xl" onClickCapture={handleLogout}>
                  Logout
                </li>

                <hr className="w-full" />

                <li className="w-full px-7 py-1 hover:bg-gray-100 cursor-pointer  rounded-xl">
                  List Your Home
                </li>
                <li className="w-full px-7 py-1 hover:bg-gray-100 cursor-pointer  rounded-xl">
                  My Listing
                </li>
                <li className="w-full px-7 py-1 hover:bg-gray-100 cursor-pointer  rounded-xl">
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center ">
        <div className=" gap-2 block md:hidden">
          <input
            type="text"
            className="h-10 w-xs px-3 py-3 border-2 border-amber-300 pr-12 outline-none rounded-xl"
          />

          <button className="ml-[-55px] bg-red-500 rounded-full p-1">
            {" "}
            <CiSearch size={24} color="white" />{" "}
          </button>
        </div>
      </div>

      <div className="w-full h-20 flex items-center md:justify-center gap-3 overflow-auto justify-start   px-5 text-nowrap">
        {iconsData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center flex-col p-2 hover:border-b-2 border-red-400"
          >
            {item.icon}
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nav;