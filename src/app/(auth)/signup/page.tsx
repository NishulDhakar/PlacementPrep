"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.error || "Registration failed");

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Something went wrong");
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
      {/* Left Signup Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 animate-fadeIn">
        <Card className="w-full max-w-md border border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader className="pb-2 space-y-2 text-center">
            <CardTitle className="text-3xl text-white font-bold">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-white/60">
              Join PlacementReady and secure your future today.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label className="text-white/80" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl text-neutral-100 border-white/20 bg-neutral-800/70 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label className="text-white/80" htmlFor="password">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-xl  border-white/20 text-neutral-100 bg-neutral-800/70 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <Label className="text-white/80" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="rounded-xl text-neutral-100 border-white/20 bg-neutral-800/70 pr-10 focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  className="mt-1 accent-emerald-600"
                  type="checkbox"
                  id="terms"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-white/70">
                  I agree to the{" "}
                  <a href="#" className="text-emerald-500 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-emerald-500 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-8">
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 transition-all shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full rounded-xl flex items-center gap-2 bg-white text-black hover:bg-neutral-100"
              >
                <Image
                  src="/googleIcon.png"
                  width={18}
                  height={18}
                  alt="Google"
                />
                Register with Google
              </Button>

              <p className="text-sm text-center text-white/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-emerald-500 hover:underline"
                >
                  Login
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Right Image Section */}
      <div className="relative hidden md:block">
        <Image
          priority
          width={1600}
          height={900}
          alt="PlacementReady dashboard preview"
          className="h-full w-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          src="/signup.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
};

export default RegisterPage;
