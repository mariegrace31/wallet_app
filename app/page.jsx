"use client";
import Sidebar from "./components/Sidebar";
import image from "./assets/wallet.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col">
      <div className="flex  pt-20 lg:pt-8 pl-5 lg:pl-80">
        <div className="flex flex-col gap-4 ">
          
          <h1 className="text-wallet_black font-semibold text-xl lg:text-5xl">
            Welcome to Budget <span className="text-wallet_red_100">Buddy</span>!
          </h1>
          <p className="text-[13px] lg:text-[20px] text-wallet_black font-extralight">
            Track your spending, set saving goals, and take control of your financial future.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 w-[90%] lg:w-[55%] mx-auto mt-10 lg:mt-28 mb-5 border border-wallet_red_100 rounded-xl p-0 lg:p-3">
      <Image width={100} height={10} alt="wallet image" src={image} className="w-full lg:w-[250px] mx-auto rounded-xl" />
      <p className="text-wallet_black text-[14px] lg:text-[18px] font-extralight p-3 lg:p-0">This app is designed to assist you in effectively managing your finances, helping you keep track of your spending, identify areas where you can reduce unnecessary expenses, and implement strategies to optimize your income, ultimately empowering you to take full control of your financial future and achieve your financial goals with greater ease and confidence.</p>
      </div>

      <Link href='/transactions'>
       <button className="bg-wallet_red_100 text-white p-2 rounded-lg ml-4 mt-10 mb-5 lg:mb-0 lg:mt-20 text-lg lg:text-xl px-4 hover:bg-[#c32530] lg:ml-80">See your transactions</button>
      </Link>

      </div>
    
    </div>
  );
}
