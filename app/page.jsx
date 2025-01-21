"use client";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-full w-full" >
     <Sidebar />
     <div className="pt-20 lg:pt-8 flex flex-1 pl-5 lg:pl-80">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-wallet_black font-semibold text-center lg:text-left text-xl lg:text-3xl">Welcome to Budget <span className="text-wallet_red_100">Buddy</span>! </h1>
        <p className="text-[13px] lg:text-[15px] text-wallet_black text-center lg:text-left font-extralight">Track your spending, set saving goals, and take control of your financial future.</p>
      </div>
     </div>
    </div>
  );
}
