// app/english-test/EnglishPage.tsx
"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { englishSections } from "@/data/english-data";
import Link from "next/link";

export default function EnglishPage() {
  return (
    <div className="flex flex-col items-center w-full py-12 px-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        English Test
      </h1>

      <div className="grid gap-6 w-full max-w-4xl md:grid-cols-2">
        {englishSections.map((item, index) => (
          <Card
            key={index}
            className="group relative rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              {/* Number Badge */}
              <div className="absolute -top-3 -left-3 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md text-sm font-semibold">
                {index + 1}
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {item.href ? (
                <Link href={item.href}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start
                  </Button>
                </Link>
              ) : (
                <Button disabled className="w-full opacity-60">
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
