"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/signin");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen flex justify-center items-center bg-wallet_white">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center text-wallet_red_100">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4 mt-4">
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md outline-none text-wallet_black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md outline-none text-wallet_black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-wallet_red_100 hover:bg-[#c32530]  text-white p-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-wallet_black">
          Already have an account?{" "}
          <a href="/signin" className="text-wallet_red_100 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
