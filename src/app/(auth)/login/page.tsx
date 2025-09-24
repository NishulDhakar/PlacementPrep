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
import { Loader2 } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

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
        router.push("/dashboard");
    } else {
      console.error("Login error:", result);
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-hidden">
      {/* Left Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 animate-fadeIn">
        <Card className="w-full max-w-md border border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader className="pb-2 space-y-2 text-center">
            <CardTitle className="text-3xl text-white font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white/60">
              Enter your credentials to access your account.
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
                  className="rounded-xl border-white/20 bg-neutral-800/70 text-neutral-100 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label className="text-white/80" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-white/20 bg-neutral-800/70 text-neutral-100 focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-8">
              {/* Login Button */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 transition-all shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Google Button */}
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
                Login with Google
              </Button>

              {/* Redirect to Signup */}
              <p className="text-sm text-center text-white/70">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-emerald-500 hover:underline"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
};

export default LoginPage;
