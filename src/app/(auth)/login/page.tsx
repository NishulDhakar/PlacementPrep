"use client";

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

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push("/");
    } else {
      console.error("Login error:", result);
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed.");
    }
  };

  return (
<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-hidden">
  {/* Left Login Form */}
  <div className="flex items-center justify-center p-8">
    <Card className="w-full max-w-md shadow-none border-none bg-neutral-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-white/80 font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
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
              className="border-white/10"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-10">
          <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            className="w-full"
          >
            Login with Google
          </Button>

          <p className="text-sm text-center text-white/80">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-blue-600 underline hover:no-underline"
            >
              Sign Up
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
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
</div>

  );
};

export default LoginPage;