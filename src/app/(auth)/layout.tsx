import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
