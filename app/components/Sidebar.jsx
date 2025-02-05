"use client";

import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { RiMenu3Line, RiCloseFill } from "react-icons/ri";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!logout) {
    console.error("useAuth hook is not providing logout function");
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
  };

  return (
    <div>
     
      <div className={`h-screen w-[100%] lg:w-64 bg-wallet_white text-white fixed pt-4 md:block ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <h2 className="text-xl lg:text-2xl font-bold p-4 text-wallet_black">
          Budget <span className="text-wallet_red_100">Buddy</span>
        </h2>
        <nav className="mt-10">
          <ul>
            <li className="p-4 hover:bg-wallet_red_75 group">
              <Link href="/" className="text-wallet_black group-hover:text-wallet_white flex gap-1 items-center">
                <RiDashboardFill /> Dashboard
              </Link>
            </li>
            <li className="p-4 hover:bg-wallet_red_75 group">
              <Link href="/transactions" className="text-wallet_black group-hover:text-wallet_white flex gap-1 items-center">
                <AiOutlineTransaction /> Transactions
              </Link>
            </li>
            <li className="p-4 hover:bg-wallet_red_75 group">
              <Link href="/reports" className="text-wallet_black group-hover:text-wallet_white flex gap-1 items-center">
                <TbReport /> Reports
              </Link>
            </li>
            <li className="p-4 hover:bg-wallet_red_75 group">
              <Link href="/categories" className="text-wallet_black group-hover:text-wallet_white flex gap-1 items-center">
                <MdCategory /> Categories
              </Link>
            </li>
          </ul>
        </nav>

        {user ? (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="mt-10 ml-4 rounded-lg bg-wallet_red_100 text-white py-2 px-4 w-[40%] lg:w-[50%]"
            >
              Logout
            </button>

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white m-3 lg:m-0 p-6 rounded-lg">
                  <h3 className="text-md lg:text-xl mb-4 text-wallet_black text-[16px]">Are you sure you want to logout?</h3>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-1 lg:py-2 rounded-md"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 text-black px-4 py-1 lg:py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link href='/signin'>
            <button className="mt-10 ml-4 rounded-lg bg-wallet_red_100 w-[50%] flex items-center gap-1 text-white py-2 px-4 ">
              <PiSignInBold className="text-xl" /> Sign In
            </button>
          </Link>
        )}
      </div>

      <button
        className="md:hidden fixed top-4 right-4 z-50 text-white bg-wallet_red_100 p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
         {isSidebarOpen ? (
          <RiCloseFill className="text-2xl" />
        ) : (
          <RiMenu3Line className="text-2xl" /> 
        )}
      </button>
    </div>
  );
}
