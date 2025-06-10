"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import { useLogin } from "@/api-config/services/authService";

type FormData = {
  username: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { loginUser } = useAuth();

  const {
    mutateAsync: loginUserMutate,
    isLoading: isLoggingIn,
    error: loginError,
  } = useLogin();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginUserMutate({
        username: data.username,
        password: data.password,
      });
      loginUser(response.access_token);
      router.push("/home");
    } catch (error) {
      console.log("Login failed:", error);
      // Error is handled by loginError
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to xoup</CardTitle>
          <CardDescription>
            Enter your email or mobile number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Email or Mobile</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com or 9876543210"
                  {...register("username", {
                    required: "Username is required",
                    validate: (value) =>
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      /^[0-9]{10}$/.test(value) ||
                      "Enter a valid email or 10-digit mobile number",
                  })}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {loginError != null && (
                <p className="text-sm text-red-500">
                  {"Login failed. Please try again."}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
