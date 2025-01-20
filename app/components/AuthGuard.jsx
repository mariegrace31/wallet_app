"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function AuthGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}

