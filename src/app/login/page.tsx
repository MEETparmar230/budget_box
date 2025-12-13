"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("hire-me@anshumat.org");
  const [password, setPassword] = useState("HireMe@2025!");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  };

  return (
    <div className="mt-50 flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader className="text-xl font-semibold">
          Login
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button className="w-full mt-3" onClick={submit}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
