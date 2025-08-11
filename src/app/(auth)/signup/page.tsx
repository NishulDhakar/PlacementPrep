"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/");
  } catch (error) {
  if (error instanceof Error) {
    alert(error.message || "Something went wrong");
  } else {
    alert("Something went wrong");
  }
}
  }


    const handleGoogleLogin = async () => {
      try {
        await signIn("google");
      } catch (error) {
        console.error("Google sign-in error:", error);
        alert("Google sign-in failed.");
      }
    };



  return (
<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-hidden">


        
      {/* Left Signup Form */}
      <div className="flex items-center justify-center p-8">
        

        <Card className="w-full max-w-md shadow-none border-none bg-neutral-900">
            
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white/80 font-bold">Secure Your Account</CardTitle>
            <CardDescription>
              Create your account below to get started.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Label className="text-white/80" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/10"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-white/80" htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                   className="border-white/10 text-white/80"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-white/80" htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                   className="border-white/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <input className="text-white/80" type="checkbox" id="terms" required />
                <Label htmlFor="terms" className="text-sm text-white/80">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 mt-10">
              <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full"
              >
                Register with Google
              </Button>
              <p className="text-sm text-center text-white/80">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-blue-600 underline hover:no-underline"
                >
                  Login
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
  <div className="relative hidden md:block">
    <Image
      priority
      width={1600}
      height={900}
      alt="PlacementReady dashboard preview"
      className="h-full w-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
      src="/signup.jpeg"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>

    </div>
  );
};

export default RegisterPage;