"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "./redux/providers/AuthProvider";

export default function Home() {
  const router = useRouter();

  // Simulate authentication status
  const {isAuthenticated} = useAuth(); // Set this based on your auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }else{
      router.push("/home");

    } 
    // If already on the correct page, no action is needed
  }, [isAuthenticated, router]);

  // Optional: Prevent rendering until redirect decision is made
  if (!isAuthenticated) return null;

  return (
    null
  );
}
