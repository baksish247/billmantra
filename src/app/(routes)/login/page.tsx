"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import logoIcon from "../../favicon.ico";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/redux/providers/AuthProvider";
export default function Page() {
  const router = useRouter();

  // Simulate authentication status
  const { isAuthenticated } = useAuth(); // Set this based on your auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/home");
    }
    // If already on the correct page, no action is needed
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full ">
        <div className="mb-6 flex items-center justify-center">
          <Image
            src={logoIcon}
            alt="logo"
            className=""
            width={50}
            height={50}
          />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
